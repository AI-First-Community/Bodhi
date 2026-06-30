---
type: "PEFT Method"
title: "QLoRA"
description: "LoRA on a 4-bit quantized frozen base — fine-tune a 65B model on a single 48GB GPU."
cluster: "peft"
level: 4
tags:
  - "peft"
  - "fine-tuning-techniques"
when_to_use: "You are VRAM-constrained and want to fine-tune a big model on consumer/single GPU."
relations:
  - "requires:quantization"
  - "requires:bitsandbytes"
  - "combines:gradient-checkpointing"
references:
  - "QLoRA|https://arxiv.org/abs/2305.14314"
resource: "https://arxiv.org/abs/2305.14314"
---

# QLoRA

Combines 4-bit NormalFloat (NF4) quantization, double quantization, and paged optimizers with LoRA adapters trained in bf16. Near-zero quality loss vs. 16-bit LoRA. Democratized fine-tuning of large models. Pair with **LoftQ** initialization to close the remaining gap to full-precision fine-tuning, especially at very low bit-widths.

## Example

```python
from transformers import BitsAndBytesConfig
BitsAndBytesConfig(load_in_4bit=True, bnb_4bit_quant_type="nf4",
  bnb_4bit_compute_dtype="bfloat16", bnb_4bit_use_double_quant=True)
```

## When to use

You are VRAM-constrained and want to fine-tune a big model on consumer/single GPU.

## Related concepts

- requires → [Quantization](/efficiency/quantization.md)
- requires → [bitsandbytes (NF4/INT8)](/efficiency/bitsandbytes.md)
- combines with → [Gradient Checkpointing](/efficiency/gradient-checkpointing.md)

## References

- [QLoRA](https://arxiv.org/abs/2305.14314)
