---
type: "Architecture Component"
title: "Rotary Position Embeddings (RoPE)"
description: "Encode position as rotations applied to query/key vectors — relative-position aware and the basis for context-window extension."
cluster: "architecture"
level: 2
tags:
  - "architecture"
when_to_use: "The positional scheme behind almost every modern decoder; key to understanding long-context extension."
relations:
  - "builds-on:positional-encoding"
  - "requires:self-attention"
  - "combines:context-extension"
references:
  - "RoPE (RoFormer)|https://arxiv.org/abs/2104.09864"
resource: "https://arxiv.org/abs/2104.09864"
---

# Rotary Position Embeddings (RoPE)

Rather than adding a position vector, RoPE rotates Q and K by an angle proportional to position, so attention naturally depends on *relative* offsets. It extrapolates better than learned/sinusoidal encodings and is the de-facto standard in Llama, Mistral, Qwen, and DeepSeek. RoPE scaling (NTK, YaRN, LongRoPE) is how short-context models get extended.

## When to use

The positional scheme behind almost every modern decoder; key to understanding long-context extension.

## References

- [RoPE (RoFormer)](https://arxiv.org/abs/2104.09864)
