---
type: "Reasoning Method"
title: "Process Reward Model (PRM)"
description: "Reward each step of a reasoning chain — not just the final answer — giving a denser signal for training and search."
cluster: "reasoning"
level: 5
tags:
  - "reasoning"
  - "reward-model"
when_to_use: "Training or verifying multi-step reasoning where step-level credit assignment and error localization help."
relations:
  - "improves-on:reward-model"
  - "combines:reasoning-models"
  - "combines:rlvr"
references:
  - "Let's Verify Step by Step|https://arxiv.org/abs/2305.20050"
resource: "https://arxiv.org/abs/2305.20050"
---

# Process Reward Model (PRM)

An *outcome* reward model (ORM) scores only the final answer; a *process* reward model scores every intermediate reasoning step. This denser supervision improves RL training stability, enables step-level verification, and powers search methods (beam/tree search over reasoning steps where each step is scored). PRMs are costlier to label — they need step-level annotations or automated step checking — but are stronger for hard reasoning.

## When to use

Training or verifying multi-step reasoning where step-level credit assignment and error localization help.

## References

- [Let's Verify Step by Step (OpenAI)](https://arxiv.org/abs/2305.20050)
