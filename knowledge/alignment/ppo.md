---
type: "Alignment Method"
title: "PPO"
description: "The RL algorithm in classic RLHF — policy-gradient updates clipped for stability, with KL control."
cluster: "alignment"
level: 5
tags:
  - "alignment"
  - "advanced-alignment"
when_to_use: "Online RLHF when you have a good reward model and infra. Consider GRPO/DPO to simplify."
relations:
  - "alternative:dpo"
references:
  - "PPO|https://arxiv.org/abs/1707.06347"
resource: "https://arxiv.org/abs/1707.06347"
---

# PPO

Proximal Policy Optimization. Online: generate, score with reward model, update. Needs 4 models in memory (policy, ref, reward, value), tricky to tune. GRPO (used in DeepSeek) drops the value model for efficiency.

## When to use

Online RLHF when you have a good reward model and infra. Consider GRPO/DPO to simplify.

## Related concepts

- alternative to → [DPO](/alignment/dpo.md)
- improves on → [GRPO](/alignment/grpo.md)

## References

- [PPO](https://arxiv.org/abs/1707.06347)
