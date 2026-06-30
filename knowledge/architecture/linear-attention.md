---
type: "Architecture Component"
title: "Linear Attention"
description: "Replace softmax attention with a kernel/recurrent form that is linear in sequence length and supports O(1) decoding."
cluster: "architecture"
level: 2
tags:
  - "architecture"
when_to_use: "When you need attention-like quality with linear cost and constant-memory decoding."
relations:
  - "alternative:attention"
  - "combines:transformer"
references:
  - "Gated Linear Attention|https://arxiv.org/abs/2312.06635"
resource: "https://arxiv.org/abs/2312.06635"
---

# Linear Attention

A family — RetNet, Gated Linear Attention (GLA), Gated DeltaNet, Lightning Attention — that reformulates attention so it can run in parallel, recurrent, or chunkwise modes with constant per-token state. Gated DeltaNet powers Qwen3-Next; Lightning Attention powers MiniMax-01. Newer sparse-attention work (NSA, DeepSeek Sparse Attention) is a related thread.

## When to use

When you need attention-like quality with linear cost and constant-memory decoding.

## References

- [Gated Linear Attention](https://arxiv.org/abs/2312.06635)
