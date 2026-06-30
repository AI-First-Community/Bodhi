---
type: "Architecture Component"
title: "Sliding-Window Attention (SWA)"
description: "Each layer attends only to a fixed local window; stacked layers still propagate information far beyond it."
cluster: "architecture"
level: 2
tags:
  - "architecture"
when_to_use: "Long sequences where most relevant context is local and you want linear-ish cost."
relations:
  - "alternative:attention"
  - "combines:kv-cache"
references:
  - "Mistral 7B|https://arxiv.org/abs/2310.06825"
resource: "https://arxiv.org/abs/2310.06825"
---

# Sliding-Window Attention (SWA)

Caps attention cost at O(n·w) instead of O(n²) by restricting each token to a window of recent tokens (e.g. 4096). Information flows further as it passes up the layer stack. Used in Mistral, Gemma 2, Phi-3, and GPT-OSS, often interleaved with full-attention layers.

## When to use

Long sequences where most relevant context is local and you want linear-ish cost.

## References

- [Mistral 7B](https://arxiv.org/abs/2310.06825)
