# Release Process

Bodhi Map is meant to be **kept current** — every release can highlight what's new so returning users immediately see the additions. This page is the maintainer checklist.

## The "what's new" mechanism

- Each concept can carry an `added: "<version>"` field in its frontmatter.
- `okf.config.js` defines the current `RELEASE = { version, label }`.
- The app marks every concept where `added === RELEASE.version` as **new**: a green ring on the graph node, a "✦ New in <version>" badge in its detail panel, and a **New** chip in the top bar that spotlights the new concepts *together with their neighbors* (so additions show wired into the map). The validator reports the new-count after each build.

Because the highlight is keyed to the current version, bumping the version automatically "clears" last release's highlights and lights up the new ones.

## Checklist for a new release (e.g. 0.4.0 → 0.5.0)

1. **Author the new/updated concepts** (see [Concept Authoring](Concept-Authoring.md)). On each genuinely new concept, set:
   ```yaml
   added: "0.5.0"
   ```
   (Tag only what's actually new this release — don't re-tag older concepts.)
2. **Bump the release marker** in `okf.config.js`:
   ```js
   const RELEASE = { version: '0.5.0', label: 'v0.5.0' };
   ```
3. **Bump `package.json`** `version` to match (`0.5.0`).
4. **Rebuild & validate:**
   ```bash
   npm run build
   ```
   Confirm `✓ no errors` and that the report's `new in 0.5.0: N` count matches what you tagged. Commit the regenerated `js/data.js`.
5. **Update docs:** concept/edge counts in `README.md` (the build report prints them), and any feature notes. Update this wiki if behavior changed.
6. **Sanity-check in the browser** (`npm start`): click the **New** chip — the tagged concepts should light up with their connections.
7. **Tag & publish:**
   ```bash
   git tag v0.5.0
   git push && git push --tags
   ```
   Write release notes summarizing the new concepts and any feature changes (the New filter is a quick way to enumerate them).

## Versioning

Use semver-ish increments:
- **patch** (0.4.0 → 0.4.1) — corrections, source fixes, small copy edits, no new concepts.
- **minor** (0.4.0 → 0.5.0) — new concepts, clusters, or features.
- **major** — a structural change to the schema or app.

## Keeping the highlight honest

The point of the highlight is "what changed *this* release." Keep it meaningful:
- Tag only new (or substantially reworked) concepts with the current version.
- Don't leave stale `added:` values from older releases bumped forward.
- If a release ships only fixes (no new concepts), the **New** chip auto-hides — that's expected.
