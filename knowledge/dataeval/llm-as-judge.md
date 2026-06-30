---
type: "Practice"
title: "LLM-as-Judge"
description: "Use a strong model to score/compare outputs — scalable proxy for human eval."
cluster: "dataeval"
level: 3
tags:
  - "dataeval"
  - "adaptation-basics"
when_to_use: "Fast, cheap eval of open-ended generation when human eval does not scale."
references:
  - "MT-Bench / Judge|https://arxiv.org/abs/2306.05685"
resource: "https://arxiv.org/abs/2306.05685"
---

# LLM-as-Judge

Pairwise or rubric scoring (MT-Bench, AlpacaEval). Advances: rubric/chain-of-thought scoring (G-Eval) and panels of diverse judges (PoLL) instead of one judge. Watch known biases: position, verbosity, self-preference, and "preference leakage" (a judge favoring models trained on its own outputs) — mitigate with position-swapping and calibration against a human-labeled subset. Where ground truth is checkable, prefer verifiable benchmarks (LiveBench, RLVR-style) over a judge.

## When to use

Fast, cheap eval of open-ended generation when human eval does not scale.

## References

- [MT-Bench / Judge](https://arxiv.org/abs/2306.05685)
