---
type: "Practice"
title: "Evaluation"
description: "Measure what fine-tuning actually changed — accuracy, regressions, safety."
cluster: "dataeval"
level: 3
tags:
  - "dataeval"
  - "adaptation-basics"
when_to_use: "Before and after every training run; the only way to know if it helped."
relations:
  - "combines:llm-as-judge"
  - "combines:benchmarks"
---

# Evaluation

Held-out task metrics + general benchmarks (to catch forgetting) + human/LLM judgments. Four pillars: (1) a **held-out test set** (decontaminated, stratified, never trained on); (2) **regression detection** — a fixed before/after suite to catch what the fine-tune broke; (3) **task-specific metrics** — accuracy / F1 / exact-match / perplexity per domain; (4) **open-ended quality** via human or LLM-as-judge. Always keep the eval set decontaminated from training data. "Vibes" are not evaluation.

## When to use

Before and after every training run; the only way to know if it helped.

## Related concepts

- is a type of → [LLM-as-Judge](/dataeval/llm-as-judge.md)
- is a type of → [Benchmarks](/dataeval/benchmarks.md)
