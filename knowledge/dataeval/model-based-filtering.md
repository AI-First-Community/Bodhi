---
type: "Practice"
title: "Model-Based Data Filtering"
description: "Use a trained classifier (fastText or LLM-distilled) to score and select pretraining documents by quality — the dominant lever for data quality."
cluster: "dataeval"
level: 3
tags:
  - "dataeval"
when_to_use: "Curating any large pretraining or domain corpus — spend effort here before scaling tokens."
relations:
  - "improves-on:dataset-prep"
  - "combines:synthetic-data"
references:
  - "FineWeb / FineWeb-Edu|https://arxiv.org/abs/2406.17557"
  - "DataComp-LM|https://arxiv.org/abs/2406.11794"
resource: "https://arxiv.org/abs/2406.17557"
---

# Model-Based Data Filtering

Replaces heuristic/perplexity-only cleaning. FineWeb-Edu scores "educational quality" to match performance on ~10× fewer tokens; DataComp-LM (DCLM) standardized model-based filtering as a benchmark. Paired with dedup (MinHash/LSH, SemDeDup) and synthetic rephrasing (WRAP, Nemotron-CC).

## When to use

Curating any large pretraining or domain corpus — spend effort here before scaling tokens.

## References

- [FineWeb / FineWeb-Edu](https://arxiv.org/abs/2406.17557)
- [DataComp-LM](https://arxiv.org/abs/2406.11794)
