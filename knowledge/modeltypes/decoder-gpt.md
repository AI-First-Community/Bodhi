---
type: "Model Archetype"
title: "Decoder-only (GPT)"
description: "Causal, autoregressive. The dominant architecture for generative LLMs."
cluster: "modeltypes"
level: 2
tags:
  - "modeltypes"
  - "core-mechanics"
when_to_use: "Default choice for any generative / chat / agent use case."
relations:
  - "requires:adaptation"
  - "combines:moe"
---

# Decoder-only (GPT)

GPT, Llama, Mistral, Claude, Gemini. Trained on next-token prediction; excels at generation, in-context learning, and chat. Almost all fine-tuning literature targets this family.

## When to use

Default choice for any generative / chat / agent use case.

## Related concepts

- requires → [Adaptation Spectrum](/adaptation/adaptation.md)
- combines with → [Mixture of Experts (MoE)](/architecture/moe.md)
