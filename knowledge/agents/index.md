# Agents & Retrieval

- [Agent Memory](./agent-memory.md) — Persistent long-term memory layers that page facts/preferences in and out of context across sessions — beyond stuffing full history into the window.
- [Agentic RAG](./agentic-rag.md) — RAG where an agent decides when, what, and how to retrieve — with planning, reflection, multi-hop, and tool use — instead of a fixed retrieve-then-read pipeline.
- [Computer-Use / GUI Agents](./computer-use.md) — Vision-language agents that operate real desktops/browsers via screenshots plus mouse/keyboard actions — general control beyond brittle RPA scripts.
- [Context Engineering](./context-engineering.md) — The discipline of assembling the right tokens — instructions, memory, retrieved facts, tool results — into the window for each step. "Prompt engineering" is now a subset.
- [GraphRAG](./graphrag.md) — Build an LLM-extracted entity/relationship knowledge graph plus community summaries to answer global, multi-hop "sense-making" queries vector RAG misses.
- [Hybrid Retrieval](./hybrid-retrieval.md) — Combine dense (embedding) and lexical (BM25) retrieval — and sometimes structured queries — via fusion (RRF) for better recall and precision.
- [Model Context Protocol (MCP)](./mcp.md) — An open standard ("USB-C for AI") for connecting LLM agents to tools and data via a JSON-RPC client/server interface — now the de-facto tool-interop layer.
- [Retrieval Reranking](./retrieval-reranking.md) — A second stage that re-scores first-stage retrieval candidates for relevance — cross-encoders, ColBERT late interaction, or LLM listwise rerankers.
