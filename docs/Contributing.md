# Contributing

Contributions — new concepts, corrections, better explanations, features — are welcome. Most contributions are just **editing Markdown** in `knowledge/`.

## Workflow

1. **Fork** the repo and clone your fork.
   ```bash
   git clone https://github.com/<your-fork>/Bodhi.git
   cd Bodhi
   ```
2. **Branch.**
   ```bash
   git checkout -b add-my-concept
   ```
3. **Make your change.**
   - Adding/editing a concept → follow **[Concept Authoring](Concept-Authoring.md)**.
   - New cluster / relation / level / wizard step / comparison table → **[Configuration Reference](Configuration-Reference.md)**.
4. **Build & validate** (this regenerates `js/data.js` and runs the integrity check):
   ```bash
   npm run build
   ```
   Commit the regenerated `js/data.js` along with your `knowledge/` changes — they must stay in sync (the validator enforces this).
5. **Check it in the browser:**
   ```bash
   npm start
   ```
6. **Open a PR** with a short description of what you added/changed and why.

## Quality bar

- **`npm run validate` must pass — 0 errors.** It checks dangling edges, duplicate ids, missing fields, cluster/relation validity, and bundle↔data sync.
- **Cite a real source** for every concept (paper, official blog, or docs).
- **Be current and accurate** — verify claims against the source; prefer established techniques and clearly mark genuinely new ones.
- **Stay offline** — no CDNs, external fonts, scripts, or icons. Quick check:
  ```bash
  grep -rn 'http' index.html css/style.css js/graph.js | grep -v 'w3.org/2000/svg'   # should be empty
  ```
- **Keep it balanced** — a clean, accurate, well-connected graph matters more than raw size. Avoid orphan nodes; add 2–4 meaningful relations.

## What makes a good concept PR

- A tight one-line `description` and a clear detail paragraph.
- Honest `when_to_use` guidance (when to pick this *over* the alternatives).
- Correct, minimal `relations` to existing concepts using the right verb.
- At least one real reference; an `## Example` snippet when it helps.
- The right `cluster` and `level`.

## Attribution & licensing

Bodhi Map synthesizes publicly published research; credit for the underlying ideas belongs to the original authors, and every concept cites its source. By contributing, you agree your contributions are licensed under the project's **MIT License**. If you add a source, make sure the citation is accurate — attribution is part of the quality bar.

## Cutting a release

Maintainers: see **[Release Process](Release-Process.md)** for bumping the version and highlighting what's new.
