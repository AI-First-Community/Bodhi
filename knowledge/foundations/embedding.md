---
type: "Concept"
title: "Embeddings"
description: "Each token ID maps to a learned dense vector; semantically similar tokens land near each other."
cluster: "foundations"
level: 1
tags:
  - "foundations"
  - "foundations"
when_to_use: "Foundational for understanding RAG retrieval, similarity search, and what \"representation\" means."
relations:
  - "requires:transformer"
references:
  - "word2vec|https://arxiv.org/abs/1301.3781"
resource: "https://arxiv.org/abs/1301.3781"
---

# Embeddings

The embedding matrix (vocab × d_model) is the first learned layer. Vectors encode meaning geometrically — "king" − "man" + "woman" ≈ "queen". Output logits are typically the transpose of this matrix (weight tying).

## Example

```python
# d_model=4096 for Llama-3-8B; embedding matrix ~ 128256 x 4096
```

## When to use

Foundational for understanding RAG retrieval, similarity search, and what "representation" means.

## Related concepts

- requires → [Transformer](/architecture/transformer.md)

## References

- [word2vec](https://arxiv.org/abs/1301.3781)
