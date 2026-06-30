---
type: "Adaptation Strategy"
title: "Chain-of-Thought"
description: "Prompt the model to reason step-by-step before answering — boosts reasoning accuracy."
cluster: "adaptation"
level: 3
tags:
  - "adaptation"
  - "adaptation-basics"
when_to_use: "Math, logic, multi-step tasks. Can also become *training data* for reasoning fine-tunes."
relations:
  - "builds-on:react"
references:
  - "CoT|https://arxiv.org/abs/2201.11903"
resource: "https://arxiv.org/abs/2201.11903"
---

# Chain-of-Thought

"Let's think step by step." Variants: zero-shot CoT, self-consistency (sample many, vote), tree-of-thought. Note the 2024+ shift: CoT *prompting* elicits latent reasoning in a base model, whereas reasoning models (o1/o3, DeepSeek-R1) *acquire* reasoning via RL on reasoning traces — the long chain-of-thought is learned and emergent, not just prompted.

## When to use

Math, logic, multi-step tasks. Can also become *training data* for reasoning fine-tunes.

## Related concepts

- builds on → [ReAct / Tool Use](/adaptation/react.md)

## References

- [CoT](https://arxiv.org/abs/2201.11903)
