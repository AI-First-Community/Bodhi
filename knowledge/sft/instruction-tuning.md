---
type: "Training Method"
title: "Instruction Tuning"
description: "SFT on diverse (instruction → response) data so the model follows arbitrary instructions."
cluster: "sft"
level: 4
tags:
  - "sft"
  - "fine-tuning-techniques"
when_to_use: "Turn a base model into a general instruction-follower before specializing."
relations:
  - "builds-on:sft"
references:
  - "FLAN|https://arxiv.org/abs/2109.01652"
resource: "https://arxiv.org/abs/2109.01652"
---

# Instruction Tuning

FLAN, Alpaca, etc. Generalizes to unseen instructions. The difference between a raw base model and a usable "instruct" model.

## When to use

Turn a base model into a general instruction-follower before specializing.

## Related concepts

- builds on → [Supervised Fine-Tuning](/sft/sft.md)

## References

- [FLAN](https://arxiv.org/abs/2109.01652)
