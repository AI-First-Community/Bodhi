---
type: "Agent / Retrieval Method"
title: "Agent Memory"
description: "Persistent long-term memory layers that page facts/preferences in and out of context across sessions — beyond stuffing full history into the window."
cluster: "agents"
level: 3
tags:
  - "agents"
when_to_use: "Long-running or multi-session agents that must remember user facts, decisions, and history."
relations:
  - "combines:rag"
  - "requires:context-window"
references:
  - "Mem0|https://arxiv.org/abs/2504.19413"
resource: "https://arxiv.org/abs/2504.19413"
---

# Agent Memory

Systems like MemGPT/Letta (OS-style tiered core/recall/archival memory via tool calls), Mem0 (vector+graph memory service), and Zep/Graphiti (bi-temporal knowledge-graph memory) give agents durable state. The standard "four memory types" framing: working, episodic, semantic, procedural — with a latency/cost gradient: working memory is in-context (~ms), semantic is an embedding lookup (10s–100s ms), and episodic/archival is timestamped storage (higher latency, more storage). Graphiti's bi-temporal graph also tracks *when* a fact was true vs. ingested, which flat vector memory can't.

## When to use

Long-running or multi-session agents that must remember user facts, decisions, and history.

## References

- [Mem0](https://arxiv.org/abs/2504.19413)
