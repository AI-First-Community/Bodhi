# Contributing to Bodhi Map 🍃

Thanks for helping map modern AI! Bodhi Map is an interactive, offline knowledge
graph. Most contributions are **adding or improving concepts** — and that's just
editing Markdown. No framework, no build server, zero runtime dependencies.

## Project layout

| Path | What it is |
|------|------------|
| `knowledge/` | **The source of truth** — an [Open Knowledge Format](https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf) bundle. One Markdown file per concept, grouped by cluster. **Edit here.** |
| `okf.config.js` | Controlled vocabulary (clusters, relation types, levels) + interactive flows (decision wizard, guided path, comparison tables). |
| `scripts/okf.js` | Build/export tooling (Markdown bundle ⇄ `js/data.js`). |
| `scripts/validate.js` | Integrity auditor (run on every build). |
| `js/data.js` | **Generated — do not edit by hand.** |
| `js/graph.js`, `css/style.css`, `index.html` | The app (Cytoscape.js, vendored & offline). |

## Quick start

```bash
git clone <your-fork>
cd "Bodhi Map"
npm run build     # rebuilds js/data.js from knowledge/ and validates
npm start         # opens index.html
```

There are **no dependencies to install** — `npm` is only used as a task runner.

## Add or edit a concept

1. Create/modify a Markdown file in the right cluster folder, e.g.
   `knowledge/peft/my-technique.md`:

   ```markdown
   ---
   type: PEFT Method
   title: My Technique
   description: One-line essence (becomes the node summary).
   cluster: peft
   level: 4
   when_to_use: When to reach for it.
   relations:
     - improves-on:lora        # typed edge to an existing concept id
     - alternative:full-ft
   references:
     - My Paper|https://arxiv.org/abs/...
   ---

   # My Technique

   Deeper explanation — becomes the detail-panel body.

   ## Example
   ```python
   example()
   ```
   ```

2. `npm run build` — regenerates `js/data.js` and runs the validator.
3. `npm start` and check it in the browser.

**Frontmatter rules:** `type` is required (OKF). `relations` use the verbs
`is-a`, `improves-on`, `alternative`, `requires`, `combines`, `builds-on`, and
must point at an existing concept `id` (the filename without `.md`). New
clusters, relation types, levels, wizard steps, or comparison tables go in
`okf.config.js`.

## Quality bar

- **`npm run validate` must pass** (0 errors). It checks dangling edges,
  duplicate ids, missing fields, cluster/relation validity, and bundle↔data sync.
- **Stay offline.** No CDNs, no external fonts/scripts/icons. Icons are inline
  SVG; fonts are vendored in `fonts/`. Quick check:
  `grep -rn 'http' index.html css/style.css js/graph.js | grep -v 'w3.org/2000/svg'`
  should be empty.
- **Cite a real source** for every concept (a paper, official blog, or docs).
- **Be current and accurate** — prefer established techniques; mark genuinely new
  ones as such; verify claims against the source before adding.

## Submitting

Open a PR with a short description of what you added/changed and why. Keeping the
graph **clean, accurate, and balanced** matters more than raw size.

By contributing, you agree your contributions are licensed under the project's
[MIT License](LICENSE).
