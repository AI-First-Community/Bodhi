# FAQ

**What is Bodhi Map?**
An open, interactive knowledge graph of modern AI — concepts as nodes, typed relationships as edges — that runs entirely offline in a browser. See [Home](README.md).

**Do I need to install anything to use it?**
No. Clone the repo and open `index.html`. No server, no internet, no dependencies. See [Getting Started](Getting-Started.md).

**Why is there a build step / `npm`?**
Only for *editing*. Browsers can't read local markdown over `file://`, so a tiny build compiles the `knowledge/` bundle into `js/data.js`. `npm` is just a task runner — there are still no dependencies to install. See [Architecture](Architecture.md).

**Where do I edit content?**
In `knowledge/` — one markdown file per concept. **Never** edit `js/data.js` by hand; it's generated. See [Concept Authoring](Concept-Authoring.md).

**How do I add a concept?**
Write `knowledge/<cluster>/<id>.md` with the right frontmatter and relations, then `npm run build`. Full walkthrough: [Concept Authoring](Concept-Authoring.md).

**How do I add a whole new cluster (or a wizard step, or a compare table)?**
Those live in `okf.config.js`. See [Configuration Reference](Configuration-Reference.md).

**What's the "New" chip / green ring?**
A release-aware highlight: concepts whose `added:` matches the current `RELEASE.version` are marked new and the **New** chip spotlights them with their connections. See [Release Process](Release-Process.md).

**Does it cover multimodal / vision / image generation?**
Not yet — the current scope is language-model-centric (architecture, adaptation, PEFT, alignment, reasoning, agents, efficiency, data/eval). A Multimodal cluster is a candidate for a future release.

**Is the content original?**
Bodhi Map synthesizes publicly published research; the techniques belong to their original authors, and every concept cites its source. The value it adds is the curation, explanations, *when-to-use* judgment, the typed connections, and the interactive experience.

**Can I use the content in my own LLM/RAG pipeline?**
Yes. Use the in-app **⬇ For agents** export to download the whole knowledge base as one LLM-ready markdown file, or consume the OKF bundle in `knowledge/` directly. Licensed MIT.

**It looks broken / my new concept doesn't show.**
Did you run `npm run build`? Check that `npm run validate` reports 0 errors — it pinpoints dangling relations, missing fields, or a stale `js/data.js`. Make sure your relation targets are real concept ids.

**How do I report a bug or suggest a concept?**
Open an issue or a PR on [GitHub](https://github.com/AI-First-Community/Bodhi). For sources that are missing/wrong, a PR fixing the citation is especially welcome.

**License?**
MIT © Sanjeev Azad — *Innovate with Sanjeev*. Referenced papers remain their authors' property.
