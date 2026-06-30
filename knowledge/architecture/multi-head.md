---
type: "Architecture Component"
title: "Multi-Head Attention"
description: "Run attention in parallel h times in subspaces, then concatenate — multiple \"relationship channels\"."
cluster: "architecture"
level: 2
tags:
  - "architecture"
  - "core-mechanics"
when_to_use: "Target modules for PEFT are usually the per-head projection matrices."
relations:
  - "combines:kv-cache"
---

# Multi-Head Attention

Each head can specialize (syntax, coreference, position). GQA/MQA reduce KV heads to save memory at inference, used in Llama-3, Mistral.

## When to use

Target modules for PEFT are usually the per-head projection matrices.

## Related concepts

- combines with → [KV Cache](/architecture/kv-cache.md)
