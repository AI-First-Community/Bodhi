---
type: "Efficiency Technique"
title: "AWQ"
description: "Activation-aware quantization — protect the ~1% salient weights to preserve accuracy at 4-bit."
cluster: "efficiency"
level: 4
tags:
  - "efficiency"
  - "fine-tuning-techniques"
when_to_use: "High-quality 4-bit inference, especially on edge/serving."
references:
  - "AWQ|https://arxiv.org/abs/2306.00978"
resource: "https://arxiv.org/abs/2306.00978"
---

# AWQ

Scales weights by activation magnitude before quantizing. Often beats GPTQ on accuracy and inference speed.

## When to use

High-quality 4-bit inference, especially on edge/serving.

## References

- [AWQ](https://arxiv.org/abs/2306.00978)
