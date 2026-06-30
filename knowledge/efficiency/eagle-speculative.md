---
type: "Efficiency Technique"
title: "Self-Speculative Decoding (EAGLE / MTP)"
description: "Draft tokens from the model's own features or trained multi-token-prediction heads, not a separate draft model — the production speculative-decoding default."
cluster: "efficiency"
level: 5
tags:
  - "efficiency"
when_to_use: "Cut generation latency/cost at serving time with zero change to output distribution."
relations:
  - "improves-on:speculative-decoding"
references:
  - "EAGLE-3|https://arxiv.org/abs/2503.01840"
resource: "https://arxiv.org/abs/2503.01840"
---

# Self-Speculative Decoding (EAGLE / MTP)

EAGLE-3 predicts future tokens from fused intermediate features; multi-token-prediction (MTP) heads are trained natively (DeepSeek-V3, Qwen3). Both give lossless 2–4× decode speedups and have superseded Medusa and standalone draft models in vLLM/SGLang/TRT-LLM.

## When to use

Cut generation latency/cost at serving time with zero change to output distribution.

## References

- [EAGLE-3](https://arxiv.org/abs/2503.01840)
