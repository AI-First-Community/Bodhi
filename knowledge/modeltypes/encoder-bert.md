---
type: "Model Archetype"
title: "Encoder-only (BERT)"
description: "Bidirectional, trained with masked language modeling. Best for understanding, not generation."
cluster: "modeltypes"
level: 2
tags:
  - "modeltypes"
  - "core-mechanics"
when_to_use: "Classification, retrieval embeddings, token tagging — not text generation."
references:
  - "BERT|https://arxiv.org/abs/1810.04805"
resource: "https://arxiv.org/abs/1810.04805"
---

# Encoder-only (BERT)

Sees the full sequence at once. Fine-tuned with a task head for classification, NER, embeddings (sentence-transformers). Cheaper than decoders for discriminative tasks.

## When to use

Classification, retrieval embeddings, token tagging — not text generation.

## References

- [BERT](https://arxiv.org/abs/1810.04805)
