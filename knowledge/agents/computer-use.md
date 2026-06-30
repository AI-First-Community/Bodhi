---
type: "Agent / Retrieval Method"
title: "Computer-Use / GUI Agents"
description: "Vision-language agents that operate real desktops/browsers via screenshots plus mouse/keyboard actions — general control beyond brittle RPA scripts."
cluster: "agents"
level: 3
tags:
  - "agents"
when_to_use: "Automating GUI tasks that lack an API; expect to engineer for reliability."
relations:
  - "builds-on:react"
references:
  - "OSWorld|https://os-world.github.io/"
resource: "https://os-world.github.io/"
---

# Computer-Use / GUI Agents

A screenshot → reason → act (click/type/scroll) loop, OS-agnostic at the pixel level (Claude Computer Use) or DOM-aware (Gemini). Evaluated on OSWorld and WebArena: as of 2025–2026 frontier agents reach roughly 40–60% on OSWorld (e.g. Claude Sonnet 4.5 ~61%) against a human baseline near 72% — improving fast but still trailing. The reliability gap is the honest story.

## When to use

Automating GUI tasks that lack an API; expect to engineer for reliability.

## References

- [OSWorld](https://os-world.github.io/)
