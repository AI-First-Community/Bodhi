---
type: "Alignment Method"
title: "RLHF"
description: "Align with human preferences: SFT → train a reward model → optimize policy with RL (PPO)."
cluster: "alignment"
level: 5
tags:
  - "alignment"
  - "advanced-alignment"
when_to_use: "You need nuanced alignment (helpfulness, safety, tone) beyond what demonstrations give."
relations:
  - "requires:reward-model"
  - "requires:ppo"
  - "requires:sft"
  - "alternative:dpo"
  - "alternative:rlaif"
references:
  - "InstructGPT|https://arxiv.org/abs/2203.02155"
resource: "https://arxiv.org/abs/2203.02155"
---

# RLHF

The classic 3-stage pipeline behind InstructGPT/ChatGPT. Humans rank outputs → reward model learns the preference → PPO updates the LLM to maximize reward while a KL penalty keeps it near the SFT model. Powerful but complex and unstable.

## When to use

You need nuanced alignment (helpfulness, safety, tone) beyond what demonstrations give.

## Related concepts

- requires → [Reward Model](/alignment/reward-model.md)
- requires → [PPO](/alignment/ppo.md)
- alternative to → [DPO](/alignment/dpo.md)
- alternative to → [RLAIF / Constitutional AI](/alignment/rlaif.md)

## References

- [InstructGPT](https://arxiv.org/abs/2203.02155)
