#!/usr/bin/env node
/**
 * Push every sitemap URL to IndexNow.
 *
 * IndexNow is an open protocol Bing, Yandex, Seznam and Naver all consume from
 * one submission — you tell them a URL changed instead of waiting to be
 * crawled. Google does not participate, so this does not replace Search Console;
 * it just means the site is discoverable somewhere while Google gets round to it.
 *
 * Ownership is proved by hosting a file named for the key, containing the key,
 * at the site root. That file is in public/ and must not be deleted.
 *
 *   node scripts/submit-indexnow.mjs
 */
import { readFileSync, readdirSync } from 'node:fs'

const HOST = 'improvtalk.vip'
const keyFile = readdirSync('public').find((f) => /^[0-9a-f]{32}\.txt$/.test(f))
if (!keyFile) {
  console.error('No IndexNow key file in public/. Expected <32-hex>.txt')
  process.exit(1)
}
const key = keyFile.replace('.txt', '')

const sitemap = readFileSync('out/sitemap.xml', 'utf8')
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
if (!urls.length) {
  console.error('No URLs in out/sitemap.xml — run `npm run build` first.')
  process.exit(1)
}

const body = {
  host: HOST,
  key,
  keyLocation: `https://${HOST}/${keyFile}`,
  urlList: urls,
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
})

/* 200 accepted, 202 accepted but key still being validated. Both are fine. */
console.log(`IndexNow: HTTP ${res.status} for ${urls.length} URLs`)
if (![200, 202].includes(res.status)) {
  console.error(await res.text())
  process.exit(1)
}
