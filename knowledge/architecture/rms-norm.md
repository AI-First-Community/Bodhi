---
type: "Architecture Component"
title: "RMSNorm"
description: "Normalize activations by their root-mean-square only (no mean-centering) — cheaper than LayerNorm at equal quality."
cluster: "architecture"
level: 2
tags:
  - "architecture"
when_to_use: "The normalization layer in essentially every current LLM; contrast with LayerNorm."
relations:
  - "requires:transformer"
references:
  - "RMSNorm (Zhang & Sennrich)|https://arxiv.org/abs/1910.07468"
resource: "https://arxiv.org/abs/1910.07468"
---

# RMSNorm

RMSNorm drops the mean-subtraction and bias of LayerNorm, rescaling by RMS with a learned gain. It is faster and the modern decoder default (Llama, Mistral, Qwen). LayerNorm (the original Transformer norm, per-token mean/variance + affine) remains the baseline contrast and is still used in encoders.

## When to use

The normalization layer in essentially every current LLM; contrast with LayerNorm.

## References

- [RMSNorm (Zhang & Sennrich)](https://arxiv.org/abs/1910.07468)
