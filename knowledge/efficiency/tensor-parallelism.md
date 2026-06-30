---
type: "Efficiency Technique"
title: "Tensor Parallelism"
description: "Split individual weight matrices across GPUs (column/row partitions with all-reduce) to run models larger than one GPU."
cluster: "efficiency"
level: 5
tags:
  - "efficiency"
when_to_use: "Serving or training a model that exceeds a single GPU's memory or compute."
relations:
  - "alternative:fsdp-deepspeed"
  - "requires:full-ft"
references:
  - "Megatron-LM|https://arxiv.org/abs/1909.08053"
resource: "https://arxiv.org/abs/1909.08053"
---

# Tensor Parallelism

Where FSDP/ZeRO shards optimizer state, tensor parallelism (Megatron-LM) partitions the matmuls themselves across devices, communicating activations each layer. Lower latency than pipeline parallelism but communication-heavy; usually combined with pipeline + data parallelism (3D parallelism) at scale.

## When to use

Serving or training a model that exceeds a single GPU's memory or compute.

## References

- [Megatron-LM](https://arxiv.org/abs/1909.08053)
