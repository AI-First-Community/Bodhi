---
type: "Adaptation Strategy"
title: "Prompting"
description: "Steer behavior purely via the input text — zero weight changes, instant iteration."
cluster: "adaptation"
level: 3
tags:
  - "adaptation"
  - "adaptation-basics"
when_to_use: "Always try first. If a well-crafted prompt solves it, you are done."
relations:
  - "is-a:few-shot"
  - "is-a:cot"
  - "builds-on:rag"
---

# Prompting

Zero-shot, few-shot (in-context examples), system prompts. Leverages knowledge already in the model. Cheapest and fastest, but bounded by context window and cannot add new skills the base model lacks. As of 2025–2026 the field reframes production prompting as a subset of *context engineering* — engineering the whole context window (instructions + memory + retrieved facts + tool outputs), not just the wording of one prompt.

## Example

```python
system: "You are a SQL expert. Output only valid Postgres."
```

## When to use

Always try first. If a well-crafted prompt solves it, you are done.

## Related concepts

- is a type of → [Few-Shot / ICL](/adaptation/few-shot.md)
- is a type of → [Chain-of-Thought](/adaptation/cot.md)
- builds on → [RAG](/adaptation/rag.md)
