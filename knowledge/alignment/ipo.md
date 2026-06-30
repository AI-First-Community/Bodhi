---
type: "Alignment Method"
title: "IPO"
description: "Identity-PO: a DPO variant that adds regularization to curb overfitting to preferences."
cluster: "alignment"
level: 5
tags:
  - "alignment"
  - "advanced-alignment"
when_to_use: "DPO is overfitting or your preference data is noisy/saturated."
references:
  - "IPO|https://arxiv.org/abs/2310.12036"
resource: "https://arxiv.org/abs/2310.12036"
---

# IPO

Replaces DPO's log-sigmoid with a squared loss to avoid over-optimizing when preferences are deterministic / near-saturated.

## When to use

DPO is overfitting or your preference data is noisy/saturated.

## References

- [IPO](https://arxiv.org/abs/2310.12036)
