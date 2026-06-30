---
type: "Concept"
title: "Scaling Laws"
description: "Loss falls as a power law in parameters, data, and compute — predictably."
cluster: "foundations"
level: 1
tags:
  - "foundations"
  - "foundations"
when_to_use: "Reason about whether a bigger base model or more fine-tuning data will help more."
references:
  - "Chinchilla|https://arxiv.org/abs/2203.15556"
resource: "https://arxiv.org/abs/2203.15556"
---

# Scaling Laws

Kaplan (2020) then Chinchilla (2022): for a fixed compute budget, params and tokens should scale together (~20 tokens/param optimal). That ~20:1 ratio is a 2022 *compute-optimal* estimate for training cost only — modern models deliberately **over-train far beyond it** (often hundreds–thousands of tokens/param) to shrink a smaller model that's cheaper to serve. Scaling has since been extended to data quality and test-time compute. Explains why "bigger + more data" reliably works and informs the build-vs-fine-tune decision.

## When to use

Reason about whether a bigger base model or more fine-tuning data will help more.

## References

- [Chinchilla](https://arxiv.org/abs/2203.15556)
