---
type: "Efficiency Technique"
title: "Multi-Token Prediction (MTP)"
description: "Train auxiliary heads to predict several future tokens at once — better sample efficiency and built-in self-speculation at decode time."
cluster: "efficiency"
level: 5
tags:
  - "efficiency"
when_to_use: "Pretraining for efficiency and to natively enable fast self-speculative inference."
relations:
  - "improves-on:speculative-decoding"
  - "combines:eagle-speculative"
references:
  - "Multi-Token Prediction (Gloeckle et al)|https://arxiv.org/abs/2404.19737"
resource: "https://arxiv.org/abs/2404.19737"
---

# Multi-Token Prediction (MTP)

Instead of predicting only the next token, MTP adds heads that predict the next k tokens from a shared trunk, improving training signal and enabling cheap self-speculative decoding (the heads draft, the model verifies). Shipped in DeepSeek-V3 and used by Qwen3.

## When to use

Pretraining for efficiency and to natively enable fast self-speculative inference.

## References

- [Multi-Token Prediction (Gloeckle et al)](https://arxiv.org/abs/2404.19737)
