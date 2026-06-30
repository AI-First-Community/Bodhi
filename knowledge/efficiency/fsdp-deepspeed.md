---
type: "Efficiency Technique"
title: "FSDP / DeepSpeed ZeRO"
description: "Shard params, gradients, and optimizer state across GPUs to train models bigger than one GPU."
cluster: "efficiency"
level: 5
tags:
  - "efficiency"
  - "advanced-alignment"
when_to_use: "Multi-GPU full fine-tuning or very large models."
references:
  - "ZeRO|https://arxiv.org/abs/1910.02054"
resource: "https://arxiv.org/abs/1910.02054"
---

# FSDP / DeepSpeed ZeRO

ZeRO stages 1–3 / Fully Sharded Data Parallel partition state so memory scales with GPU count. Required for full fine-tuning of large models. CPU/NVMe offload for extreme cases.

## When to use

Multi-GPU full fine-tuning or very large models.

## References

- [ZeRO](https://arxiv.org/abs/1910.02054)
