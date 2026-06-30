---
type: "Efficiency Technique"
title: "FP4 Microscaling (MXFP4 / NVFP4)"
description: "4-bit floating point with block-shared scales — native on Blackwell, used both for inference and increasingly for training."
cluster: "efficiency"
level: 4
tags:
  - "efficiency"
when_to_use: "Aggressive memory/throughput wins on Blackwell-class hardware where a small accuracy hit is acceptable."
relations:
  - "improves-on:quantization"
  - "requires:mixed-precision"
  - "alternative:gptq"
references:
  - "NVIDIA: Introducing NVFP4|https://developer.nvidia.com/blog/introducing-nvfp4-for-efficient-and-accurate-low-precision-inference/"
resource: "https://developer.nvidia.com/blog/introducing-nvfp4-for-efficient-and-accurate-low-precision-inference/"
---

# FP4 Microscaling (MXFP4 / NVFP4)

MXFP4 (OCP standard): E2M1 values in blocks of 32 sharing an E8M0 scale. NVFP4 is NVIDIA's finer-grained variant (16-element blocks, two-level FP8+FP32 scaling) — do not conflate the two. FP4 gives ~2–3× the arithmetic throughput and ~half the memory of FP8; MXFP4 is the checkpoint format behind GPT-OSS.

## When to use

Aggressive memory/throughput wins on Blackwell-class hardware where a small accuracy hit is acceptable.

## References

- [NVIDIA: Introducing NVFP4](https://developer.nvidia.com/blog/introducing-nvfp4-for-efficient-and-accurate-low-precision-inference/)
