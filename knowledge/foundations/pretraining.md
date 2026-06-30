---
type: "Concept"
title: "Pretraining"
description: "Self-supervised next-token prediction over trillions of tokens — creates the base model."
cluster: "foundations"
level: 1
tags:
  - "foundations"
  - "foundations"
when_to_use: "The origin of the base model. All fine-tuning techniques modify or adapt a pretrained model."
relations:
  - "combines:scaling-laws"
  - "requires:decoder-gpt"
references:
  - "GPT-3|https://arxiv.org/abs/2005.14165"
resource: "https://arxiv.org/abs/2005.14165"
---

# Pretraining

Causal language modeling: predict token t+1 from tokens 1..t, cross-entropy loss. No labels needed — the data labels itself. This is where 99%+ of compute goes and where world knowledge is acquired. Everything downstream just *steers* this knowledge.

## Example

```python
loss = CrossEntropy(logits[:, :-1], input_ids[:, 1:])  # shift by one
```

## When to use

The origin of the base model. All fine-tuning techniques modify or adapt a pretrained model.

## Related concepts

- combines with → [Scaling Laws](/foundations/scaling-laws.md)
- requires → [Decoder-only (GPT)](/modeltypes/decoder-gpt.md)

## References

- [GPT-3](https://arxiv.org/abs/2005.14165)
