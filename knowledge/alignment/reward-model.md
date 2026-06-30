---
type: "Alignment Method"
title: "Reward Model"
description: "A model trained on human preference rankings to score how good a response is."
cluster: "alignment"
level: 5
tags:
  - "alignment"
  - "advanced-alignment"
when_to_use: "Needed for PPO-style RLHF and for best-of-n / rejection sampling."
relations:
  - "requires:ppo"
  - "requires:rejection-sampling"
---

# Reward Model

Usually the base LLM + a scalar head, trained with a Bradley-Terry pairwise loss on (chosen, rejected) pairs. Its quality caps RLHF quality; reward hacking is the central failure mode. By 2025–2026 this scalar form is increasingly replaced by Generative Reward Models (which critique-then-score), and RM quality is measured on RewardBench / RewardBench 2.

## Example

```python
loss = -log_sigmoid(reward(chosen) - reward(rejected))
```

## When to use

Needed for PPO-style RLHF and for best-of-n / rejection sampling.

## Related concepts

- requires → [PPO](/alignment/ppo.md)
- requires → [Rejection Sampling (Best-of-N)](/alignment/rejection-sampling.md)
