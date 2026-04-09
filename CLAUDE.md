# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Local Development

```
npx wrangler pages dev . --kv=KOPI
```

## Architecture

This is a **Cloudflare Pages** app (vanilla JS, no build step).

- `index.html` — order form; saves preferences to `localStorage`, POSTs to `/record`
- `summary.html` — order summary page; fetches `/list` and renders grouped by drink
- `functions/record.js` — `GET /record?name=&drink=` — writes to KV with 4h TTL
- `functions/list.js` — `GET /list` — reads all KV keys and returns JSON array `[{name, drink}]`
- `functions/sleep.js` — `GET /sleep` — delays 80s (test/debug endpoint)

**KV binding**: `KOPI` — stores name→drink entries with `expirationTtl: 14400` (4 hours).

New Pages Functions go in `functions/` as named ES modules exporting `onRequest({ request, env })`.
