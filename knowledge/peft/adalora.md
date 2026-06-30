---
type: "PEFT Method"
title: "AdaLoRA"
description: "Adaptively allocate the rank budget across layers via SVD — important layers get more rank."
cluster: "peft"
level: 4
tags:
  - "peft"
  - "fine-tuning-techniques"
when_to_use: "Fixed small budget and you want it spent optimally across layers."
references:
  - "AdaLoRA|https://arxiv.org/abs/2303.10512"
resource: "https://arxiv.org/abs/2303.10512"
---

# AdaLoRA

Prunes singular values during training so the parameter budget concentrates where it helps most, rather than a uniform rank everywhere.

## When to use

Fixed small budget and you want it spent optimally across layers.

## References

- [AdaLoRA](https://arxiv.org/abs/2303.10512)
