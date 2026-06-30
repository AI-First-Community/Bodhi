---
type: "Training Method"
title: "Supervised Fine-Tuning"
description: "Train on (prompt, ideal-response) pairs with next-token loss on the response tokens."
cluster: "sft"
level: 4
tags:
  - "sft"
  - "fine-tuning-techniques"
when_to_use: "You have demonstrations of the behavior you want. The foundation before any preference alignment."
relations:
  - "is-a:instruction-tuning"
  - "requires:chat-template"
  - "combines:lora"
  - "requires:dataset-prep"
  - "requires:evaluation"
references:
  - "InstructGPT|https://arxiv.org/abs/2203.02155"
resource: "https://arxiv.org/abs/2203.02155"
---

# Supervised Fine-Tuning

The first post-pretraining step. Loss is masked to the assistant turn only. Teaches format, task behavior, and tone. Can be done full-FT or (usually) via LoRA/QLoRA. Quality of data >> quantity.

## Example

```python
# TRL SFTTrainer
from trl import SFTTrainer
SFTTrainer(model, train_dataset=ds, peft_config=lora_cfg, args=...)
```

## When to use

You have demonstrations of the behavior you want. The foundation before any preference alignment.

## Related concepts

- is a type of → [Instruction Tuning](/sft/instruction-tuning.md)
- requires → [Chat Templates & Data Format](/sft/chat-template.md)
- combines with → [LoRA](/peft/lora.md)
- requires → [Dataset Curation](/dataeval/dataset-prep.md)
- builds on → [RLHF](/alignment/rlhf.md)
- requires → [Evaluation](/dataeval/evaluation.md)

## References

- [InstructGPT](https://arxiv.org/abs/2203.02155)
