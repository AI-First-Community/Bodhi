---
type: "Efficiency Technique"
title: "bitsandbytes (NF4/INT8)"
description: "The library providing 8-bit optimizers and 4-bit NF4 quantization used by QLoRA."
cluster: "efficiency"
level: 4
tags:
  - "efficiency"
  - "fine-tuning-techniques"
when_to_use: "Implementing QLoRA / loading big models in 4–8 bit."
---

# bitsandbytes (NF4/INT8)

LLM.int8() for inference, NF4 + double-quant for training. The practical backbone of memory-efficient fine-tuning in HuggingFace.

## When to use

Implementing QLoRA / loading big models in 4–8 bit.
