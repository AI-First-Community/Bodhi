---
type: "Concept"
title: "Logits & Softmax (Output Head)"
description: "The final projection from hidden state to vocabulary logits, turned into a probability distribution by softmax — where sampling happens."
cluster: "foundations"
level: 1
tags:
  - "foundations"
when_to_use: "Understand it to reason about temperature, sampling strategies, and how generation actually emits tokens."
relations:
  - "requires:embedding"
  - "combines:token"
references:
  - "Weight Tying (Press & Wolf)|https://arxiv.org/abs/1608.05859"
resource: "https://arxiv.org/abs/1608.05859"
---

# Logits & Softmax (Output Head)

The output head maps the last hidden state to one logit per vocabulary token; softmax (with temperature) converts logits to probabilities, and top-k / nucleus (top-p) sampling selects the next token. The output matrix is often *tied* to the input embedding matrix (weight tying) to save parameters.

## When to use

Understand it to reason about temperature, sampling strategies, and how generation actually emits tokens.

## References

- [Weight Tying (Press & Wolf)](https://arxiv.org/abs/1608.05859)
