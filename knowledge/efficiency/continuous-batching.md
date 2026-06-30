---
type: "Efficiency Technique"
title: "Continuous Batching"
description: "Iteration-level scheduling that adds/removes requests from the running batch each decode step — 2–3× throughput vs. static batching."
cluster: "efficiency"
level: 5
tags:
  - "efficiency"
when_to_use: "The default request scheduler for any serious LLM serving deployment."
relations:
  - "requires:paged-attention"
  - "combines:speculative-decoding"
references:
  - "vLLM (continuous batching)|https://arxiv.org/abs/2309.06180"
resource: "https://arxiv.org/abs/2309.06180"
---

# Continuous Batching

Static batching wastes the GPU waiting for the slowest sequence to finish. Continuous (in-flight) batching schedules at the token step, swapping completed requests out and new ones in, maximizing utilization and tail latency. Standard in vLLM, TGI, TensorRT-LLM.

## When to use

The default request scheduler for any serious LLM serving deployment.

## References

- [vLLM (continuous batching)](https://arxiv.org/abs/2309.06180)
