---
type: "PEFT Method"
title: "PiSSA (Principal Singular-Value Init)"
description: "Initialize the LoRA A/B matrices from the principal singular vectors of W (via SVD) and freeze the residual — much faster convergence than random init."
cluster: "peft"
level: 4
tags:
  - "peft"
when_to_use: "Drop-in LoRA upgrade when you want faster, higher convergence at no inference cost."
relations:
  - "improves-on:lora"
references:
  - "PiSSA|https://arxiv.org/abs/2404.02948"
resource: "https://arxiv.org/abs/2404.02948"
---

# PiSSA (Principal Singular-Value Init)

Vanilla LoRA starts adapters from noise/zero; PiSSA starts them from the dominant directions of the pretrained weight, so training begins aligned with what matters (e.g. 72.9% vs 67.7% GSM8K on Mistral-7B). First-class in HuggingFace PEFT (init_lora_weights="pissa"). Related inits: OLoRA, LoRA-GA, CorDA; LoftQ does the same for quantized bases.

## Example

```python
LoraConfig(r=16, init_lora_weights="pissa", target_modules=[...])
```

## When to use

Drop-in LoRA upgrade when you want faster, higher convergence at no inference cost.

## References

- [PiSSA](https://arxiv.org/abs/2404.02948)
