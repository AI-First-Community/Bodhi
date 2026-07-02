---
type: "Multimodal / Vision"
title: "Diffusion Models (Image Generation)"
description: "Generate images by learning to reverse a gradual noising process — the approach behind modern text-to-image models, conditioned on a text embedding."
cluster: "multimodal"
level: 3
added: "0.5.0"
tags:
  - "multimodal"
when_to_use: "Generating images (and increasingly audio/video) from text or other conditioning — a different generative paradigm from autoregressive LLMs."
relations:
  - "combines:clip"
  - "alternative:decoder-gpt"
references:
  - "DDPM — Denoising Diffusion Probabilistic Models|https://arxiv.org/abs/2006.11239"
  - "Latent Diffusion (Stable Diffusion)|https://arxiv.org/abs/2112.10752"
resource: "https://arxiv.org/abs/2112.10752"
---

# Diffusion Models (Image Generation)

Diffusion models learn to invert a **forward process** that gradually adds Gaussian noise to data: a network is trained to *denoise*, and generation runs the denoiser step-by-step from pure noise to a clean sample. **Latent Diffusion** (Stable Diffusion) does this in a compressed latent space for efficiency, conditioned on a text embedding (often [CLIP](/multimodal/clip.md)'s) injected via cross-attention. Unlike an autoregressive decoder that emits tokens left-to-right, diffusion **refines the whole output iteratively** — the dominant approach for high-quality image, and increasingly video and audio, generation.

## When to use

Generating images (and increasingly audio/video) from text or other conditioning — a different generative paradigm from autoregressive LLMs.

## References

- [DDPM — Denoising Diffusion Probabilistic Models](https://arxiv.org/abs/2006.11239)
- [Latent Diffusion (Stable Diffusion)](https://arxiv.org/abs/2112.10752)
