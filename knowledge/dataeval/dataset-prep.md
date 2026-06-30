---
type: "Practice"
title: "Dataset Curation"
description: "The highest-leverage step: quality, diversity, and de-duplication beat raw volume."
cluster: "dataeval"
level: 3
tags:
  - "dataeval"
  - "adaptation-basics"
when_to_use: "Before any SFT/preference run. Spend most of your effort here."
relations:
  - "is-a:synthetic-data"
  - "combines:evaluation"
references:
  - "LIMA|https://arxiv.org/abs/2305.11206"
resource: "https://arxiv.org/abs/2305.11206"
---

# Dataset Curation

"Quality is all you need" (LIMA: 1k great examples > 50k mediocre). The modern pretraining pipeline: near-duplicate removal (MinHash/LSH, then semantic SemDeDup), model-based quality filtering (FineWeb-Edu / DCLM classifiers — see Model-Based Data Filtering), decontamination against eval sets, balancing, and correct formatting. Garbage in → garbage fine-tune.

## When to use

Before any SFT/preference run. Spend most of your effort here.

## Related concepts

- is a type of → [Synthetic Data](/dataeval/synthetic-data.md)
- combines with → [Evaluation](/dataeval/evaluation.md)

## References

- [LIMA](https://arxiv.org/abs/2305.11206)
