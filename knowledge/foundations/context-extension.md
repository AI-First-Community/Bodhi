---
type: "Concept"
title: "Context-Window Extension"
description: "Stretch a model's usable context far past its trained length by rescaling RoPE positions, usually with brief fine-tuning."
cluster: "foundations"
level: 4
tags:
  - "foundations"
when_to_use: "You need a longer window than the base model was trained for and can afford a short fine-tune."
relations:
  - "builds-on:positional-encoding"
  - "requires:context-window"
  - "combines:lora"
references:
  - "YaRN|https://arxiv.org/abs/2309.00071"
  - "LongRoPE|https://arxiv.org/abs/2402.13753"
resource: "https://arxiv.org/abs/2309.00071"
---

# Context-Window Extension

Methods rescale rotary position encodings so out-of-range positions stay in distribution: Position Interpolation, NTK-aware, YaRN (now common in Qwen), and LongRoPE (claims 2M+, used in Phi-3). LongLoRA adds shifted-sparse attention so the extension can be learned cheaply with LoRA. Crucial caveat: extending the *window* doesn't guarantee usable recall — advertised length ≠ effective length (see Long-Context Limitations; RULER/NoLiMa), so treat headline numbers like LongRoPE's 2M with skepticism.

## Example

```python
rope_scaling = {"type": "yarn", "factor": 4.0, "original_max_position_embeddings": 8192}
```

## When to use

You need a longer window than the base model was trained for and can afford a short fine-tune.

## References

- [YaRN](https://arxiv.org/abs/2309.00071)
- [LongRoPE](https://arxiv.org/abs/2402.13753)
