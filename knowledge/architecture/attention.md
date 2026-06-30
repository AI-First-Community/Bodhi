---
type: "Architecture Component"
title: "Attention"
description: "Each token gathers information from others via weighted averaging of value vectors."
cluster: "architecture"
level: 2
tags:
  - "architecture"
  - "core-mechanics"
when_to_use: "Understanding which weight matrices (q_proj, k_proj, v_proj) LoRA typically targets."
relations:
  - "is-a:self-attention"
references:
  - "The Illustrated Transformer|https://jalammar.github.io/illustrated-transformer/"
resource: "https://jalammar.github.io/illustrated-transformer/"
---

# Attention

softmax(QKᵀ/√d)·V. Queries ask, Keys advertise, Values carry content. The QKᵀ matrix is where "which tokens matter to which" is computed — the source of in-context learning.

## Example

```python
A = softmax(Q @ K.transpose(-2,-1) / sqrt(d_k))
out = A @ V
```

## When to use

Understanding which weight matrices (q_proj, k_proj, v_proj) LoRA typically targets.

## Related concepts

- is a type of → [Self-Attention](/architecture/self-attention.md)

## References

- [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)
