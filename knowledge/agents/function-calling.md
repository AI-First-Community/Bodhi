---
type: "Agent / Retrieval Method"
title: "Function / Tool Calling"
description: "Models emit schema-constrained calls (a tool name + JSON arguments) that a runtime executes and feeds back — the substrate beneath tool-using agents."
cluster: "agents"
level: 3
added: "0.4.0"
tags:
  - "agents"
when_to_use: "Whenever the model must take actions or fetch data through code — calling APIs, querying databases, running tools — with reliable, parseable arguments instead of free text."
relations:
  - "combines:react"
  - "combines:mcp"
references:
  - "Toolformer|https://arxiv.org/abs/2302.04761"
  - "Gorilla (API-calling LLMs)|https://arxiv.org/abs/2305.15334"
resource: "https://arxiv.org/abs/2302.04761"
---

# Function / Tool Calling

Function (or tool) calling turns a free-form model into one that can *act*. Given a set of tool **schemas**, the model outputs a structured call — a tool name plus JSON arguments validated against the schema — rather than prose. The runtime executes the tool and returns the result, which the model consumes to decide the next step. **Constrained/structured decoding** (JSON mode, grammars, regex) guarantees the output is parseable, so the loop doesn't break on malformed text. This is the mechanism the [ReAct](/adaptation/react.md) reason-act loop and agent frameworks are built on, and protocols like [MCP](/agents/mcp.md) standardize how tools are described and invoked across hosts.

## Example
```python
tools = [{
  "name": "get_weather",
  "description": "Current weather for a city",
  "parameters": {"type": "object",
    "properties": {"city": {"type": "string"}}, "required": ["city"]},
}]
# model returns a structured call instead of prose:
# {"tool": "get_weather", "arguments": {"city": "Tokyo"}}
result = run_tool(call["tool"], **call["arguments"])   # runtime executes
# feed `result` back into the conversation for the next turn
```

## When to use

Whenever the model must take actions or fetch data through code — calling APIs, querying databases, running tools — with reliable, parseable arguments instead of free text.

## References

- [Toolformer](https://arxiv.org/abs/2302.04761)
- [Gorilla (API-calling LLMs)](https://arxiv.org/abs/2305.15334)
