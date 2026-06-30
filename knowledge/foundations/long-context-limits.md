---
type: "Concept"
title: "Long-Context Limitations"
description: "A model's *effective* context is far below its advertised window — recall degrades long before the window fills."
cluster: "foundations"
level: 2
tags:
  - "foundations"
when_to_use: "Always factor this in when choosing long-context prompting vs. RAG; do not trust the advertised window."
relations:
  - "requires:context-window"
  - "alternative:rag"
references:
  - "RULER|https://arxiv.org/abs/2404.06654"
  - "Lost in the Middle|https://arxiv.org/abs/2307.03172"
resource: "https://arxiv.org/abs/2404.06654"
---

# Long-Context Limitations

"Lost in the middle" (U-shaped positional bias) and "context rot" (non-uniform degradation as input grows, even with perfect retrieval) mean a 1M-token window rarely means 1M tokens of reliable recall. Benchmarks like RULER and NoLiMa measure the real, much smaller, effective length. This is why RAG and context engineering stay relevant despite huge windows.

## When to use

Always factor this in when choosing long-context prompting vs. RAG; do not trust the advertised window.

## References

- [RULER](https://arxiv.org/abs/2404.06654)
- [Lost in the Middle](https://arxiv.org/abs/2307.03172)
