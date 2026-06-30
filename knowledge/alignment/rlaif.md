---
type: "Alignment Method"
title: "RLAIF / Constitutional AI"
description: "Use an AI (guided by a written constitution) instead of humans to generate preference labels."
cluster: "alignment"
level: 5
tags:
  - "alignment"
  - "advanced-alignment"
when_to_use: "Human labeling is the bottleneck and you can encode your principles as rules."
references:
  - "Constitutional AI|https://arxiv.org/abs/2212.08073"
resource: "https://arxiv.org/abs/2212.08073"
---

# RLAIF / Constitutional AI

Scales preference data by replacing human raters with a model that critiques/ranks per stated principles. Constitutional AI (Anthropic) uses self-critique + RL from AI feedback for harmlessness.

## When to use

Human labeling is the bottleneck and you can encode your principles as rules.

## References

- [Constitutional AI](https://arxiv.org/abs/2212.08073)
