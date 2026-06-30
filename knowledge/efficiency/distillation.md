---
type: "Efficiency Technique"
title: "Knowledge Distillation"
description: "Train a small \"student\" to mimic a large \"teacher\" — compress capability into a cheaper model."
cluster: "efficiency"
level: 4
tags:
  - "efficiency"
  - "fine-tuning-techniques"
when_to_use: "You need the behavior of a big model at the cost of a small one."
relations:
  - "combines:synthetic-data"
  - "requires:decoder-gpt"
references:
  - "Distillation|https://arxiv.org/abs/1503.02531"
resource: "https://arxiv.org/abs/1503.02531"
---

# Knowledge Distillation

Match teacher logits (soft labels) and/or generate synthetic data from the teacher (sequence-level distillation, e.g. Alpaca from GPT). DistilBERT, Zephyr. Trades a little quality for big speed/cost wins.

## When to use

You need the behavior of a big model at the cost of a small one.

## Related concepts

- combines with → [Synthetic Data](/dataeval/synthetic-data.md)
- requires → [Decoder-only (GPT)](/modeltypes/decoder-gpt.md)

## References

- [Distillation](https://arxiv.org/abs/1503.02531)
