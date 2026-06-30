---
type: "Practice"
title: "Preference Data Collection"
description: "Gathering the chosen/rejected comparisons that drive RLHF/DPO — by humans (pairwise/ranked) or by AI (RLAIF/constitutional)."
cluster: "dataeval"
level: 3
tags:
  - "dataeval"
when_to_use: "Before any RLHF/DPO/KTO run — this data, not the algorithm, usually determines the ceiling."
relations:
  - "requires:dataset-prep"
  - "combines:reward-model"
  - "combines:dpo"
references:
  - "InstructGPT (preference pipeline)|https://arxiv.org/abs/2203.02155"
resource: "https://arxiv.org/abs/2203.02155"
---

# Preference Data Collection

Alignment quality is capped by preference-data quality. Methods: pairwise comparisons, ranked lists, and rating scales from human annotators; or AI-generated preferences (RLAIF) guided by a constitution. Concerns: annotator agreement, coverage, and reward-model evaluation (RewardBench) of the resulting signal.

## When to use

Before any RLHF/DPO/KTO run — this data, not the algorithm, usually determines the ceiling.

## References

- [InstructGPT (preference pipeline)](https://arxiv.org/abs/2203.02155)
