---
type: "PEFT Method"
title: "Prefix Tuning"
description: "Prepend trainable \"virtual\" key/value vectors to every attention layer; freeze the model."
cluster: "peft"
level: 4
tags:
  - "peft"
  - "fine-tuning-techniques"
when_to_use: "Generation tasks where you want deeper steering than input-only soft prompts."
relations:
  - "alternative:p-tuning"
references:
  - "Prefix-Tuning|https://arxiv.org/abs/2101.00190"
resource: "https://arxiv.org/abs/2101.00190"
---

# Prefix Tuning

Learns continuous task-specific prefixes in activation space at each layer. More expressive than prompt tuning (which only touches the input layer).

## When to use

Generation tasks where you want deeper steering than input-only soft prompts.

## Related concepts

- alternative to → [P-Tuning (v2)](/peft/p-tuning.md)

## References

- [Prefix-Tuning](https://arxiv.org/abs/2101.00190)
