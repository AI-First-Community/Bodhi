---
title: Concept Authoring
nav_order: 4
---

# Concept Authoring

The most common contribution is **adding or improving a concept** — and that's just editing one Markdown file. No framework, no build server, zero runtime dependencies.

`knowledge/` is the **source of truth**: an [OKF](https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf) bundle of one markdown file per concept, grouped into cluster folders. After editing, you run `npm run build` to regenerate `js/data.js` (which the browser reads) and validate.

## Anatomy of a concept file

Create a file at `knowledge/<cluster>/<id>.md`. The **filename without `.md` is the concept `id`** — it's what relations point at, so keep it short, lowercase, and hyphenated (e.g. `lora`, `pipeline-parallelism`).

```markdown
---
type: PEFT Method
title: My Technique
description: One-line essence — becomes the node summary.
cluster: peft
level: 4
added: "0.4.0"
tags:
  - peft
when_to_use: When to reach for it (one or two sentences).
relations:
  - improves-on:lora        # typed edge → an existing concept id
  - alternative:full-ft
references:
  - My Paper|https://arxiv.org/abs/...
resource: https://arxiv.org/abs/...
---

# My Technique

Deeper explanation — the paragraph(s) between the H1 and the first `##`
heading become the detail-panel body.

## Example
```python
example()        # the first code fence becomes the node's code snippet
```

## When to use

When to reach for it (mirrors the frontmatter field for OKF readers).

## References

- [My Paper](https://arxiv.org/abs/...)
```

## Frontmatter fields

| Field | Required | Notes |
|---|---|---|
| `type` | **yes** | OKF type. Use your cluster's type from `CLUSTER_TYPE` in `okf.config.js` (e.g. `PEFT Method`, `Reasoning Method`). |
| `title` | yes | Display name (the node label). |
| `description` | yes | One-line summary shown on the node and in the panel. Keep it tight. |
| `cluster` | yes | A cluster id defined in `okf.config.js` (e.g. `peft`, `agents`). |
| `level` | yes | Integer **1–5** (learning depth — see below). |
| `added` | no | Semver version (e.g. `"0.4.0"`). When it equals the current `RELEASE.version`, the app marks the concept **new**. See [Release Process](Release-Process.md). |
| `when_to_use` | no | Practical guidance — when to choose this over alternatives. |
| `relations` | no | List of `verb:target-id` typed edges (see below). |
| `references` | no | List of `Title|https://url` source links. Cite at least one real source. |
| `resource` | no | OKF convenience: the primary URL (usually the first reference). |
| `tags` | no | Free-form labels; informational. |

### Body sections
- **Detail** — text between the `# H1` and the first `##`/code fence → the panel's detail body.
- **`## Example`** — the first fenced code block → the node's code snippet.
- **`## When to use`** / **`## References`** — conventional sections (the panel reads the frontmatter values; these keep the markdown readable on its own and in other OKF tools).

## Relation verbs

Relations live on the **source** concept and point at an existing concept `id`. Valid verbs:

| Verb | Meaning |
|---|---|
| `is-a` | is a type of |
| `improves-on` | improves on |
| `alternative` | alternative to |
| `requires` | requires |
| `combines` | combines with |
| `builds-on` | builds on |

Rules of thumb:
- Point at an **existing id** (the build warns and the validator errors on dangling targets).
- Add **2–4 meaningful edges** — enough to wire the concept into the map without clutter. Avoid orphans (a node with no edges triggers a validator warning).
- Pick the most accurate verb; don't force `is-a` everywhere.

## Levels

`level` places a concept on the learning arc and drives the level filter:

| Level | Name |
|---|---|
| 1 | Foundations |
| 2 | Core Mechanics |
| 3 | Adaptation Basics |
| 4 | Fine-Tuning Techniques |
| 5 | Advanced / Alignment |

## Build & validate

```bash
npm run build      # regenerates js/data.js from knowledge/ AND runs the validator
npm start          # open index.html and check your concept in the browser
```

The build prints concept/edge counts and (if any) warnings about unknown relation targets. **`npm run validate` must pass with 0 errors** — it checks dangling edges, duplicate ids, missing required fields, cluster/relation validity, semver `added`, and bundle↔data sync.

## Quality bar (must-haves)

- **Cite a real source** for every concept — a paper, official blog, or docs.
- **Be accurate and current** — verify claims against the source; prefer established techniques and clearly mark genuinely new ones.
- **Stay offline** — no CDNs, external fonts, scripts, or icons (icons are inline SVG; fonts are vendored). Quick check: `grep -rn 'http' app.html css/style.css js/graph.js | grep -v 'w3.org/2000/svg'` should be empty. (The `index.html` landing intentionally links out to GitHub/LinkedIn.)
- **Keep it balanced** — a clean, accurate graph matters more than raw size.

Adding something that needs a **new cluster, relation type, level, wizard step, or comparison table**? Those live in `okf.config.js` — see the **[Configuration Reference](Configuration-Reference.md)**.

Ready to open a PR? See **[Contributing](Contributing.md)**.
