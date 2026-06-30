---
type: "Adaptation Strategy"
title: "Adaptation Spectrum"
description: "The ladder of options to steer a base model, ordered by cost & how much you change weights."
cluster: "adaptation"
level: 3
tags:
  - "adaptation"
  - "adaptation-basics"
when_to_use: "The decision framework that organizes every technique below. Start at the top of the ladder."
relations:
  - "is-a:prompting"
  - "is-a:rag"
  - "is-a:peft"
  - "is-a:full-ft"
  - "is-a:continued-pretraining"
---

# Adaptation Spectrum

Prompting (no weight change) → RAG (external knowledge, no weight change) → PEFT (few weights) → Full fine-tuning (all weights) → Continued pretraining (new base). Choose the *cheapest* rung that solves your problem.

## When to use

The decision framework that organizes every technique below. Start at the top of the ladder.

## Related concepts

- is a type of → [Prompting](/adaptation/prompting.md)
- is a type of → [RAG](/adaptation/rag.md)
- is a type of → [PEFT](/peft/peft.md)
- is a type of → [Full Fine-Tuning](/adaptation/full-ft.md)
- is a type of → [Continued Pretraining](/adaptation/continued-pretraining.md)
