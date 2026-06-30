---
type: "Concept"
title: "Tokenization"
description: "Text is split into subword tokens via BPE / WordPiece / Unigram before the model sees it."
cluster: "foundations"
level: 1
tags:
  - "foundations"
  - "foundations"
when_to_use: "Understand it to reason about context limits, cost, and why models miscount characters or struggle with rare words."
relations:
  - "requires:embedding"
references:
  - "BPE (Sennrich 2015)|https://arxiv.org/abs/1508.07909"
resource: "https://arxiv.org/abs/1508.07909"
---

# Tokenization

LLMs never see raw characters or words — they see integer token IDs. Byte-Pair Encoding (GPT), WordPiece (BERT), and SentencePiece/Unigram (T5, Llama) trade off vocabulary size vs. sequence length: a bigger vocab (e.g. 128K vs 32K) means a larger embedding matrix but fewer tokens per text — and far fewer for non-English/CJK and code, which fragment badly under small vocabularies. Token count drives both cost and context limits; ~1 token ≈ 4 chars in English.

## Example

```python
from transformers import AutoTokenizer
tok = AutoTokenizer.from_pretrained("meta-llama/Llama-3-8B")
tok("Fine-tuning is fun")  # -> {input_ids:[128000, 6713, 64, ...]}
```

## When to use

Understand it to reason about context limits, cost, and why models miscount characters or struggle with rare words.

## Related concepts

- requires → [Embeddings](/foundations/embedding.md)

## References

- [BPE (Sennrich 2015)](https://arxiv.org/abs/1508.07909)
