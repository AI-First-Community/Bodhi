---
type: "Concept"
title: "Context Window"
description: "The maximum number of tokens the model can attend to at once (e.g. 8K, 128K, 1M)."
cluster: "foundations"
level: 1
tags:
  - "foundations"
  - "foundations"
when_to_use: "Decide between long-context prompting vs. RAG vs. fine-tuning when knowledge exceeds the window."
references:
  - "Lost in the Middle|https://arxiv.org/abs/2307.03172"
resource: "https://arxiv.org/abs/2307.03172"
---

# Context Window

Bounded by positional encoding scheme and the O(n²) cost of attention. Extension tricks: RoPE scaling, ALiBi, sliding-window attention. Long context ≠ good recall ("lost in the middle").

## When to use

Decide between long-context prompting vs. RAG vs. fine-tuning when knowledge exceeds the window.

## References

- [Lost in the Middle](https://arxiv.org/abs/2307.03172)
