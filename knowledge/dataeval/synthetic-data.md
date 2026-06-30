---
type: "Practice"
title: "Synthetic Data"
description: "Generate training data with a stronger model (self-instruct, Evol-Instruct, distillation)."
cluster: "dataeval"
level: 3
tags:
  - "dataeval"
  - "adaptation-basics"
when_to_use: "You lack labeled data and have access to a capable teacher model."
references:
  - "Self-Instruct|https://arxiv.org/abs/2212.10560"
resource: "https://arxiv.org/abs/2212.10560"
---

# Synthetic Data

Bootstraps datasets cheaply (Alpaca, WizardLM, Orca). By 2025–2026 it became a *pretraining* tool too, not just instruction data: rephrasing web text (WRAP, Nemotron-CC) for ~3× speedups, persona-conditioned generation (Persona Hub, ~1B personas) for diversity, and reasoning-trace distillation from frontier reasoners (R1). Must filter for quality and watch licensing/model-output terms; over-reliance risks model collapse (distribution-tail erosion) — anchor on real data and verify samples.

## When to use

You lack labeled data and have access to a capable teacher model.

## References

- [Self-Instruct](https://arxiv.org/abs/2212.10560)
