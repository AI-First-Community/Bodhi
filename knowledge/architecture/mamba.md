---
type: "Architecture Component"
title: "Mamba / State-Space Models (SSM)"
description: "Selective state-space sequence model with linear-time recurrence and constant memory per token — an attention-free alternative."
cluster: "architecture"
level: 2
tags:
  - "architecture"
when_to_use: "Very long sequences and high-throughput inference where the O(n²) attention cost dominates."
relations:
  - "alternative:transformer"
  - "alternative:attention"
references:
  - "Mamba-2: Transformers are SSMs|https://arxiv.org/abs/2405.21060"
resource: "https://arxiv.org/abs/2405.21060"
---

# Mamba / State-Space Models (SSM)

SSMs (S4 → Mamba) model sequences with a learned recurrence instead of pairwise attention. Mamba adds input-dependent (selective) state updates and a hardware-aware parallel scan; Mamba-2's state-space duality (SSD) ties SSMs to linear attention and is the block used in most 2025 hybrids. Linear time, constant KV-free memory.

## When to use

Very long sequences and high-throughput inference where the O(n²) attention cost dominates.

## References

- [Mamba-2: Transformers are SSMs](https://arxiv.org/abs/2405.21060)
