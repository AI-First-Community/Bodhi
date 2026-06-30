---
type: "Alignment Method"
title: "GRPO"
description: "Group Relative Policy Optimization — PPO without a value model; advantage = reward vs. the group mean."
cluster: "alignment"
level: 5
tags:
  - "alignment"
  - "advanced-alignment"
when_to_use: "Online RL fine-tuning (esp. reasoning) when you want PPO-style gains without the value-model overhead."
relations:
  - "alternative:dpo"
  - "improves-on:ppo"
  - "combines:rlvr"
references:
  - "DeepSeekMath / GRPO|https://arxiv.org/abs/2402.03300"
resource: "https://arxiv.org/abs/2402.03300"
---

# GRPO

Samples a group of responses per prompt, normalizes their rewards to get advantages, and skips the costly critic/value network of PPO. Far cheaper and more stable for RL fine-tuning. The algorithm behind DeepSeek-R1's reasoning training. It has known instabilities (entropy collapse, length/token-level bias) that successors specifically fix: DAPO (clip-higher, dynamic sampling, token-level loss), GSPO (sequence-level ratios for MoE), and Dr.GRPO.

## Example

```python
# advantage_i = (reward_i - mean(group_rewards)) / std(group_rewards)
```

## When to use

Online RL fine-tuning (esp. reasoning) when you want PPO-style gains without the value-model overhead.

## Related concepts

- alternative to → [DPO](/alignment/dpo.md)
- combines with → [RLVR (Verifiable Rewards)](/alignment/rlvr.md)

## References

- [DeepSeekMath / GRPO](https://arxiv.org/abs/2402.03300)
