---
type: "Practice"
title: "Data Valuation & Example Importance"
description: "Score how much each training example contributes to model quality — influence functions, Data Shapley, gradient-based methods — to find harmful or redundant samples."
cluster: "dataeval"
level: 4
tags:
  - "dataeval"
when_to_use: "Debugging a dataset — finding the examples that help, hurt, or are redundant."
relations:
  - "combines:dataset-prep"
references:
  - "Influence Functions (Koh & Liang)|https://arxiv.org/abs/1703.04730"
resource: "https://arxiv.org/abs/1703.04730"
---

# Data Valuation & Example Importance

Not all data helps equally; some hurts. Data valuation estimates per-example contribution (influence functions, Shapley values, gradient tracing) to surface mislabeled, duplicated, or low-value samples and prioritize curation budget. Increasingly used to clean and select fine-tuning sets.

## When to use

Debugging a dataset — finding the examples that help, hurt, or are redundant.

## References

- [Influence Functions (Koh & Liang)](https://arxiv.org/abs/1703.04730)
