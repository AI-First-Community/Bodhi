---
type: "Alignment Method"
title: "DPO"
description: "Direct Preference Optimization — skip the reward model & RL; optimize preferences with a simple loss."
cluster: "alignment"
level: 5
tags:
  - "alignment"
  - "advanced-alignment"
when_to_use: "Default choice for preference alignment — far simpler than PPO, near-equal quality."
relations:
  - "alternative:ipo"
  - "alternative:kto"
  - "alternative:orpo"
  - "alternative:simpo"
  - "combines:lora"
  - "requires:dataset-prep"
references:
  - "DPO|https://arxiv.org/abs/2305.18290"
resource: "https://arxiv.org/abs/2305.18290"
---

# DPO

Reframes RLHF as a classification loss directly on (chosen, rejected) pairs against a frozen reference model. No reward model, no sampling, no RL instability. Now the default preference-tuning method; works great on top of LoRA.

## Example

```python
from trl import DPOTrainer
DPOTrainer(model, ref_model, train_dataset=pref_ds, beta=0.1, ...)
```

## When to use

Default choice for preference alignment — far simpler than PPO, near-equal quality.

## Related concepts

- improves on → [IPO](/alignment/ipo.md)
- improves on → [KTO](/alignment/kto.md)
- improves on → [ORPO](/alignment/orpo.md)
- improves on → [SimPO](/alignment/simpo.md)
- combines with → [LoRA](/peft/lora.md)
- requires → [Dataset Curation](/dataeval/dataset-prep.md)

## References

- [DPO](https://arxiv.org/abs/2305.18290)
