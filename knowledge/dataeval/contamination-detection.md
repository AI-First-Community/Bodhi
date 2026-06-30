---
type: "Practice"
title: "Benchmark Contamination Detection"
description: "Detecting train/test leakage (string, n-gram, or embedding overlap; membership-inference) and decontaminating — a first-class honesty concern in 2026 eval."
cluster: "dataeval"
level: 3
tags:
  - "dataeval"
when_to_use: "Whenever you trust a benchmark number — verify it is not contaminated."
relations:
  - "improves-on:benchmarks"
  - "combines:dataset-prep"
references:
  - "LiveBench (contamination-limited)|https://arxiv.org/abs/2406.19314"
resource: "https://arxiv.org/abs/2406.19314"
---

# Benchmark Contamination Detection

As benchmarks leak into pretraining corpora, scores inflate. Detection ranges from exact/n-gram and embedding overlap to membership-inference probes; remediation means decontaminating training data and preferring fresh, contamination-limited benchmarks (LiveBench, time-windowed sets). Always report decontamination methodology.

## When to use

Whenever you trust a benchmark number — verify it is not contaminated.

## References

- [LiveBench (contamination-limited)](https://arxiv.org/abs/2406.19314)
