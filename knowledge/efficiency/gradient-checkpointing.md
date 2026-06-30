---
type: "Efficiency Technique"
title: "Gradient Checkpointing"
description: "Trade compute for memory: recompute activations in the backward pass instead of storing them."
cluster: "efficiency"
level: 4
tags:
  - "efficiency"
  - "fine-tuning-techniques"
when_to_use: "You hit OOM on activations during fine-tuning."
---

# Gradient Checkpointing

Cuts activation memory dramatically (~√n), enabling larger batches/sequences/models at ~20–30% more compute. Standard in QLoRA recipes.

## Example

```python
model.gradient_checkpointing_enable()
```

## When to use

You hit OOM on activations during fine-tuning.
