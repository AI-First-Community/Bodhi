---
type: "PEFT Method"
title: "BitFit"
description: "Train only the bias terms — a tiny selective baseline that is surprisingly competitive."
cluster: "peft"
level: 4
tags:
  - "peft"
  - "fine-tuning-techniques"
when_to_use: "Quick baseline; ultra-low-resource adaptation."
references:
  - "BitFit|https://arxiv.org/abs/2106.10199"
resource: "https://arxiv.org/abs/2106.10199"
---

# BitFit

Updates ~0.1% of params (just biases). A useful sanity baseline and instructive about how little needs to change to adapt a model.

## When to use

Quick baseline; ultra-low-resource adaptation.

## References

- [BitFit](https://arxiv.org/abs/2106.10199)
