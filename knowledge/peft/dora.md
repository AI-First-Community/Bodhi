---
type: "PEFT Method"
title: "DoRA"
description: "Weight-Decomposed LoRA: split W into magnitude + direction, LoRA-adapt the direction."
cluster: "peft"
level: 4
tags:
  - "peft"
  - "fine-tuning-techniques"
when_to_use: "You want a bit more quality than LoRA at low rank and can afford slightly more training cost."
references:
  - "DoRA|https://arxiv.org/abs/2402.09353"
resource: "https://arxiv.org/abs/2402.09353"
---

# DoRA

Decomposes pretrained weights into magnitude and directional components; applies low-rank updates to direction while learning magnitude separately. Closes much of the remaining gap to full-FT, especially at low rank. ~Same inference cost as LoRA after merge.

## Example

```python
LoraConfig(r=16, use_dora=True, target_modules=[...])
```

## When to use

You want a bit more quality than LoRA at low rank and can afford slightly more training cost.

## References

- [DoRA](https://arxiv.org/abs/2402.09353)
