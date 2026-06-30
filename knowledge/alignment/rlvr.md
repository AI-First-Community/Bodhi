---
type: "Alignment Method"
title: "RLVR (Verifiable Rewards)"
description: "RL where the reward is a programmatic check (unit tests pass, answer matches) — no reward model."
cluster: "alignment"
level: 5
tags:
  - "alignment"
  - "advanced-alignment"
when_to_use: "Tasks with an automatic correctness signal — math, code, structured outputs, agentic tool success."
relations:
  - "combines:cot"
  - "alternative:reward-model"
  - "requires:evaluation"
references:
  - "Tülu 3 / RLVR|https://arxiv.org/abs/2411.15124"
resource: "https://arxiv.org/abs/2411.15124"
---

# RLVR (Verifiable Rewards)

Reinforcement Learning with Verifiable Rewards: for math/code/logic, correctness is checkable, so the verifier *is* the reward. Eliminates reward-model bias and hacking. Combined with GRPO, this is how modern reasoning models (o1/R1-style) are trained to "think".

## When to use

Tasks with an automatic correctness signal — math, code, structured outputs, agentic tool success.

## Related concepts

- combines with → [Chain-of-Thought](/adaptation/cot.md)
- alternative to → [Reward Model](/alignment/reward-model.md)
- requires → [Evaluation](/dataeval/evaluation.md)

## References

- [Tülu 3 / RLVR](https://arxiv.org/abs/2411.15124)
