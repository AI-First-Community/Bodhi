---
type: "Agent / Retrieval Method"
title: "Agentic RAG"
description: "RAG where an agent decides when, what, and how to retrieve — with planning, reflection, multi-hop, and tool use — instead of a fixed retrieve-then-read pipeline."
cluster: "agents"
level: 3
tags:
  - "agents"
when_to_use: "Complex, multi-step questions where one retrieval pass is not enough."
relations:
  - "improves-on:rag"
  - "combines:react"
references:
  - "Agentic RAG: A Survey|https://arxiv.org/abs/2501.09136"
resource: "https://arxiv.org/abs/2501.09136"
---

# Agentic RAG

Replaces single-shot retrieval with an agent loop that can reformulate queries, retrieve iteratively, verify, and combine sources — e.g. decompose a multi-part question into sub-questions, retrieve and check evidence for each, then synthesize. Self-RAG adds reflection tokens so the model decides *when* to retrieve and critiques what it got. Often trained with RL (e.g. Search-R1). The backbone of deep-research agents.

## When to use

Complex, multi-step questions where one retrieval pass is not enough.

## References

- [Agentic RAG: A Survey](https://arxiv.org/abs/2501.09136)
