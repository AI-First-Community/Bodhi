---
type: "Reasoning Method"
title: "Test-Time Compute Scaling"
description: "Spend more compute at inference (longer reasoning, more samples, search) to raise accuracy — a new scaling axis beyond model size."
cluster: "reasoning"
level: 5
tags:
  - "reasoning"
  - "inference"
when_to_use: "When a smaller model plus more inference compute beats a larger model at a fixed total budget."
relations:
  - "combines:reasoning-models"
  - "builds-on:cot"
  - "combines:self-consistency"
  - "combines:rejection-sampling"
references:
  - "Scaling LLM Test-Time Compute|https://arxiv.org/abs/2408.03314"
resource: "https://arxiv.org/abs/2408.03314"
---

# Test-Time Compute Scaling

Instead of (or alongside) scaling parameters and training data, allocate more compute at *inference*. Three families: (1) **parallel sampling + selection** — best-of-N or self-consistency voting; (2) **verifier-guided search** — score candidates with a reward model/verifier (or tree search); (3) **sequential refinement** — a long chain-of-thought that revises itself. For hard tasks this is often more cost-effective than a bigger model — a key finding behind reasoning models. It opens a third scaling axis complementing the classic parameter/data scaling laws.

## When to use

When a smaller model plus more inference compute beats a larger model at a fixed total budget.

## References

- [Scaling LLM Test-Time Compute Optimally](https://arxiv.org/abs/2408.03314)
