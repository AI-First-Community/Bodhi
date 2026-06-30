---
type: "PEFT Method"
title: "LoRA"
description: "Freeze W; learn a low-rank update ΔW = B·A (rank r ≪ d). The workhorse of PEFT."
cluster: "peft"
level: 4
tags:
  - "peft"
  - "fine-tuning-techniques"
when_to_use: "Your default PEFT method. Cheap, mergeable, composable, well-supported."
relations:
  - "improves-on:qlora"
  - "improves-on:dora"
  - "improves-on:adalora"
  - "alternative:full-ft"
  - "requires:attention"
  - "combines:model-merging"
references:
  - "LoRA|https://arxiv.org/abs/2106.09685"
resource: "https://arxiv.org/abs/2106.09685"
---

# LoRA

Trains two small matrices per target layer; merges into W at inference for zero added latency. Knobs: rank r (8–64), alpha (scaling), target_modules, dropout. Adapters are swappable and only a few MB each. For more quality at low rank see **DoRA** (weight decomposition); for faster, better convergence see **PiSSA**/**LoRA-GA** (smarter initialization), **rsLoRA** (rank-stable scaling), and **LoRA+** (higher LR on B).

## Example

```python
from peft import LoraConfig
LoraConfig(r=16, lora_alpha=32, lora_dropout=0.05,
  target_modules=["q_proj","k_proj","v_proj","o_proj"], task_type="CAUSAL_LM")
```

## When to use

Your default PEFT method. Cheap, mergeable, composable, well-supported.

## Related concepts

- improves on → [QLoRA](/peft/qlora.md)
- improves on → [DoRA](/peft/dora.md)
- improves on → [AdaLoRA](/peft/adalora.md)
- alternative to → [Full Fine-Tuning](/adaptation/full-ft.md)
- requires → [Attention](/architecture/attention.md)
- combines with → [Model Merging](/efficiency/model-merging.md)

## References

- [LoRA](https://arxiv.org/abs/2106.09685)
