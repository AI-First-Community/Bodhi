---
type: "Multimodal / Vision"
title: "CLIP (Contrastive Language–Image Pretraining)"
description: "Train an image encoder and a text encoder together with a contrastive loss so matching image–text pairs align in a shared embedding space — enabling zero-shot classification."
cluster: "multimodal"
level: 3
added: "0.5.0"
tags:
  - "multimodal"
when_to_use: "Zero-shot image classification / retrieval, or as the vision encoder + image–text alignment layer inside a larger multimodal model or image generator."
relations:
  - "combines:vit"
  - "builds-on:embedding"
references:
  - "CLIP — Learning Transferable Visual Models From Natural Language Supervision|https://arxiv.org/abs/2103.00020"
resource: "https://arxiv.org/abs/2103.00020"
---

# CLIP (Contrastive Language–Image Pretraining)

CLIP trains two encoders — a ViT (or ResNet) for images and a Transformer for text — on ~400M image–text pairs with a **contrastive objective**: pull matching image–text pairs together and push mismatched pairs apart in a shared embedding space. The result generalizes **zero-shot**: you classify an image by comparing its embedding to text prompts like *"a photo of a {label}"*, with no task-specific training. CLIP embeddings underpin much of multimodal AI — they are the vision front-end of many [vision-language models](/multimodal/vlm.md) and the text-conditioning signal for [diffusion](/multimodal/diffusion.md) image generators.

## When to use

Zero-shot image classification / retrieval, or as the vision encoder + image–text alignment layer inside a larger multimodal model or image generator.

## References

- [CLIP — Learning Transferable Visual Models From Natural Language Supervision](https://arxiv.org/abs/2103.00020)
