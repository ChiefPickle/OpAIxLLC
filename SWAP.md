# Promoting `/home` to `/` (and rolling back)

The live marketing site is unchanged. The redesign lives at `/home`, `/home/privacy`, `/home/terms`, and `POST /home/send`. Do not flip production until founders have signed `COPY-REVIEW.md`.

`BASE_PATH` is the one-line switch: `components/v2/constants.ts` currently exports `"/home"`.

---

## Promote `/home` → `/`

### 1. Copy, then metadata

1. Confirm every `[VERIFY]` / `[PROPOSED]` item in `COPY-REVIEW.md`.
2. In `components/v2/constants.ts` set `export const BASE_PATH = ""`.
3. In `components/v2/JsonLd.tsx` set `url` to `SITE.url` (no `/home`).
4. In `app/home/layout.tsx` (or the layout after the move):
   - Remove `robots: { index: false, follow: false, ... }` (allow indexing).
   - Set `alternates.canonical` to `SITE.url` (`https://www.opaixllc.com`).
   - Set `openGraph.url` to `SITE.url`.
5. Privacy/terms metadata: canonical `/privacy` and `/terms`.

### 2. File moves (preferred over a long-lived redirect)

Keep git history with `git mv` where possible.

| Now | After promotion |
|---|---|
| `app/home/page.tsx` | Replace `app/page.tsx` (archive today’s `app/page.tsx` first, e.g. `app/_legacy/page.tsx`, or delete once you are sure) |
| `app/home/layout.tsx` | Merge into `app/layout.tsx`: keep the existing root `<html lang="en">` / `<body>` shell; import `src/styles/redesign.css` **instead of or in addition to** `app/globals.css` only after the old page is gone; apply `newsreader.variable`, `inter.variable`, and `opaix-v2` on `<body>` |
| `app/home/privacy/page.tsx` | `app/privacy/page.tsx` |
| `app/home/terms/page.tsx` | `app/terms/page.tsx` |
| `app/home/send/route.ts` | `app/send/route.ts` |
| `app/home/opengraph-image.tsx` | `app/opengraph-image.tsx` (replace the live OG art) |
| `public/home/icons/*` | Root metadata `icons` in `app/layout.tsx` should point at these (or move to `app/icon.svg` / `app/apple-icon.png`) |
| `public/home/team/*` | Stay, or move to `public/team/` and update `components/v2/Team.tsx` paths |

Do **not** import old `components/{Navbar,Hero,HeroWave,Solutions,About,Team,CTA,Footer}` from the new page.

Delete or stop exporting the old components once `/` is the redesign. Leave `public/team/{lorelee,jacques,yan}` in place (originals).

### 3. Sitemap, robots, canonical, OG

There is currently **no** `app/sitemap.ts` or `app/robots.ts`. After promotion:

- Add `app/sitemap.ts` listing `/`, `/privacy`, `/terms` only (do not list `/home` if that route is removed).
- Add `app/robots.ts` allowing `/` and referencing the sitemap.
- Set `metadataBase` in `app/layout.tsx` to `https://www.opaixllc.com` (today the root layout still uses `https://opaixllc.vercel.app` — change that at promotion, not before).
- Favicon: point root `icons` at the forecast-line mark (`public/home/icons/icon.svg` or a moved `app/icon.svg`). Remove or replace `app/icon.svg` (the old pulse).

### 4. Redirects (only if you keep `/home` as an alias)

If you need bookmarks during a transition week, add in `next.config.js`:

```js
async redirects() {
  return [
    { source: "/home", destination: "/", permanent: true },
    { source: "/home/privacy", destination: "/privacy", permanent: true },
    { source: "/home/terms", destination: "/terms", permanent: true },
  ];
}
```

Do not add these until `/` is the redesign. Hosting/Vercel project settings are otherwise unchanged.

### 5. Form delivery

Set `FORMSPREE_FORM_ID` **or** `RESEND_API_KEY` (+ optional `CONTACT_TO_EMAIL`) in the host environment. Until then `POST /home/send` (later `POST /send`) returns 503 and the UI tells people to use email/phone.

### 6. Verify after promotion

- `/` renders the redesign; `/home` either 301s or 404s.
- View-source: no `noindex` on `/`.
- Canonical and OG URL are `https://www.opaixllc.com`.
- Internal links are `/#approach`, `/privacy`, etc. (empty `BASE_PATH`).

---

## Roll back `/` → previous live page

1. Restore the archived `app/page.tsx` (Navbar + Hero + Solutions + About + Team + CTA + Footer).
2. Restore `app/layout.tsx` metadata, `app/globals.css` import, `app/icon.svg`, and `app/opengraph-image.tsx` from git (`git checkout <pre-swap-sha> -- app/page.tsx app/layout.tsx app/opengraph-image.tsx app/icon.svg`).
3. Set `BASE_PATH` back to `"/home"` if you are keeping the redesign as a preview.
4. Move privacy/terms/send/OG back under `app/home/` if they were moved.
5. Remove promotion redirects from `next.config.js`.
6. Re-apply `robots: { index: false, follow: false }` on the redesign layout if `/home` is still public.
7. Redeploy. Do not `git push --force` unless you have an explicit recovery plan.

If the swap was a single commit, `git revert <swap-sha>` is the cleanest rollback.

---

## Files that must never be required for the live `/` until swap

- `src/styles/redesign.css` — imported only by the `/home` layout today
- `components/v2/*`
- `app/home/*`
- `public/home/*`
