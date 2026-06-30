---
type: "PEFT Method"
title: "VeRA (Vector-based Random Matrix Adaptation)"
description: "Freeze a single pair of random low-rank matrices shared across all layers and train only tiny per-layer scaling vectors — ~10× fewer params than LoRA."
cluster: "peft"
level: 4
tags:
  - "peft"
when_to_use: "Extreme parameter/storage efficiency across many tasks, especially on large frozen models."
relations:
  - "improves-on:lora"
references:
  - "VeRA|https://arxiv.org/abs/2310.11454"
resource: "https://arxiv.org/abs/2310.11454"
---

# VeRA (Vector-based Random Matrix Adaptation)

VeRA fixes one random A/B pair (shared everywhere) and learns only small per-layer scaling vectors, slashing trainable parameters (and checkpoint size) by roughly 10× versus LoRA at comparable quality. Useful when serving many task adapters cheaply. Supported in HuggingFace PEFT.

## When to use

Extreme parameter/storage efficiency across many tasks, especially on large frozen models.

## References

- [VeRA](https://arxiv.org/abs/2310.11454)
