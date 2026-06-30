---
type: "Adaptation Strategy"
title: "Full Fine-Tuning"
description: "Update ALL weights on your data. Maximum capacity, maximum cost & risk."
cluster: "adaptation"
level: 3
tags:
  - "adaptation"
  - "adaptation-basics"
when_to_use: "Large domain shift, abundant data, and you have the GPUs. Otherwise prefer PEFT."
relations:
  - "builds-on:continued-pretraining"
  - "requires:fsdp-deepspeed"
  - "requires:mixed-precision"
---

# Full Fine-Tuning

Highest quality ceiling but memory-hungry: weights + gradients + Adam optimizer state alone are ~16 bytes/param (e.g. ~128 GB for an 8B model) before activations, so realistic full fine-tuning needs 180 GB+ and multi-GPU sharding. It also risks catastrophic forgetting and produces a full-size checkpoint per task. PEFT (LoRA) and QLoRA now match it on most tasks at a fraction of the cost — QLoRA brings an 8B fine-tune down to ~40–50 GB.

## Example

```python
# AdamW on 8B params ≈ 8B*(2+4+4+4) bytes ≈ 112 GB VRAM
```

## When to use

Large domain shift, abundant data, and you have the GPUs. Otherwise prefer PEFT.

## Related concepts

- builds on → [Continued Pretraining](/adaptation/continued-pretraining.md)
- requires → [FSDP / DeepSpeed ZeRO](/efficiency/fsdp-deepspeed.md)
- requires → [Mixed Precision (bf16/fp16)](/efficiency/mixed-precision.md)
