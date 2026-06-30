---
type: "Alignment Method"
title: "Rejection Sampling (Best-of-N)"
description: "Sample many responses, keep the best (per reward model / verifier), then SFT on them."
cluster: "alignment"
level: 5
tags:
  - "alignment"
  - "advanced-alignment"
when_to_use: "You have a reward model or verifier and want RL-like gains without RL instability."
relations:
  - "combines:sft"
  - "alternative:ppo"
references:
  - "STaR|https://arxiv.org/abs/2203.14465"
resource: "https://arxiv.org/abs/2203.14465"
---

# Rejection Sampling (Best-of-N)

aka RFT / RAFT / STaR-style bootstrapping. A simple, stable alternative to online RL: generate N, filter to the winners, fine-tune. Used in Llama-2/3 post-training. Easy to reason about and debug.

## When to use

You have a reward model or verifier and want RL-like gains without RL instability.

## Related concepts

- combines with → [Supervised Fine-Tuning](/sft/sft.md)
- alternative to → [PPO](/alignment/ppo.md)

## References

- [STaR](https://arxiv.org/abs/2203.14465)
