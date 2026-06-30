# Foundations

- [Context Window](./context-window.md) — The maximum number of tokens the model can attend to at once (e.g. 8K, 128K, 1M).
- [Embeddings](./embedding.md) — Each token ID maps to a learned dense vector; semantically similar tokens land near each other.
- [Logits & Softmax (Output Head)](./logit-softmax.md) — The final projection from hidden state to vocabulary logits, turned into a probability distribution by softmax — where sampling happens.
- [Pretraining](./pretraining.md) — Self-supervised next-token prediction over trillions of tokens — creates the base model.
- [Scaling Laws](./scaling-laws.md) — Loss falls as a power law in parameters, data, and compute — predictably.
- [Tokenization](./token.md) — Text is split into subword tokens via BPE / WordPiece / Unigram before the model sees it.
- [Long-Context Limitations](./long-context-limits.md) — A model's *effective* context is far below its advertised window — recall degrades long before the window fills.
- [Context-Window Extension](./context-extension.md) — Stretch a model's usable context far past its trained length by rescaling RoPE positions, usually with brief fine-tuning.
