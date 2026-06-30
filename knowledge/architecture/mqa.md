---
type: "Architecture Component"
title: "Multi-Query Attention (MQA)"
description: "Share a single key/value head across all query heads — extreme KV-cache compression at a modest quality cost."
cluster: "architecture"
level: 2
tags:
  - "architecture"
when_to_use: "When KV-cache memory dominates and you can tolerate a small quality hit; understand it to place GQA/MLA."
relations:
  - "improves-on:multi-head"
  - "alternative:gqa"
  - "combines:kv-cache"
references:
  - "Fast Transformer Decoding (MQA)|https://arxiv.org/abs/1911.02150"
resource: "https://arxiv.org/abs/1911.02150"
---

# Multi-Query Attention (MQA)

The endpoint of the MHA → GQA → MQA spectrum: one KV head for every query head, shrinking the KV cache the most and speeding decoding, with some quality loss. GQA is the balanced middle ground; MQA was used in PaLM and Falcon.

## When to use

When KV-cache memory dominates and you can tolerate a small quality hit; understand it to place GQA/MLA.

## References

- [Fast Transformer Decoding (MQA)](https://arxiv.org/abs/1911.02150)
