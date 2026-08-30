# Deploying improvtalk.s1mpleai.org

The site is a static export served from a Cloud Storage bucket attached as a
**backend bucket** to the HTTPS load balancer that already fronts
`api.s1mpleai.org`. There is no server and no container.

## Why not Caddy on the VM

The repo `ImprovTalk/services/api/deploy/Caddyfile.*` describes Caddy terminating
TLS with Let's Encrypt. Production has moved past that. Every certificate on
`s1mpleai.org` is now issued by **Google Trust Services**, i.e. TLS terminates at
a Google Cloud load balancer:

```
$ echo | openssl s_client -connect api.s1mpleai.org:443 -servername api.s1mpleai.org 2>/dev/null \
    | openssl x509 -noout -issuer
issuer=C=US, O=Google Trust Services, CN=WR3
```

So adding a host means changing the load balancer, not a Caddyfile.

## Current state (verified 30 Aug 2026)

| Host | DNS | On managed cert | Backend |
|---|---|---|---|
| `api.s1mpleai.org` | 34.49.113.73 | yes | live (FastAPI) |
| `s1mpleai.org` | 34.49.113.73 | yes | none — 503 |
| `ideatest.s1mpleai.org` | 34.49.113.73 | yes | none — 503 |
| `grafana.s1mpleai.org` | 34.49.113.73 | **no** | handshake fails |
| `improvtalk.s1mpleai.org` | **none** | **no** | — |

The managed certificate's SANs are exactly `s1mpleai.org`, `api.s1mpleai.org`,
`ideatest.s1mpleai.org`, `api.ideatest.s1mpleai.org`.

## One-time setup

Everything below needs a principal with `compute.loadBalancerAdmin` and
`storage.admin` on the project. Set these first:

```bash
export PROJECT=<your-gcp-project-id>
export BUCKET=improvtalk-site
export HOST=improvtalk.s1mpleai.org
export REGION=europe-west1        # pick the region nearest your users
gcloud config set project "$PROJECT"
```

### 1. DNS

Add an **A record** `improvtalk` → `34.49.113.73` in the `s1mpleai.org` zone.
Confirm before continuing — certificate provisioning fails without it:

```bash
dig +short "$HOST"   # must print 34.49.113.73
```

### 2. Bucket

```bash
gcloud storage buckets create "gs://$BUCKET" \
  --location="$REGION" \
  --uniform-bucket-level-access

# Public read. The bucket holds only the published marketing site.
gcloud storage buckets add-iam-policy-binding "gs://$BUCKET" \
  --member=allUsers --role=roles/storage.objectViewer

# MainPageSuffix is what makes /privacy/ resolve to privacy/index.html.
# Without it every route except / returns 404 through the load balancer.
gcloud storage buckets update "gs://$BUCKET" \
  --web-main-page-suffix=index.html \
  --web-error-page=404.html
```

### 3. Backend bucket with CDN

```bash
gcloud compute backend-buckets create improvtalk-site-backend \
  --gcs-bucket-name="$BUCKET" \
  --enable-cdn \
  --cache-mode=USE_ORIGIN_HEADERS   # respect the Cache-Control the workflow sets
```

### 4. Certificate

Google-managed certificates are immutable, so adding a host means creating a new
one carrying all five names and swapping it onto the HTTPS proxy.

```bash
# Confirm the proxy and its current cert first.
gcloud compute target-https-proxies list
export PROXY=<the proxy name from above>

gcloud compute ssl-certificates create s1mpleai-v2 \
  --domains=s1mpleai.org,api.s1mpleai.org,ideatest.s1mpleai.org,api.ideatest.s1mpleai.org,improvtalk.s1mpleai.org \
  --global

# Provisioning takes 15-60 minutes and needs the DNS record from step 1 live.
# Wait for ACTIVE before swapping, or you will drop TLS for api.s1mpleai.org.
watch -n 60 "gcloud compute ssl-certificates describe s1mpleai-v2 \
  --global --format='value(managed.status)'"

# Only once it reads ACTIVE:
gcloud compute target-https-proxies update "$PROXY" --ssl-certificates=s1mpleai-v2
```

### 5. URL map host rule

```bash
gcloud compute url-maps add-path-matcher improvtalk-lb \
  --path-matcher-name=improvtalk-site \
  --default-backend-bucket=improvtalk-site-backend \
  --new-hosts="$HOST"
```

Replace `improvtalk-lb` with the real URL map name if it differs
(`gcloud compute url-maps list`), and update `URL_MAP` in
`.github/workflows/deploy.yml` to match.

### 6. Workload Identity Federation for GitHub Actions

Avoids putting a long-lived service-account key in repository secrets.

