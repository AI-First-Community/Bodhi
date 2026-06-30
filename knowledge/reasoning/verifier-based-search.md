---
type: "Reasoning Method"
title: "Verifier-Based Search"
description: "Generate many candidate solutions and select with a verifier (process or outcome reward) rather than majority vote."
cluster: "reasoning"
level: 5
tags:
  - "reasoning"
when_to_use: "You have a good verifier/reward model and want to trade inference compute for accuracy."
relations:
  - "alternative:self-consistency"
  - "builds-on:process-reward-model"
  - "combines:test-time-compute"
references:
  - "Scaling LLM Test-Time Compute|https://arxiv.org/abs/2408.03314"
resource: "https://arxiv.org/abs/2408.03314"
---

# Verifier-Based Search

A branch of test-time compute distinct from self-consistency: instead of voting, score candidates with a trained verifier / reward model (or a programmatic checker) and pick the best. With a strong verifier, scaling samples reliably improves accuracy — the basis of best-of-N and search-guided reasoning.

## When to use

You have a good verifier/reward model and want to trade inference compute for accuracy.

## References

- [Scaling LLM Test-Time Compute](https://arxiv.org/abs/2408.03314)
