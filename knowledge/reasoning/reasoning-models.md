---
type: "Reasoning Method"
title: "Reasoning Models"
description: "Models trained to \"think\" before answering — spending test-time compute on long internal chains of thought (o1, DeepSeek-R1)."
cluster: "reasoning"
level: 5
tags:
  - "reasoning"
  - "test-time-compute"
when_to_use: "Hard multi-step problems (math, code, planning, agents) where accuracy matters more than latency or cost."
relations:
  - "builds-on:cot"
  - "requires:rlvr"
  - "combines:grpo"
  - "combines:test-time-compute"
references:
  - "DeepSeek-R1|https://arxiv.org/abs/2501.12948"
  - "OpenAI o1 system card|https://openai.com/index/learning-to-reason-with-llms/"
resource: "https://arxiv.org/abs/2501.12948"
---

# Reasoning Models

A class of models (OpenAI's o1 → o3 lineage, DeepSeek-R1, Gemini "thinking", Qwen-QwQ) that generate a long internal chain of thought before the final answer, trading inference compute for accuracy on math, code, and logic. They are trained largely with RL on *verifiable* rewards (RLVR) — often via GRPO/DAPO — rather than human preference, and the reasoning behavior (self-checking, backtracking) is emergent. The "thinking" trace is usually hidden from the end user (OpenAI hides it; DeepSeek exposes it in `<think>` tags).

## When to use

Hard multi-step problems (math, code, planning, agents) where accuracy matters more than latency or cost.

## References

- [DeepSeek-R1](https://arxiv.org/abs/2501.12948)
- [OpenAI o1: Learning to Reason](https://openai.com/index/learning-to-reason-with-llms/)
