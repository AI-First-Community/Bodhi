---
type: "Efficiency Technique"
title: "Pipeline Parallelism"
description: "Split a model's layers into sequential stages across GPUs, streaming micro-batches through the pipeline to fit models too big for one device."
cluster: "efficiency"
level: 5
added: "0.4.0"
tags:
  - "efficiency"
when_to_use: "Scaling across nodes when layers can be split into balanced stages — typically the third axis of 3D parallelism alongside tensor + data parallelism."
relations:
  - "alternative:tensor-parallelism"
  - "combines:fsdp-deepspeed"
references:
  - "GPipe|https://arxiv.org/abs/1811.06965"
  - "PipeDream (1F1B scheduling)|https://arxiv.org/abs/1806.03377"
resource: "https://arxiv.org/abs/1811.06965"
---

# Pipeline Parallelism

Pipeline parallelism partitions a model by **depth**: each GPU holds a contiguous block of layers (a *stage*) and passes activations to the next. To keep every stage busy instead of idle-waiting, the batch is split into **micro-batches** that flow through like an assembly line (GPipe), with schedules such as **1F1B** (PipeDream) interleaving forward and backward passes to shrink the idle "bubble" at the ends. It communicates only activations at stage boundaries — far less traffic than tensor parallelism's per-layer all-reduce — so it scales well *across* nodes; the trade-off is the pipeline bubble and the difficulty of balancing stage compute. At frontier scale it's combined with tensor + data parallelism (**3D parallelism**).

## When to use

Scaling across nodes when layers can be split into balanced stages — typically the third axis of 3D parallelism alongside tensor + data parallelism.

## References

- [GPipe](https://arxiv.org/abs/1811.06965)
- [PipeDream (1F1B scheduling)](https://arxiv.org/abs/1806.03377)
