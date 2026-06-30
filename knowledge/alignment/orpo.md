---
type: "Alignment Method"
title: "ORPO"
description: "Odds-Ratio PO — combine SFT and preference alignment into ONE stage, no reference model."
cluster: "alignment"
level: 5
tags:
  - "alignment"
  - "advanced-alignment"
when_to_use: "You want a single-stage, reference-free pipeline (less compute, less plumbing)."
relations:
  - "combines:sft"
references:
  - "ORPO|https://arxiv.org/abs/2403.07691"
resource: "https://arxiv.org/abs/2403.07691"
---

# ORPO

Adds an odds-ratio penalty to the SFT loss so the model learns format AND preferences simultaneously. No separate SFT or reference model needed — simplest pipeline of all.

## When to use

You want a single-stage, reference-free pipeline (less compute, less plumbing).

## Related concepts

- combines with → [Supervised Fine-Tuning](/sft/sft.md)

## References

- [ORPO](https://arxiv.org/abs/2403.07691)
