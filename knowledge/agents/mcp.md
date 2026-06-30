---
type: "Agent / Retrieval Method"
title: "Model Context Protocol (MCP)"
description: "An open standard (\"USB-C for AI\") for connecting LLM agents to tools and data via a JSON-RPC client/server interface — now the de-facto tool-interop layer."
cluster: "agents"
level: 3
tags:
  - "agents"
when_to_use: "Building agents that must connect to many tools/data sources in a portable, standard way."
relations:
  - "builds-on:react"
  - "combines:rag"
references:
  - "Model Context Protocol (Anthropic)|https://www.anthropic.com/news/model-context-protocol"
resource: "https://www.anthropic.com/news/model-context-protocol"
---

# Model Context Protocol (MCP)

Introduced by Anthropic (Nov 2024); each tool publishes a machine-readable description so agents discover and invoke it without bespoke integrations. Adopted by OpenAI, Google, and Microsoft through 2025 and donated to the Linux Foundation's Agentic AI Foundation (Dec 2025). Complemented by agent-to-agent protocols like A2A.

## When to use

Building agents that must connect to many tools/data sources in a portable, standard way.

## References

- [Model Context Protocol (Anthropic)](https://www.anthropic.com/news/model-context-protocol)
