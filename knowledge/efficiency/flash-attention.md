---
type: "Efficiency Technique"
title: "FlashAttention"
description: "IO-aware exact attention kernel — fewer memory reads/writes, big speed & memory wins."
cluster: "efficiency"
level: 5
tags:
  - "efficiency"
  - "advanced-alignment"
when_to_use: "Always enable if supported — free speedup and longer context."
references:
  - "FlashAttention|https://arxiv.org/abs/2205.14135"
resource: "https://arxiv.org/abs/2205.14135"
---

# FlashAttention

Avoids materializing the n×n attention matrix in HBM via tiling and recomputation, making attention IO-bound rather than memory-bound. FA-2/3 deliver ~2–4× speedup and ~2–3× memory reduction vs. vanilla attention and unlock 128K-class contexts; standard in vLLM, SGLang, and transformers. Exact (not approximate) — same outputs, less memory traffic.

## When to use

Always enable if supported — free speedup and longer context.

## References

- [FlashAttention](https://arxiv.org/abs/2205.14135)
