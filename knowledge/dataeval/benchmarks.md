---
type: "Practice"
title: "Benchmarks"
description: "Standardized tests (MMLU, GSM8K, HumanEval, IFEval) for comparable capability signals."
cluster: "dataeval"
level: 3
tags:
  - "dataeval"
  - "adaptation-basics"
when_to_use: "Track general capability and detect catastrophic forgetting after fine-tuning."
---

# Benchmarks

Useful for regression detection and capability tracking, but prone to contamination and overfitting. Pick by family: reasoning/knowledge (MMLU → GPQA-Diamond; GSM8K → AIME / FrontierMath), code (HumanEval → SWE-bench Verified), tool-use/agentic (GAIA, τ-bench), multimodal (MMBench / MMMU) — each with its own saturation level and contamination risk. The classics (MMLU, GSM8K, HumanEval) are largely saturated by 2026 frontier models; current signals come from harder, contamination-resistant, and agentic suites — see Agentic & Contamination-Resistant Eval. Necessary, not sufficient — pair with task-specific and human eval.

## When to use

Track general capability and detect catastrophic forgetting after fine-tuning.
