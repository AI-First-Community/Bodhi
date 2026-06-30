---
type: "PEFT Method"
title: "PEFT"
description: "Parameter-Efficient Fine-Tuning: update <1% of weights, match full-FT quality cheaply."
cluster: "peft"
level: 4
tags:
  - "peft"
  - "fine-tuning-techniques"
when_to_use: "The default modern fine-tuning approach. Start with LoRA/QLoRA."
relations:
  - "builds-on:full-ft"
  - "is-a:lora"
  - "is-a:adapters"
  - "is-a:prefix-tuning"
  - "is-a:prompt-tuning"
  - "is-a:p-tuning"
  - "is-a:ia3"
  - "is-a:bitfit"
  - "is-a:layer-freezing"
  - "combines:sft"
references:
  - "PEFT survey|https://arxiv.org/abs/2403.14608"
resource: "https://arxiv.org/abs/2403.14608"
---

# PEFT

Three families — Additive (inject new params: adapters, prompts), Reparameterization (low-rank deltas: LoRA), Selective (train a subset: BitFit). Slashes VRAM, storage (MBs per task), and enables many task-specific adapters over one frozen base.

## When to use

The default modern fine-tuning approach. Start with LoRA/QLoRA.

## Related concepts

- builds on → [Full Fine-Tuning](/adaptation/full-ft.md)
- is a type of → [LoRA](/peft/lora.md)
- is a type of → [Adapter Layers](/peft/adapters.md)
- is a type of → [Prefix Tuning](/peft/prefix-tuning.md)
- is a type of → [Prompt Tuning](/peft/prompt-tuning.md)
- is a type of → [P-Tuning (v2)](/peft/p-tuning.md)
- is a type of → [(IA)³](/peft/ia3.md)
- is a type of → [BitFit](/peft/bitfit.md)
- is a type of → [Layer Freezing](/peft/layer-freezing.md)
- combines with → [Supervised Fine-Tuning](/sft/sft.md)

## References

- [PEFT survey](https://arxiv.org/abs/2403.14608)
