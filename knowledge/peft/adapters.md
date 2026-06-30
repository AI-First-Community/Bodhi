---
type: "PEFT Method"
title: "Adapter Layers"
description: "Insert tiny bottleneck MLP modules between transformer layers; train only those."
cluster: "peft"
level: 4
tags:
  - "peft"
  - "fine-tuning-techniques"
when_to_use: "Multi-task setups needing composable, stackable task modules."
relations:
  - "alternative:lora"
references:
  - "Adapters|https://arxiv.org/abs/1902.00751"
resource: "https://arxiv.org/abs/1902.00751"
---

# Adapter Layers

The original PEFT method (Houlsby 2019). Down-project → nonlinearity → up-project, with a residual. Adds a small inference cost (not mergeable like LoRA), but very modular: adapters can be composed via AdapterFusion and combined across tasks/languages (MAD-X), and shared through hubs like AdapterHub.

## When to use

Multi-task setups needing composable, stackable task modules.

## Related concepts

- alternative to → [LoRA](/peft/lora.md)

## References

- [Adapters](https://arxiv.org/abs/1902.00751)
