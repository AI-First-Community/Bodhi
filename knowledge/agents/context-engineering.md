---
type: "Agent / Retrieval Method"
title: "Context Engineering"
description: "The discipline of assembling the right tokens — instructions, memory, retrieved facts, tool results — into the window for each step. \"Prompt engineering\" is now a subset."
cluster: "agents"
level: 3
tags:
  - "agents"
when_to_use: "Designing any non-trivial agent/RAG system — the whole context, not just the prompt wording, is what you optimize."
relations:
  - "builds-on:prompting"
  - "combines:rag"
references:
  - "Effective Context Engineering (Anthropic)|https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents"
resource: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents"
---

# Context Engineering

Popularized by Lütke and Karpathy (June 2025) and codified by Anthropic, this reframes prompting as a systems problem: dynamically curate and compact context (RAG, memory, tool outputs) to combat context rot and stay within effective length. Core techniques: prefix/KV caching of stable context; compaction (summarize-then-detail, drop low-relevance spans); sparse top-k retrieval instead of stuffing; goal-oriented selection and time-decay weighting of memory. Central to agent and RAG design in 2026.

## When to use

Designing any non-trivial agent/RAG system — the whole context, not just the prompt wording, is what you optimize.

## References

- [Effective Context Engineering (Anthropic)](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
