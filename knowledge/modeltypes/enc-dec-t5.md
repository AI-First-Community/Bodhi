---
type: "Model Archetype"
title: "Encoder-Decoder (T5)"
description: "Encoder reads input, decoder generates output. Natural fit for seq-to-seq."
cluster: "modeltypes"
level: 2
tags:
  - "modeltypes"
  - "core-mechanics"
when_to_use: "Structured input→output transforms (translation, summarization) with abundant paired data."
---

# Encoder-Decoder (T5)

T5, BART, FLAN-T5. Framed as text-to-text. Strong for translation, summarization. Largely superseded by decoder-only for general chat, but still competitive when fine-tuned for fixed transformations.

## When to use

Structured input→output transforms (translation, summarization) with abundant paired data.
