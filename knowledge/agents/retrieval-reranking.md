---
type: "Agent / Retrieval Method"
title: "Retrieval Reranking"
description: "A second stage that re-scores first-stage retrieval candidates for relevance — cross-encoders, ColBERT late interaction, or LLM listwise rerankers."
cluster: "agents"
level: 3
tags:
  - "agents"
when_to_use: "Almost always worth adding to a RAG pipeline to lift answer grounding quality."
relations:
  - "improves-on:rag"
  - "combines:embedding"
references:
  - "ColBERT|https://arxiv.org/abs/2004.12832"
resource: "https://arxiv.org/abs/2004.12832"
---

# Retrieval Reranking

First-stage dense/BM25 retrieval favors recall; a reranker (joint query-document cross-encoder, or token-level late-interaction like ColBERT/ColPali) restores precision, typically +5–15 nDCG. Standard in production RAG and a cheap accuracy lever.

## When to use

Almost always worth adding to a RAG pipeline to lift answer grounding quality.

## References

- [ColBERT](https://arxiv.org/abs/2004.12832)
