---
type: "Efficiency Technique"
title: "Mixed Precision (bf16/fp16)"
description: "Train in 16-bit to halve memory and double throughput, with key ops kept in fp32."
cluster: "efficiency"
level: 4
tags:
  - "efficiency"
  - "fine-tuning-techniques"
when_to_use: "Essentially always for training on modern GPUs."
---

# Mixed Precision (bf16/fp16)

bf16 (wider range, no loss scaling) is the standard training precision on modern datacenter GPUs (H100/H200, Blackwell, and accelerators like Trainium and Gaudi); A100/H100 remain widely deployed, with fp32 kept for stability-critical ops (norms, softmax, loss). The 2025–2026 frontier pushes further to FP8 and FP4 (see those nodes). Foundational training optimization beneath everything else.

## When to use

Essentially always for training on modern GPUs.
