---
type: "Multimodal / Vision"
title: "Vision-Language Models (VLMs)"
description: "Give an LLM eyes: connect a vision encoder to a language model and instruction-tune it, so the model can reason over images and text together."
cluster: "multimodal"
level: 4
added: "0.5.0"
tags:
  - "multimodal"
when_to_use: "Any task mixing images and language — visual question answering, document/chart understanding, captioning, or GUI/agent perception."
relations:
  - "builds-on:clip"
  - "combines:decoder-gpt"
  - "builds-on:instruction-tuning"
references:
  - "LLaVA — Visual Instruction Tuning|https://arxiv.org/abs/2304.08485"
  - "GPT-4V(ision) System Card|https://openai.com/index/gpt-4v-system-card/"
resource: "https://arxiv.org/abs/2304.08485"
---

# Vision-Language Models (VLMs)

A vision-language model (multimodal LLM) pairs a pretrained **vision encoder** (usually CLIP-ViT) with a pretrained **LLM**. A *connector* — a simple MLP projection (LLaVA) or gated cross-attention (Flamingo) — maps image features into the LLM's token space, and the model is fine-tuned on image–instruction data (**visual instruction tuning**). This reuses the LLM's reasoning while adding perception, so training is far cheaper than building a multimodal model from scratch. The same recipe extends to video, documents, and GUI screenshots — the perception layer behind [computer-use agents](/agents/computer-use.md).

## When to use

Any task mixing images and language — visual question answering, document/chart understanding, captioning, or GUI/agent perception.

## References

- [LLaVA — Visual Instruction Tuning](https://arxiv.org/abs/2304.08485)
- [GPT-4V(ision) System Card](https://openai.com/index/gpt-4v-system-card/)
