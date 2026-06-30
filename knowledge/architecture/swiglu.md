---
type: "Architecture Component"
title: "SwiGLU (Gated FFN)"
description: "A gated feed-forward block — SiLU(xW) ⊙ (xV) — that outperforms ReLU/GELU MLPs at equal parameter budget."
cluster: "architecture"
level: 2
tags:
  - "architecture"
when_to_use: "The FFN activation in modern decoders; a small architectural lever with consistent gains."
relations:
  - "improves-on:ffn"
references:
  - "GLU Variants (Shazeer)|https://arxiv.org/abs/2002.05202"
resource: "https://arxiv.org/abs/2002.05202"
---

# SwiGLU (Gated FFN)

SwiGLU replaces the FFN's single activation with a gated product: one linear branch passed through Swish/SiLU multiplies another linear branch. (The gate is SiLU, not sigmoid.) It is the FFN standard in Llama, Mistral, and Qwen; GELU is its smooth-ReLU predecessor from the BERT/GPT-2 era.

## When to use

The FFN activation in modern decoders; a small architectural lever with consistent gains.

## References

- [GLU Variants (Shazeer)](https://arxiv.org/abs/2002.05202)
