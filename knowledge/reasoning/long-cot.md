---
type: "Reasoning Method"
title: "Long Chain-of-Thought"
description: "Extended, self-correcting reasoning traces (\"thinking\" tokens) that backtrack, verify, and explore before answering."
cluster: "reasoning"
level: 5
tags:
  - "reasoning"
  - "chain-of-thought"
when_to_use: "Underpins reasoning models; relevant when fine-tuning or distilling for deliberate, multi-step problem solving."
relations:
  - "improves-on:cot"
  - "requires:reasoning-models"
references:
  - "DeepSeek-R1|https://arxiv.org/abs/2501.12948"
resource: "https://arxiv.org/abs/2501.12948"
---

# Long Chain-of-Thought

Unlike short, prompted chain-of-thought, long-CoT is *learned* behavior: the model emits thousands of reasoning tokens that reflect, check intermediate results, recognize mistakes, and revise — sometimes restarting an approach entirely. It emerges from RL training on verifiable tasks and is what makes reasoning models strong on competition math and code. The trace ("&lt;think&gt;…") is typically hidden from the user and separated from the final answer.

## When to use

Underpins reasoning models; relevant when fine-tuning or distilling for deliberate, multi-step problem solving.

## References

- [DeepSeek-R1](https://arxiv.org/abs/2501.12948)
