---
type: "Adaptation Strategy"
title: "ReAct / Tool Use"
description: "Interleave reasoning with tool/API calls — the basis of agents."
cluster: "adaptation"
level: 3
tags:
  - "adaptation"
  - "adaptation-basics"
when_to_use: "When the model needs live data or to take actions. Often combined with RAG."
relations:
  - "combines:rag"
references:
  - "ReAct|https://arxiv.org/abs/2210.03629"
resource: "https://arxiv.org/abs/2210.03629"
---

# ReAct / Tool Use

Reason → Act (call tool) → Observe → repeat. Function calling is often itself fine-tuned into models. The bridge from a chat model to an agent.

## When to use

When the model needs live data or to take actions. Often combined with RAG.

## Related concepts

- combines with → [RAG](/adaptation/rag.md)

## References

- [ReAct](https://arxiv.org/abs/2210.03629)
