---
type: "Adaptation Strategy"
title: "Few-Shot / ICL"
description: "Put labeled examples in the prompt; the model infers the pattern (in-context learning)."
cluster: "adaptation"
level: 3
tags:
  - "adaptation"
  - "adaptation-basics"
when_to_use: "You have a few examples and want zero training. Beyond ~hundreds of examples, fine-tune instead."
relations:
  - "alternative:sft"
---

# Few-Shot / ICL

Emergent ability of large models — no gradient updates. Powerful but consumes context, is order-sensitive, and degrades vs. fine-tuning when you have many examples (>~50).

## When to use

You have a few examples and want zero training. Beyond ~hundreds of examples, fine-tune instead.

## Related concepts

- alternative to → [Supervised Fine-Tuning](/sft/sft.md)
