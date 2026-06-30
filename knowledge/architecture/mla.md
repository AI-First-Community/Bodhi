---
type: "Architecture Component"
title: "Multi-head Latent Attention (MLA)"
description: "Compress keys/values into a shared low-rank latent vector — ~3–5× smaller KV cache than GQA at equal or better quality."
cluster: "architecture"
level: 2
tags:
  - "architecture"
when_to_use: "When you want the strongest KV-cache reduction for long-context serving without GQA-level quality loss."
relations:
  - "improves-on:multi-head"
  - "alternative:gqa"
  - "requires:attention"
  - "combines:kv-cache"
references:
  - "DeepSeek-V2|https://arxiv.org/abs/2405.04434"
resource: "https://arxiv.org/abs/2405.04434"
---

# Multi-head Latent Attention (MLA)

Instead of caching full K/V per head, MLA jointly compresses them into a small latent that is cached and re-expanded at use. Gives a much larger effective state at a fraction of the memory. Core to DeepSeek-V2/V3 and adopted by Kimi and others.

## When to use

When you want the strongest KV-cache reduction for long-context serving without GQA-level quality loss.

## References

- [DeepSeek-V2](https://arxiv.org/abs/2405.04434)
