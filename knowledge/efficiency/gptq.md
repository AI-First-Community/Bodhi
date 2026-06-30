---
type: "Efficiency Technique"
title: "GPTQ"
description: "One-shot PTQ to 3–4 bit using second-order (Hessian) info to minimize error."
cluster: "efficiency"
level: 4
tags:
  - "efficiency"
  - "fine-tuning-techniques"
when_to_use: "Quantize a trained model for efficient GPU inference."
references:
  - "GPTQ|https://arxiv.org/abs/2210.17323"
resource: "https://arxiv.org/abs/2210.17323"
---

# GPTQ

Layer-by-layer weight quantization with error compensation. Fast, accurate 4-bit for inference. Popular for serving.

## When to use

Quantize a trained model for efficient GPU inference.

## References

- [GPTQ](https://arxiv.org/abs/2210.17323)
