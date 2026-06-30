---
type: "Efficiency Technique"
title: "PagedAttention"
description: "Allocate the KV cache in non-contiguous blocks (OS-style virtual paging) to eliminate fragmentation and enable continuous batching."
cluster: "efficiency"
level: 5
tags:
  - "efficiency"
when_to_use: "The serving-side memory optimization behind vLLM; pairs with continuous batching and prefix caching."
relations:
  - "improves-on:kv-cache"
  - "combines:speculative-decoding"
references:
  - "PagedAttention / vLLM|https://arxiv.org/abs/2309.06180"
resource: "https://arxiv.org/abs/2309.06180"
---

# PagedAttention

The KV cache normally needs a contiguous slab sized to the max length, wasting memory. PagedAttention (vLLM) pages it into fixed blocks mapped via a block table, cutting waste to near zero and enabling sharing across requests. The foundation of modern high-throughput serving.

## When to use

The serving-side memory optimization behind vLLM; pairs with continuous batching and prefix caching.

## References

- [PagedAttention / vLLM](https://arxiv.org/abs/2309.06180)
