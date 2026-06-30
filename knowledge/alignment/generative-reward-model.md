---
type: "Alignment Method"
title: "Generative Reward Models (GenRM)"
description: "Reward models that write a chain-of-thought critique before/with the score — more accurate, interpretable, and extendable to non-verifiable domains."
cluster: "alignment"
level: 5
tags:
  - "alignment"
when_to_use: "When a scalar reward is too brittle or you need rewards in domains without a programmatic verifier."
relations:
  - "improves-on:reward-model"
  - "combines:llm-as-judge"
references:
  - "Inference-Time Scaling for Generalist Reward Modeling|https://arxiv.org/abs/2504.02495"
resource: "https://arxiv.org/abs/2504.02495"
---

# Generative Reward Models (GenRM)

Classic reward models emit a single scalar (Bradley-Terry). GenRMs generate a reasoned judgment, can be scaled at inference time, and bridge RLHF with LLM-as-judge. Approaches like DeepSeek-GRM/SPCT extend verifiable-reward training to soft, non-checkable domains.

## When to use

When a scalar reward is too brittle or you need rewards in domains without a programmatic verifier.

## References

- [Inference-Time Scaling for Generalist Reward Modeling](https://arxiv.org/abs/2504.02495)
