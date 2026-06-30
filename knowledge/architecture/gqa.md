---
type: "Architecture Component"
title: "Grouped-Query Attention (GQA)"
description: "Share one key/value head across a group of query heads — shrinks the KV cache with near-MHA quality."
cluster: "architecture"
level: 2
tags:
  - "architecture"
when_to_use: "Essentially the standard choice for decoder LLMs that need efficient long-context inference."
relations:
  - "improves-on:multi-head"
  - "alternative:mla"
  - "combines:kv-cache"
references:
  - "GQA (Ainslie 2023)|https://arxiv.org/abs/2305.13245"
resource: "https://arxiv.org/abs/2305.13245"
---

# Grouped-Query Attention (GQA)

Interpolates between Multi-Head Attention (one KV head per query head) and Multi-Query Attention (a single shared KV head). By grouping query heads to share an intermediate number of KV heads, it cuts KV-cache memory and speeds decoding at minimal quality cost. Now the default attention in Llama 2/3, Mistral, Gemma, and Qwen.

## When to use

Essentially the standard choice for decoder LLMs that need efficient long-context inference.

## References

- [GQA (Ainslie 2023)](https://arxiv.org/abs/2305.13245)
