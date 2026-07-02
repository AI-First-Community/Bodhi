---
type: "Multimodal / Vision"
title: "Vision Transformer (ViT)"
description: "Treat an image as a sequence of patches ('tokens') and run a standard Transformer over them — bringing self-attention to vision, no convolutions."
cluster: "multimodal"
level: 2
added: "0.5.0"
tags:
  - "multimodal"
when_to_use: "The default image encoder for modern vision and vision-language models — especially with large-scale pretraining data."
relations:
  - "builds-on:transformer"
  - "combines:embedding"
references:
  - "ViT — An Image is Worth 16x16 Words|https://arxiv.org/abs/2010.11929"
resource: "https://arxiv.org/abs/2010.11929"
---

# Vision Transformer (ViT)

A Vision Transformer splits an image into fixed-size patches (e.g. 16×16), linearly embeds each patch, adds positional embeddings, and feeds the resulting sequence to a **standard Transformer encoder** — no convolutions. Given enough pretraining data it matches or beats CNNs, and because it is "just a Transformer" it inherits the whole ecosystem: self-attention, favorable scaling, and transfer learning. ViT is the vision backbone behind most multimodal models — it's the image encoder inside CLIP and the eyes of most vision-language models.

## When to use

The default image encoder for modern vision and vision-language models — especially with large-scale pretraining data.

## References

- [ViT — An Image is Worth 16x16 Words](https://arxiv.org/abs/2010.11929)
