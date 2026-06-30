---
type: "Architecture Component"
title: "Positional Encoding"
description: "Injects order information, since attention is otherwise permutation-invariant."
cluster: "architecture"
level: 2
tags:
  - "architecture"
  - "core-mechanics"
when_to_use: "Key to understanding context-window extension."
relations:
  - "requires:context-window"
references:
  - "RoPE|https://arxiv.org/abs/2104.09864"
resource: "https://arxiv.org/abs/2104.09864"
---

# Positional Encoding

Sinusoidal (original) → learned → RoPE (rotary, used in Llama/Mistral) → ALiBi. RoPE scaling (NTK, YaRN) is how short-context models get extended to long context.

## When to use

Key to understanding context-window extension.

## Related concepts

- requires → [Context Window](/foundations/context-window.md)

## References

- [RoPE](https://arxiv.org/abs/2104.09864)
