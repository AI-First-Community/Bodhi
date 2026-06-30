---
type: "Architecture Component"
title: "KV Cache"
description: "Cache past Key/Value tensors so each new token costs O(n) not O(n²) at inference."
cluster: "architecture"
level: 2
tags:
  - "architecture"
  - "core-mechanics"
when_to_use: "Critical for deployment/serving cost reasoning."
---

# KV Cache

The dominant memory consumer during generation — its size is `2 × batch × layers × kv_heads × seq_len × head_dim × bytes`, and at long context it can rival or exceed the model weights. Tackled at three levels: serving (PagedAttention/vLLM, prefix caching), quantization/eviction (FP8/INT8/INT4 KV cache for 4–8× reduction — KIVI, KVQuant), and — most impactfully — architecture: Grouped-Query Attention (GQA) and Multi-head Latent Attention (MLA) shrink the cache by design. Not used in training.

## When to use

Critical for deployment/serving cost reasoning.
