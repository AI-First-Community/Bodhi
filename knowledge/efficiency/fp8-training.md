---
type: "Efficiency Technique"
title: "FP8 Training & Inference"
description: "8-bit floating point (E4M3/E5M2) — the default production precision on Hopper/Blackwell, validated for training at 600B+ scale."
cluster: "efficiency"
level: 4
tags:
  - "efficiency"
when_to_use: "Default training/inference precision on modern datacenter GPUs when kernels support it."
relations:
  - "improves-on:mixed-precision"
  - "builds-on:quantization"
references:
  - "DeepSeek-V3 Technical Report|https://arxiv.org/abs/2412.19437"
resource: "https://arxiv.org/abs/2412.19437"
---

# FP8 Training & Inference

FP8 halves memory and roughly doubles throughput vs BF16 while keeping enough range/precision for stable training with per-tensor or blockwise scaling. DeepSeek-V3 demonstrated native blockwise FP8 training at 671B parameters; FP8 inference is now standard in serving stacks.

## When to use

Default training/inference precision on modern datacenter GPUs when kernels support it.

## References

- [DeepSeek-V3 Technical Report](https://arxiv.org/abs/2412.19437)
