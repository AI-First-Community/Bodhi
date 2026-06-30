---
type: "Concept"
title: "Sampling & Decoding"
description: "How the next token is chosen from the probability distribution — greedy, temperature, top-k, top-p (nucleus), and beam search."
cluster: "foundations"
level: 2
added: "0.4.0"
tags:
  - "foundations"
when_to_use: "Tuning generation: low temperature / greedy for factual and code tasks; higher temperature + top-p for creative diversity or when sampling many candidates."
relations:
  - "builds-on:logit-softmax"
  - "combines:self-consistency"
references:
  - "The Curious Case of Neural Text Degeneration (nucleus sampling)|https://arxiv.org/abs/1904.09751"
  - "Hierarchical Neural Story Generation (top-k)|https://arxiv.org/abs/1805.04833"
resource: "https://arxiv.org/abs/1904.09751"
---

# Sampling & Decoding

Once the output head turns the final hidden state into a probability distribution over the vocabulary (logits → softmax), a *decoding strategy* picks the next token. **Greedy/argmax** is deterministic but repetitive. **Temperature** rescales the logits before softmax — below 1 sharpens toward the top token, above 1 flattens for more diversity. **Top-k** samples only from the k most likely tokens; **top-p (nucleus)** keeps the smallest set whose cumulative probability exceeds p, adapting the cutoff to the distribution's shape. **Beam search** tracks several high-probability sequences at once. These knobs trade determinism and factual reliability against diversity and creativity, and they underpin test-time strategies that draw many candidates (self-consistency, best-of-N).

## Example
```python
# temperature + top-p (nucleus) sampling over logits
import torch
def sample(logits, temperature=0.8, top_p=0.95):
    logits = logits / temperature
    probs = torch.softmax(logits, dim=-1)
    sorted_probs, idx = torch.sort(probs, descending=True)
    keep = torch.cumsum(sorted_probs, dim=-1) <= top_p
    keep[0] = True                      # always keep the top token
    sorted_probs[~keep] = 0
    choice = idx[torch.multinomial(sorted_probs, 1)]
    return choice
```

## When to use

Tuning generation: low temperature / greedy for factual and code tasks; higher temperature + top-p for creative diversity or when sampling many candidates.

## References

- [The Curious Case of Neural Text Degeneration (nucleus sampling)](https://arxiv.org/abs/1904.09751)
- [Hierarchical Neural Story Generation (top-k)](https://arxiv.org/abs/1805.04833)
