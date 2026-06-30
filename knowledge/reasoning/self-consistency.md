---
type: "Reasoning Method"
title: "Self-Consistency"
description: "Sample multiple reasoning paths and take a majority vote on the answer — a cheap accuracy boost over greedy chain-of-thought."
cluster: "reasoning"
level: 5
tags:
  - "reasoning"
  - "inference"
when_to_use: "Boost chain-of-thought accuracy on math/logic when you can afford a handful of samples."
relations:
  - "builds-on:cot"
  - "combines:test-time-compute"
references:
  - "Self-Consistency (Wang 2022)|https://arxiv.org/abs/2203.11171"
resource: "https://arxiv.org/abs/2203.11171"
---

# Self-Consistency

Draw N independent chains of thought at non-zero temperature, then marginalize over the reasoning by majority-voting the final answers. Because there are many valid reasoning paths to a correct answer but fewer to any particular wrong one, voting reliably improves accuracy on arithmetic and commonsense tasks. It is the simplest, most robust form of test-time compute.

## Example

```python
answers = [model.generate(prompt, temperature=0.7) for _ in range(20)]
final = Counter(extract_answer(a) for a in answers).most_common(1)[0][0]
```

## When to use

Boost chain-of-thought accuracy on math/logic when you can afford a handful of samples.

## References

- [Self-Consistency Improves CoT Reasoning](https://arxiv.org/abs/2203.11171)
