<!-- Thanks for contributing to Bodhi Map! Keep the graph clean, accurate, and offline. -->

## What & why
<!-- Briefly: what does this change and why? Link any issue it closes, e.g. "Closes #12". -->


## Checklist
- [ ] `npm run build` passes with **0 errors** (it runs the validator)
- [ ] I committed the regenerated `js/data.js` (if I changed anything under `knowledge/`)
- [ ] Every new/changed concept **cites a real, verifiable source** — no invented papers, URLs, numbers, or APIs
- [ ] Relations point at existing concept ids (no dangling edges)
- [ ] Stayed **offline**: no external assets in the app (`grep -rn 'http' app.html m.html css/style.css js/graph.js | grep -v 'w3.org/2000/svg'` is empty)
- [ ] New concept? tagged `added: "<version>"` if it's part of the current release
- [ ] I read [CONTRIBUTING](../CONTRIBUTING.md) / [Concept Authoring](https://ai-first-community.github.io/Bodhi/docs/Concept-Authoring.html)

## Notes
<!-- Anything reviewers should know. Screenshots welcome for UI changes. -->
