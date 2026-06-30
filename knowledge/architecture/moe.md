---
type: "Architecture Component"
title: "Mixture of Experts (MoE)"
description: "Replace the dense FFN with many expert MLPs; a router activates only a few per token."
cluster: "architecture"
level: 2
tags:
  - "architecture"
  - "core-mechanics"
when_to_use: "Scale model capacity without proportional inference cost. Relevant when fine-tuning Mixtral/DeepSeek-MoE/Qwen-MoE."
references:
  - "Mixtral / Sparse MoE|https://arxiv.org/abs/2401.04088"
  - "DeepSeekMoE|https://arxiv.org/abs/2401.06066"
resource: "https://arxiv.org/abs/2401.04088"
---

# Mixture of Experts (MoE)

Sparsely-activated — e.g. 8 experts, top-2 routed (Mixtral), so total params are large but compute per token stays low. Decouples capacity from cost. The 2024–2026 standard recipe (DeepSeekMoE, Qwen3-MoE) adds fine-grained expert segmentation, shared always-on experts, and auxiliary-loss-free load balancing (a per-expert routing bias) to maximize specialization. Fine-tuning MoE is trickier (router load balancing, expert imbalance); PEFT can target experts or just attention.

## When to use

Scale model capacity without proportional inference cost. Relevant when fine-tuning Mixtral/DeepSeek-MoE/Qwen-MoE.

## References

- [Mixtral / Sparse MoE](https://arxiv.org/abs/2401.04088)
