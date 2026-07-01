# Bodhi Map — Backlog & Roadmap 🍃

A living list of what's next. Not a commitment — priorities shift with feedback and
contributions. Have an idea or want to pick something up? Open an
[issue or PR](https://github.com/AI-First-Community/Bodhi/issues).

**Legend:** 🔲 open · ✅ done · ⏸ parked · ➖ ongoing

---

## 🧩 Content (the knowledge itself)
- 🔲 **Multimodal cluster** — ViT, CLIP, VLMs, multimodal fusion (and possibly diffusion / image generation). The big scope expansion; deferred from v0.4.0.
- 🔲 **v0.5.0 concepts / frontier additions** — keep pace with the field; tag new ones `added: "0.5.0"` so the in-app *What's New* highlight surfaces them.
- 🔲 **Turn launch feedback into concepts** — specific techniques or corrections people request.

## 🚀 Product / features
- 🔲 **Phase 2 — "Build your own learning map"** — pick the topics you care about → a personalized concept set + suggested path, saved on-device, shareable as a link → its own QR code.
- 🔲 **Phase 3 — learner polish** — progress / "concepts learned", streaks, onboarding.
- 🔲 **Mobile feature parity** — bring the decision wizard, guided path, and compare tables into the mobile view (`m.html`); currently desktop-only.
- 🔲 **Mobile level filter** — mobile has cluster + search; add the level (1–5) filter.
- 🔲 **PWA "update available → reload" prompt** — so installed users get new versions without a manual close-and-reopen.
- 🔲 **Maskable PWA icon** — add a proper Android maskable icon (currently `any` purpose only).

## 📣 Distribution / community
- 🔲 **Launch posts** — X + LinkedIn drafts ready to publish.
- 🔲 **Social preview image** — repo/link cards (Settings → Social preview), using the bodhi-tree art.
- 🔲 **Feedback capture** — `FEEDBACK.md` + GitHub issue templates ("suggest a concept", "report an error").

## 🧹 Polish / tech-debt / parked
- 🔲 **Lighthouse / perf audit** — confirm the PWA score + Core Web Vitals; catch mobile perf issues.
- ➖ **Two-front-end upkeep** — desktop graph + mobile cards. Knowledge stays single-source (the OKF bundle), so it's manageable.
- ⏸ **Custom domain** — parked (the `github.io` URL is fine).
- ⏸ **Real GitHub Wiki** — parked; the org has wikis disabled, so docs ship in [`docs/`](docs/) instead (same content, served as a site).

---

## ✅ Shipped in v0.4.0
- 5 new concepts (118 → 123); release-keyed **What's New** highlight; **cluster filter**.
- Full **documentation site** (just-the-docs, green-themed) at `/docs`.
- Public repo · GitHub Pages · v0.4.0 release · topics/description · README live links.
- Landing-page polish · social icons · ambient music.
- **Installable PWA** (offline) + **QR code**.
- **Mobile-first view** (`m.html`) sharing the same knowledge core, with auto-routing.
