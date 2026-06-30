---
type: "Training Method"
title: "Chat Templates & Data Format"
description: "The exact token format (roles, special tokens) the model expects for multi-turn chat."
cluster: "sft"
level: 4
tags:
  - "sft"
  - "fine-tuning-techniques"
when_to_use: "Always — correct templating is the #1 source of silent fine-tuning bugs."
---

# Chat Templates & Data Format

ChatML / Llama / Mistral templates wrap turns with special tokens (<|im_start|>, [INST]). Getting this wrong silently wrecks fine-tuning. Loss-masking ensures you train on assistant tokens only.

## Example

```python
tokenizer.apply_chat_template(messages, tokenize=False)
```

## When to use

Always — correct templating is the #1 source of silent fine-tuning bugs.