```bash
export SA=improvtalk-site-deployer
export REPO=DavitGadyan/ImprovTalk_front

gcloud iam service-accounts create "$SA"
gcloud storage buckets add-iam-policy-binding "gs://$BUCKET" \
  --member="serviceAccount:$SA@$PROJECT.iam.gserviceaccount.com" \
  --role=roles/storage.objectAdmin
gcloud projects add-iam-policy-binding "$PROJECT" \
  --member="serviceAccount:$SA@$PROJECT.iam.gserviceaccount.com" \
  --role=roles/compute.loadBalancerAdmin   # for the CDN invalidation step

gcloud iam workload-identity-pools create github --location=global
gcloud iam workload-identity-pools providers create-oidc github-provider \
  --location=global --workload-identity-pool=github \
  --issuer-uri=https://token.actions.githubusercontent.com \
  --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository" \
  --attribute-condition="assertion.repository=='$REPO'"

export PROJECT_NUMBER=$(gcloud projects describe "$PROJECT" --format='value(projectNumber)')
gcloud iam service-accounts add-iam-policy-binding \
  "$SA@$PROJECT.iam.gserviceaccount.com" \
  --role=roles/iam.workloadIdentityUser \
  --member="principalSet://iam.googleapis.com/projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/github/attribute.repository/$REPO"
```

Then add two repository secrets:

| Secret | Value |
|---|---|
| `GCP_WIF_PROVIDER` | `projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/github/providers/github-provider` |
| `GCP_DEPLOY_SA` | `$SA@$PROJECT.iam.gserviceaccount.com` |

## Deploying

Push to `main`, or run the workflow manually.

Until `GCP_WIF_PROVIDER` and `GCP_DEPLOY_SA` exist, the workflow still builds and
reports green — it just skips the publish steps and leaves a notice. So you can
push freely before the GCP side is ready.

Once configured it runs in this order, which matters:

1. Build and sanity-check the export (fails loudly rather than syncing a
   half-built site over a working one).
2. `_next/**` hashed assets — `max-age=31536000, immutable`.
3. `scenarios/**` video and posters — `max-age=2592000` (30 days). Without this
   a returning visitor re-downloads ~3 MB of video every visit. Rename the file
   to bust it.
4. HTML and everything else — `max-age=0, must-revalidate`, so a deploy is
   visible immediately.
5. CDN invalidation.

Assets go up before HTML on purpose: a visitor who loads the new HTML can then
never request an asset that has not been uploaded yet.

## Verify after the first deploy

```bash
# Routes. /privacy/ is the one that proves MainPageSuffix is working —
# if it 404s, step 2's bucket website config did not apply.
for p in / /privacy/ /terms/ /support/ /get/ /sitemap.xml /robots.txt; do
  printf '%-16s %s\n' "$p" "$(curl -s -o /dev/null -w '%{http_code}' https://improvtalk.s1mpleai.org$p)"
done

# Certificate covers the new host
echo | openssl s_client -connect improvtalk.s1mpleai.org:443 \
  -servername improvtalk.s1mpleai.org 2>/dev/null \
  | openssl x509 -noout -text | grep -A2 "Subject Alternative Name"

# Caching split: HTML must revalidate, hashed assets must be immutable
curl -sI https://improvtalk.s1mpleai.org/ | grep -i cache-control
curl -sI "https://improvtalk.s1mpleai.org/$(grep -o '_next/static/css/[^"]*' out/index.html | head -1)" | grep -i cache-control
```

### If `/privacy/` returns 404

GCLB backend buckets are inconsistent about directory indexes. Re-check step 2's
`--web-main-page-suffix`. If it still fails, add a fallback pass to the workflow
that uploads each route's HTML as an extensionless object alongside it:

```bash
for r in privacy terms support get billing/success billing/cancel; do
  gcloud storage cp "out/$r/index.html" "gs://$BUCKET/$r" \
    --cache-control="public,max-age=0,must-revalidate" \
    --content-type=text/html
done
```

## Follow-ups outside this repo

Because the site lives on the subdomain rather than the apex, these URLs in the
mobile app still point at `s1mpleai.org`, which serves nothing. They need a
mobile release to fix:

- `ImprovTalk/apps/mobile/app/settings.tsx:11-12` — `PRIVACY_URL`, `TERMS_URL`
- `ImprovTalk/apps/mobile/app/sign-in.tsx:118-125` — the same two links
- `ImprovTalk/services/api/app/deps/settings.py:74-75` — Stripe `success_url` /
  `cancel_url`. Lower priority: Stripe keys are currently empty so checkout is
  not live, but this must be fixed before it is.

Alternatively, point the apex at this same backend bucket — it is already on the
certificate and currently 503s — and the app's existing links start working with
no mobile release.
