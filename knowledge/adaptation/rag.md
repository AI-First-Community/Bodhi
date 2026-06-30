---
type: "Adaptation Strategy"
title: "RAG"
description: "Retrieve relevant documents and inject them into the prompt — adds knowledge without training."
cluster: "adaptation"
level: 3
tags:
  - "adaptation"
  - "adaptation-basics"
when_to_use: "Knowledge that changes often, needs citations, or is too large for the context window. Pairs well with a fine-tuned model."
relations:
  - "alternative:full-ft"
  - "requires:context-window"
  - "builds-on:peft"
references:
  - "RAG (Lewis 2020)|https://arxiv.org/abs/2005.11401"
resource: "https://arxiv.org/abs/2005.11401"
---

# RAG

Embed corpus → vector DB → retrieve top-k for a query → ground the answer. Updates instantly, cites sources, avoids stale weights. Does NOT teach new *skills* or *style* — only supplies *facts*. Often the right answer when people think they need fine-tuning.

## When to use

Knowledge that changes often, needs citations, or is too large for the context window. Pairs well with a fine-tuned model.

## Related concepts

- alternative to → [Full Fine-Tuning](/adaptation/full-ft.md)
- requires → [Context Window](/foundations/context-window.md)
- builds on → [PEFT](/peft/peft.md)

## References

- [RAG (Lewis 2020)](https://arxiv.org/abs/2005.11401)
