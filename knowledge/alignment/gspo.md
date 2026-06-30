---
type: "Alignment Method"
title: "Group Sequence Policy Optimization (GSPO)"
description: "Define the RL importance ratio at the sequence level (not per token) for sequence-level clipping — stabilizes MoE RL."
cluster: "alignment"
level: 5
tags:
  - "alignment"
when_to_use: "Reasoning RL on large or MoE models where token-level methods are unstable."
relations:
  - "improves-on:grpo"
  - "alternative:dapo"
references:
  - "GSPO|https://arxiv.org/abs/2507.18071"
resource: "https://arxiv.org/abs/2507.18071"
---

# Group Sequence Policy Optimization (GSPO)

Token-level ratios (as in GRPO/PPO) destabilize training of large MoE models. GSPO clips at the sequence level, giving more stable updates; it powers Qwen3 post-training.

## When to use

Reasoning RL on large or MoE models where token-level methods are unstable.

## References

- [GSPO](https://arxiv.org/abs/2507.18071)
