---
type: "Agent / Retrieval Method"
title: "GraphRAG"
description: "Build an LLM-extracted entity/relationship knowledge graph plus community summaries to answer global, multi-hop \"sense-making\" queries vector RAG misses."
cluster: "agents"
level: 3
tags:
  - "agents"
when_to_use: "Global or multi-hop questions (\"what are the themes across this corpus?\") that flat vector RAG answers poorly."
relations:
  - "improves-on:rag"
  - "combines:embedding"
references:
  - "Microsoft GraphRAG|https://www.microsoft.com/en-us/research/project/graphrag/"
resource: "https://www.microsoft.com/en-us/research/project/graphrag/"
---

# GraphRAG

Pipeline: (1) LLM extracts entities & relationships from chunks; (2) build a graph with entity-resolution/dedup; (3) detect communities (e.g. Leiden clustering); (4) LLM writes community summaries — so the agent can traverse relationships and answer global "what are the themes?" questions rather than only matching nearby chunks. The catch is indexing cost; Microsoft's LazyGraphRAG slashes it by orders of magnitude.

## When to use

Global or multi-hop questions ("what are the themes across this corpus?") that flat vector RAG answers poorly.

## References

- [Microsoft GraphRAG](https://www.microsoft.com/en-us/research/project/graphrag/)
