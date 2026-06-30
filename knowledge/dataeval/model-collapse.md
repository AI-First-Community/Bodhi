---
type: "Practice"
title: "Model Collapse"
description: "Recursively training on model-generated data erodes distribution tails, causing irreversible quality degradation — the core caution for synthetic data."
cluster: "dataeval"
level: 3
tags:
  - "dataeval"
when_to_use: "Any pipeline leaning heavily on synthetic data — keep a real-data anchor and verification step."
relations:
  - "combines:synthetic-data"
references:
  - "AI models collapse on recursive data (Nature 2024)|https://www.nature.com/articles/s41586-024-07566-y"
resource: "https://www.nature.com/articles/s41586-024-07566-y"
---

# Model Collapse

When models learn mostly from prior models' outputs, rare patterns vanish and quality decays generation over generation. Mitigations: anchor on accumulated real data (not replacement), and verify/filter synthetic samples before training.

## When to use

Any pipeline leaning heavily on synthetic data — keep a real-data anchor and verification step.

## References

- [AI models collapse on recursive data (Nature 2024)](https://www.nature.com/articles/s41586-024-07566-y)
