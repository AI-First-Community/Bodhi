---
type: "Architecture Component"
title: "Transformer"
description: "The backbone architecture: stacked blocks of attention + feed-forward, connected by residuals."
cluster: "architecture"
level: 2
tags:
  - "architecture"
  - "core-mechanics"
when_to_use: "The structure every modern LLM shares; fine-tuning targets its weight matrices."
relations:
  - "builds-on:attention"
  - "requires:positional-encoding"
  - "builds-on:ffn"
  - "requires:pretraining"
  - "is-a:decoder-gpt"
  - "is-a:encoder-bert"
  - "is-a:enc-dec-t5"
  - "combines:flash-attention"
  - "builds-on:moe"
references:
  - "Attention Is All You Need|https://arxiv.org/abs/1706.03762"
resource: "https://arxiv.org/abs/1706.03762"
---

# Transformer

"Attention Is All You Need" (2017). A block = (norm → Multi-Head Attention → residual) then (norm → FFN → residual). The **residual** (skip) connections are what let very deep stacks train stably; modern decoders use **pre-norm with RMSNorm** (not the original post-LayerNorm) and a SwiGLU FFN. Stack N blocks. Parallelizable over sequence (unlike RNNs), which is what made large-scale pretraining feasible.

## When to use

The structure every modern LLM shares; fine-tuning targets its weight matrices.

## Related concepts

- builds on → [Attention](/architecture/attention.md)
- requires → [Positional Encoding](/architecture/positional-encoding.md)
- builds on → [Feed-Forward / MLP](/architecture/ffn.md)
- requires → [Pretraining](/foundations/pretraining.md)
- is a type of → [Decoder-only (GPT)](/modeltypes/decoder-gpt.md)
- is a type of → [Encoder-only (BERT)](/modeltypes/encoder-bert.md)
- is a type of → [Encoder-Decoder (T5)](/modeltypes/enc-dec-t5.md)
- combines with → [FlashAttention](/efficiency/flash-attention.md)
- builds on → [Mixture of Experts (MoE)](/architecture/moe.md)

## References

- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
