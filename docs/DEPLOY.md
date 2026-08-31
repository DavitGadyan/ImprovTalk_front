# Deploying improvtalk.vip

The site is a static Next.js export published to **GitHub Pages** on every push
to `main`. There is no server and no build step to run by hand.

## Why Pages and not the GCP load balancer

The earlier plan put the site in a Cloud Storage bucket behind the load balancer
that already fronts `api.s1mpleai.org`. That required minting a new managed
certificate carrying all five hostnames and swapping it onto the HTTPS proxy —
the same proxy that terminates TLS for the **live production API**. Getting that
wrong takes the API down.

Owning `improvtalk.vip` removes the reason to take that risk. Pages provisions
and renews its own certificate, costs nothing (a GCLB forwarding rule is roughly
$18/month), and cannot affect the API.

The GCP route is still written up at the bottom if you ever need it.

---

## One-time setup

### 1. DNS at Namecheap

The domain uses Namecheap's own nameservers (`dns1/dns2.registrar-servers.com`),
so records go in **Domain List → Manage → Advanced DNS**.

Delete the parking records first — the default `CNAME www → parkingpage.namecheap.com`
and the `URL Redirect`/`A` record on `@` will otherwise shadow everything below.

Then add, for the apex:

| Type | Host | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `davitgadyan.github.io.` |

The four A records are GitHub's anycast addresses — all four, so a single
point of failure does not take the site down. Optionally add the AAAA records
too, for IPv6 visitors:

```
2606:50c0:8000::153   2606:50c0:8001::153
2606:50c0:8002::153   2606:50c0:8003::153
```

Namecheap's default TTL is fine. Propagation is usually minutes, occasionally an
hour.

### 2. Enable Pages

Repository → **Settings → Pages**:

- **Source: GitHub Actions** (not "Deploy from a branch" — the workflow uploads
  an artifact).
- **Custom domain:** `improvtalk.vip` → Save. GitHub verifies the DNS above.
- Once the check passes, tick **Enforce HTTPS**. The certificate is issued by
  Let's Encrypt and renews automatically.

The custom domain box may report an error until DNS propagates. That is normal;
re-save it once `dig +short improvtalk.vip` returns the GitHub addresses.

### 3. Push

That is the whole setup. The workflow builds, verifies the export, and
publishes.

---

## What the workflow guards against

Two failure modes specific to Pages, both of which produce a broken site that
looks like a successful deploy:

- **`.nojekyll`** — Pages runs Jekyll by default, and Jekyll ignores any path
  starting with an underscore. That is all of Next's `_next/static` output, so
  without this file the site loads with no CSS and no JavaScript. The build
  fails if it is missing.
- **`CNAME`** — if it is not inside the published artifact, Pages drops the
  custom domain on every deploy and reverts to `*.github.io`. The build checks
  its contents, not just its presence.

It also fails if any expected page, the QR, or any of the four videos is missing
or empty, rather than replacing a working site with a partial one.

---

## Verify after the first deploy

```bash
# Routes
for p in / /privacy/ /terms/ /support/ /get/ /sitemap.xml /robots.txt; do
  printf '%-16s %s\n' "$p" "$(curl -s -o /dev/null -w '%{http_code}' https://improvtalk.vip$p)"
done

# Certificate is real and covers the apex
echo | openssl s_client -connect improvtalk.vip:443 -servername improvtalk.vip 2>/dev/null \
  | openssl x509 -noout -issuer -subject -dates

# CSS actually loaded — this is what catches a missing .nojekyll
curl -s https://improvtalk.vip/ | grep -o '_next/static/css/[^"]*' | head -1

# A video streams
curl -s -o /dev/null -w '%{http_code} %{size_download} bytes\n' \
  -r 0-99999 https://improvtalk.vip/scenarios/coffee-shop.mp4
```

Then scan the QR on the page with a real phone. It encodes
`https://improvtalk.vip/get/`, and `/get` does the platform routing.

## Known limitation

Pages does not let you set response headers, so everything is served with
`Cache-Control: max-age=600`. The four videos (11 MB total) therefore re-fetch
more often than they would behind a CDN you control. Pages allows 100 GB of
bandwidth a month — roughly 33,000 video views — so this only matters if the
site gets genuinely popular. If it does, move to the GCP route below, which sets
a 30-day cache on `/scenarios/`.

---

## Follow-ups outside this repo

- **The mobile app still points at the old URLs.** `apps/mobile/app/settings.tsx:11-12`
  and `app/sign-in.tsx:118-125` link to `https://s1mpleai.org/privacy` and
  `/terms`, which serve nothing. Point them at `https://improvtalk.vip/privacy/`
  and `/terms/`. This needs a mobile release, and App Review will check that the
  privacy URL resolves.
- **Stripe return URLs**, `services/api/app/deps/settings.py:74-75`, should
  become `https://improvtalk.vip/billing/success` and `/billing/cancel`. Lower
  priority — Stripe keys are currently empty so checkout is not live.
- **API CORS**, `services/api/deploy/docker-compose.yml`, currently allows
  `https://improvtalk.s1mpleai.org`. Add `https://improvtalk.vip` if you wire
  the early-access form to your own API (see docs/EARLY-ACCESS.md option 3).

---

## Appendix: the GCP route

Only worth it if you outgrow the Pages bandwidth allowance or need real cache
control. It puts the export in a Cloud Storage bucket attached as a backend
bucket to a load balancer.

```bash
export PROJECT=<project-id> BUCKET=improvtalk-site REGION=europe-west1
gcloud config set project "$PROJECT"

gcloud storage buckets create "gs://$BUCKET" --location="$REGION" --uniform-bucket-level-access
gcloud storage buckets add-iam-policy-binding "gs://$BUCKET" \
  --member=allUsers --role=roles/storage.objectViewer

# MainPageSuffix is what makes /privacy/ resolve to privacy/index.html.
# Without it every route except / returns 404 through the load balancer.
gcloud storage buckets update "gs://$BUCKET" \
  --web-main-page-suffix=index.html --web-error-page=404.html

gcloud compute backend-buckets create improvtalk-site-backend \
  --gcs-bucket-name="$BUCKET" --enable-cdn --cache-mode=USE_ORIGIN_HEADERS

# improvtalk.vip is a separate domain, so this needs its own certificate —
# no need to touch the one serving api.s1mpleai.org.
gcloud compute ssl-certificates create improvtalk-vip --domains=improvtalk.vip --global
```

Then point the domain's A record at the LB address, add a URL-map host rule, and
replace the publish steps in the workflow with `gcloud storage rsync ./out`,
setting `Cache-Control` per tier: `_next/**` immutable for a year,
`scenarios/**` 30 days, HTML `max-age=0, must-revalidate`.
