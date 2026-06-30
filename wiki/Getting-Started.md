# Getting Started

Bodhi Map is a static, offline web app with **zero runtime dependencies**. There is nothing to install to *use* it.

## Just run it

Clone (or download) the repo and open the app:

```bash
git clone https://github.com/AI-First-Community/Bodhi.git
cd Bodhi
open index.html        # macOS — opens in your default browser
# or simply double-click index.html in a file manager
```

That's it. No server, no internet connection, no build step. The graph, fonts, and libraries are all vendored locally so it works over `file://`.

> **Landing page:** `landing.html` is the project's intro page; `index.html` is the interactive map itself. The brand link in the app's top-left returns to the landing page.

## First five minutes

1. **Look around.** Nodes are concepts, color-coded by cluster; edges are typed relationships. Drag to pan, scroll to zoom.
2. **Click a node** to open its detail panel — plain-language summary, deeper detail, *when to use*, a code snippet, its connections, and paper references.
3. **Search** with `f` — type "attn" → Attention. Use `↑`/`↓`/`Enter` to navigate results.
4. **Filter** by level (1–5) or by cluster (click a swatch in the legend dock) to pare the map down to what you care about.
5. **Try the flows** — the **🧭 Which technique?** wizard recommends an adaptation strategy; **▶ Guided Path** walks a real workflow end to end.

See the **[User Guide](User-Guide)** for everything in depth.

## If you want to build / contribute

`npm` is used **only as a task runner** — there are still no dependencies to install.

```bash
npm run build      # rebuild js/data.js from knowledge/ and validate
npm run validate   # integrity check only (0 errors required)
npm start          # open index.html
npm run export     # regenerate the knowledge/ bundle from js/data.js (rarely needed)
```

Requirements: **Node.js** (any recent LTS) for the build/validate scripts. The app itself needs only a browser.

Next steps:
- Adding or editing a concept → **[Concept Authoring](Concept-Authoring)**
- The contribution workflow → **[Contributing](Contributing)**
- How the build works → **[Architecture](Architecture)**
