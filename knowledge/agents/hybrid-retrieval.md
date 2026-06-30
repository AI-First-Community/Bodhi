---
type: "Agent / Retrieval Method"
title: "Hybrid Retrieval"
description: "Combine dense (embedding) and lexical (BM25) retrieval — and sometimes structured queries — via fusion (RRF) for better recall and precision."
cluster: "agents"
level: 3
tags:
  - "agents"
when_to_use: "Almost any production RAG system — hybrid + rerank is the reliable default."
relations:
  - "improves-on:rag"
  - "combines:retrieval-reranking"
  - "combines:embedding"
references:
  - "Contextual Retrieval (Anthropic)|https://www.anthropic.com/news/contextual-retrieval"
resource: "https://www.anthropic.com/news/contextual-retrieval"
---

# Hybrid Retrieval

Dense retrieval captures semantics but misses exact terms/rare tokens; BM25 nails lexical matches but not paraphrase. Hybrid retrieval runs both and fuses results (Reciprocal Rank Fusion or learned routing), often followed by a reranker. Production-standard for robust RAG; Anthropic's Contextual Retrieval is a strong recipe.

## When to use

Almost any production RAG system — hybrid + rerank is the reliable default.

## References

- [Contextual Retrieval (Anthropic)](https://www.anthropic.com/news/contextual-retrieval)
