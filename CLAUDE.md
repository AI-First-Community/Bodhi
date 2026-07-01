# Working guidance — Bodhi Map

**Bodhi Map is LIVE and in public use** (https://ai-first-community.github.io/Bodhi/,
installable PWA + mobile view). Treat every change as production. The two ways to
lose users are **breaking something** and **showing wrong information** — both must be
actively prevented on every change. A broken page or a hallucinated fact is a poor
experience that makes people stop using it.

## Golden rules

1. **Never break the live site.**
   - Before pushing: `npm run build` must pass with **0 errors** (it runs the validator).
   - After pushing: confirm the **GitHub Pages deploy succeeds** and the affected URLs
     (app `/`, `app.html`, `m.html`, `/docs/`, `manifest.json`, `service-worker.js`)
     return **200 and render**. The previous good build keeps serving until a new one
     succeeds — never leave a failed/broken build as the latest without fixing it.
   - Prefer small, incremental, independently verifiable changes.

2. **Never hallucinate content.**
   - Every concept must be **accurate and backed by a real, verifiable source** (paper,
     official blog, or docs). Do **not** invent techniques, papers, URLs, numbers,
     benchmark scores, API names, or relationships between concepts.
   - If unsure, verify against the source or leave it out. Mark genuinely new/uncertain
     claims as such. Accuracy and honest attribution beat coverage.

3. **Keep it offline & zero-dependency.** The app loads no external assets (no CDNs,
   fonts, scripts, icons). The `index.html` landing may link out (GitHub/LinkedIn), but
   `app.html`/`m.html`/`css`/`js` must stay asset-pure.

4. **Knowledge is single-source.** Edit `knowledge/` (OKF bundle); it compiles to
   `js/data.js`, which **both** the desktop graph and the mobile view (`m.html`) read.
   Never hand-edit `js/data.js`.

5. **Release/highlight discipline.** Tag new concepts `added: "<version>"` and bump
   `RELEASE.version` on release (see `docs/Release-Process.md`). If a change touches the
   **service worker**, bump its `CACHE` version so installed PWAs pick it up.

## Pre-commit checklist
- [ ] `npm run build` → 0 errors
- [ ] Offline check clean: `grep -rn 'http' app.html m.html css/style.css js/graph.js | grep -v 'w3.org/2000/svg'` is empty
- [ ] Content changes cite a real source; no fabricated facts
- [ ] PWA/SW change → cache version bumped
- [ ] After deploy: live URLs verified 200 + render
