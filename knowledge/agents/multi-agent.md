---
type: "Agent / Retrieval Method"
title: "Multi-Agent Systems"
description: "Decompose a task across specialized LLM agents (planner, workers, critic) that coordinate via messages or an orchestrator — trading tokens for reliability on complex work."
cluster: "agents"
level: 4
added: "0.4.0"
tags:
  - "agents"
when_to_use: "Complex, multi-step tasks that benefit from division of labor, parallel exploration, or independent review — when one agent's context or reliability is the bottleneck. Mind the token cost."
relations:
  - "builds-on:react"
  - "combines:agent-memory"
references:
  - "AutoGen|https://arxiv.org/abs/2308.08155"
  - "MetaGPT|https://arxiv.org/abs/2308.00352"
resource: "https://arxiv.org/abs/2308.08155"
---

# Multi-Agent Systems

A multi-agent system splits work across several LLM agents with distinct **roles** — e.g. a *planner* that decomposes the goal, *workers* that execute sub-tasks (often in parallel), and a *critic/verifier* that reviews outputs — coordinated by message passing or a central orchestrator. The pattern buys independent perspectives and parallelism, which help with breadth, search, and adversarial checking (one agent verifies another), at the cost of more tokens and orchestration complexity. It's most worthwhile when a single agent's context window or reliability is the limiting factor; for simple tasks a single [ReAct](/adaptation/react.md) agent is cheaper and just as good. Frameworks like AutoGen and MetaGPT formalize the conversation protocols and role definitions.

## When to use

Complex, multi-step tasks that benefit from division of labor, parallel exploration, or independent review — when one agent's context or reliability is the bottleneck. Mind the token cost.

## References

- [AutoGen](https://arxiv.org/abs/2308.08155)
- [MetaGPT](https://arxiv.org/abs/2308.00352)
