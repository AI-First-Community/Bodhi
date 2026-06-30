---
type: "Efficiency Technique"
title: "Speculative Decoding"
description: "A small draft model proposes several tokens; the big model verifies them in one pass — faster, identical output."
cluster: "efficiency"
level: 5
tags:
  - "efficiency"
  - "advanced-alignment"
when_to_use: "Cut generation latency/cost at serving time with zero quality loss."
relations:
  - "combines:kv-cache"
references:
  - "Speculative Decoding|https://arxiv.org/abs/2211.17192"
resource: "https://arxiv.org/abs/2211.17192"
---

# Speculative Decoding

Lossless inference speedup (2–4×): the target model accepts/rejects the draft's guesses in parallel. As of 2026 the production default is *self*-speculation — EAGLE-3 (drafting from the model's own features) and natively-trained multi-token-prediction (MTP) heads — which have superseded Medusa and standalone draft models in vLLM/SGLang/TRT-LLM. Pure serving optimization — output distribution is unchanged.

## When to use

Cut generation latency/cost at serving time with zero quality loss.

## Related concepts

- combines with → [KV Cache](/architecture/kv-cache.md)

## References

- [Speculative Decoding](https://arxiv.org/abs/2211.17192)
