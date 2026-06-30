---
type: "Efficiency Technique"
title: "Quantization"
description: "Store/compute weights in fewer bits (8/4/even 2-bit) to cut memory and speed up inference."
cluster: "efficiency"
level: 4
tags:
  - "efficiency"
  - "fine-tuning-techniques"
when_to_use: "Deployment on limited hardware, or to make fine-tuning fit (QLoRA)."
relations:
  - "is-a:gptq"
  - "is-a:awq"
  - "is-a:bitsandbytes"
  - "combines:speculative-decoding"
---

# Quantization

Post-Training Quantization (PTQ) vs. Quantization-Aware Training. Enables big models on small GPUs. The frozen-base half of QLoRA. Trade a little accuracy for large memory savings.

## When to use

Deployment on limited hardware, or to make fine-tuning fit (QLoRA).

## Related concepts

- is a type of → [GPTQ](/efficiency/gptq.md)
- is a type of → [AWQ](/efficiency/awq.md)
- is a type of → [bitsandbytes (NF4/INT8)](/efficiency/bitsandbytes.md)
- combines with → [Speculative Decoding](/efficiency/speculative-decoding.md)
