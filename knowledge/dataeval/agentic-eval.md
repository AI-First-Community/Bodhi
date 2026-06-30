---
type: "Practice"
title: "Agentic & Contamination-Resistant Eval"
description: "Modern evaluation: agent task benchmarks (SWE-bench Verified, GAIA, τ-bench, WebArena) and contamination-limited, frequently-refreshed suites (LiveBench, ARC-AGI-2)."
cluster: "dataeval"
level: 3
tags:
  - "dataeval"
when_to_use: "Choosing benchmarks in 2026 — prefer agentic and contamination-resistant signals over saturated classics."
relations:
  - "improves-on:benchmarks"
  - "combines:rlvr"
references:
  - "SWE-bench Verified (OpenAI)|https://openai.com/index/introducing-swe-bench-verified/"
  - "LiveBench|https://arxiv.org/abs/2406.19314"
resource: "https://openai.com/index/introducing-swe-bench-verified/"
---

# Agentic & Contamination-Resistant Eval

As MMLU/GSM8K saturated and contamination grew, eval shifted to (1) verifiable agent tasks — resolving real GitHub issues (SWE-bench Verified), tool-use QA (GAIA), tool-agent-user dialogue (τ-bench); and (2) fresh, objectively-scored sets that resist leakage (LiveBench monthly, ARC-AGI-2, FrontierMath, GPQA-Diamond, Humanity's Last Exam).

## When to use

Choosing benchmarks in 2026 — prefer agentic and contamination-resistant signals over saturated classics.

## References

- [SWE-bench Verified (OpenAI)](https://openai.com/index/introducing-swe-bench-verified/)
- [LiveBench](https://arxiv.org/abs/2406.19314)
