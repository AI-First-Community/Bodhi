---
type: "Reasoning Method"
title: "Tree-of-Thought (Search-Based Reasoning)"
description: "Explore multiple reasoning branches with explicit search (BFS/DFS) and state evaluation, instead of one linear chain."
cluster: "reasoning"
level: 5
tags:
  - "reasoning"
when_to_use: "Hard search/planning problems where a single chain of thought is insufficient."
relations:
  - "builds-on:cot"
  - "alternative:self-consistency"
  - "combines:test-time-compute"
references:
  - "Tree of Thoughts (Yao et al)|https://arxiv.org/abs/2305.10601"
resource: "https://arxiv.org/abs/2305.10601"
---

# Tree-of-Thought (Search-Based Reasoning)

Tree-of-Thought frames problem solving as search over a tree of partial "thoughts," expanding promising branches and pruning dead ends with a value/heuristic. More powerful than single-chain CoT on planning and puzzles, at higher inference cost — a structured form of test-time compute.

## When to use

Hard search/planning problems where a single chain of thought is insufficient.

## References

- [Tree of Thoughts (Yao et al)](https://arxiv.org/abs/2305.10601)
