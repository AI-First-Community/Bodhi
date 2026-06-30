---
type: "PEFT Method"
title: "Prompt Tuning"
description: "Learn a handful of soft (continuous) prompt embeddings prepended to the input only."
cluster: "peft"
level: 4
tags:
  - "peft"
  - "fine-tuning-techniques"
when_to_use: "Very large frozen model, many tasks, minimal storage. Weak on small models."
relations:
  - "improves-on:prefix-tuning"
references:
  - "Prompt Tuning|https://arxiv.org/abs/2104.08691"
resource: "https://arxiv.org/abs/2104.08691"
---

# Prompt Tuning

The most parameter-light PEFT — just a few thousand params. Most effective at large scale (13B+); on sub-1B models it needs careful tuning and trails LoRA, becoming competitive around 3–7B with good initialization. "The power of scale for parameter-efficient prompt tuning."

## When to use

Very large frozen model, many tasks, minimal storage. Weak on small models.

## Related concepts

- improves on → [Prefix Tuning](/peft/prefix-tuning.md)

## References

- [Prompt Tuning](https://arxiv.org/abs/2104.08691)
