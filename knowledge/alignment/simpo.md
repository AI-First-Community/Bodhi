---
type: "Alignment Method"
title: "SimPO"
description: "Simple PO — reference-free DPO using length-normalized reward, often stronger than DPO."
cluster: "alignment"
level: 5
tags:
  - "alignment"
  - "advanced-alignment"
when_to_use: "Want reference-free preference tuning with strong benchmarks and less length bias."
references:
  - "SimPO|https://arxiv.org/abs/2405.14734"
resource: "https://arxiv.org/abs/2405.14734"
---

# SimPO

Drops the reference model and uses the average log-prob as an implicit reward with a target margin, reducing length bias.

## When to use

Want reference-free preference tuning with strong benchmarks and less length bias.

## References

- [SimPO](https://arxiv.org/abs/2405.14734)
