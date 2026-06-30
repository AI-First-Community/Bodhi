---
type: "Reasoning Method"
title: "Self-Refine / Reflection"
description: "The model critiques its own output and revises it over one or more feedback rounds — iterative self-correction at inference time, no extra training."
cluster: "reasoning"
level: 5
added: "0.4.0"
tags:
  - "reasoning"
when_to_use: "Tasks where a draft can be improved by inspection — code, writing, math — and you can afford extra passes. Gains are largest when feedback is grounded (tests, tools), not the model's unaided self-judgment."
relations:
  - "builds-on:cot"
  - "alternative:self-consistency"
references:
  - "Self-Refine|https://arxiv.org/abs/2303.17651"
  - "Reflexion|https://arxiv.org/abs/2303.11366"
resource: "https://arxiv.org/abs/2303.17651"
---

# Self-Refine / Reflection

Self-refine has the model generate an answer, then produce **feedback on its own output**, then **revise** — looping until a stopping condition. Reflexion extends this by keeping a memory of past critiques to steer later attempts. It's a test-time strategy orthogonal to sampling many answers: instead of drawing independent samples and voting ([self-consistency](/reasoning/self-consistency.md)), it *sequentially improves a single answer*. The catch is that ungrounded self-critique can plateau or even reinforce errors — reliable gains usually come when the feedback is anchored to an **external signal** (unit tests, a verifier, tool output) rather than the model judging itself.

## When to use

Tasks where a draft can be improved by inspection — code, writing, math — and you can afford extra passes. Gains are largest when feedback is grounded (tests, tools), not the model's unaided self-judgment.

## References

- [Self-Refine](https://arxiv.org/abs/2303.17651)
- [Reflexion](https://arxiv.org/abs/2303.11366)
