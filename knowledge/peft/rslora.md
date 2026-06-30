---
type: "PEFT Method"
title: "rsLoRA (Rank-Stabilized LoRA)"
description: "Scale LoRA by α/√r instead of α/r so higher ranks actually help instead of collapsing gradients."
cluster: "peft"
level: 4
tags:
  - "peft"
when_to_use: "Any time you want to use larger LoRA ranks without the usual plateau."
relations:
  - "improves-on:lora"
references:
  - "Rank-Stabilized LoRA|https://arxiv.org/abs/2312.03732"
resource: "https://arxiv.org/abs/2312.03732"
---

# rsLoRA (Rank-Stabilized LoRA)

Vanilla LoRA's α/r scaling makes large ranks underperform; the √r correction stabilizes gradients so increasing rank reliably improves quality. A one-flag change (use_rslora=True) in HuggingFace PEFT.

## Example

```python
LoraConfig(r=64, lora_alpha=16, use_rslora=True, target_modules=[...])
```

## When to use

Any time you want to use larger LoRA ranks without the usual plateau.

## References

- [Rank-Stabilized LoRA](https://arxiv.org/abs/2312.03732)
