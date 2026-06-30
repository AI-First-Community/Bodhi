---
type: "PEFT Method"
title: "P-Tuning (v2)"
description: "Soft prompts inserted at multiple layers via a small prompt encoder; strong on NLU."
cluster: "peft"
level: 4
tags:
  - "peft"
  - "fine-tuning-techniques"
when_to_use: "BERT-style understanding tasks where you want PEFT to match full-FT."
references:
  - "P-Tuning v2|https://arxiv.org/abs/2110.07602"
resource: "https://arxiv.org/abs/2110.07602"
---

# P-Tuning (v2)

v2 applies deep prompts across layers (like prefix tuning) and matches full-FT on understanding tasks across scales.

## When to use

BERT-style understanding tasks where you want PEFT to match full-FT.

## References

- [P-Tuning v2](https://arxiv.org/abs/2110.07602)
