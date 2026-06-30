---
type: "Architecture Component"
title: "Self-Attention"
description: "Attention where Q, K, V all come from the same sequence — tokens attend to each other."
cluster: "architecture"
level: 2
tags:
  - "architecture"
  - "core-mechanics"
when_to_use: "Explains why decoders generate left-to-right and encoders see the whole sequence."
relations:
  - "builds-on:multi-head"
  - "requires:decoder-gpt"
---

# Self-Attention

In decoders it is *causal* (masked): token t can only attend to ≤ t, enforcing autoregression. This mask is the difference between GPT-style and BERT-style attention.

## When to use

Explains why decoders generate left-to-right and encoders see the whole sequence.

## Related concepts

- builds on → [Multi-Head Attention](/architecture/multi-head.md)
- requires → [Decoder-only (GPT)](/modeltypes/decoder-gpt.md)
