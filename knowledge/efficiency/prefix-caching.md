---
type: "Efficiency Technique"
title: "Prefix Caching"
description: "Cache and reuse the KV states of shared prefixes (system prompts, few-shot examples, RAG context) so they are not recomputed per request."
cluster: "efficiency"
level: 5
tags:
  - "efficiency"
when_to_use: "Whenever requests share long prefixes — system prompts, tools, retrieved context."
relations:
  - "improves-on:kv-cache"
  - "combines:rag"
references:
  - "RadixAttention / SGLang|https://arxiv.org/abs/2312.07104"
resource: "https://arxiv.org/abs/2312.07104"
---

# Prefix Caching

Many requests share a long common prefix; prefix caching (RadixAttention in SGLang, automatic prefix caching in vLLM) stores its KV once and reuses it, skipping prefill for the shared part. Large latency/throughput wins for agents, RAG, and few-shot workloads.

## When to use

Whenever requests share long prefixes — system prompts, tools, retrieved context.

## References

- [RadixAttention / SGLang](https://arxiv.org/abs/2312.07104)
