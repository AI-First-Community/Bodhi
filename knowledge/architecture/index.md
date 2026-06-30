# Architecture

- [Attention](./attention.md) — Each token gathers information from others via weighted averaging of value vectors.
- [Feed-Forward / MLP](./ffn.md) — Per-token 2-layer MLP (often with SwiGLU); holds most of the parameters and factual knowledge.
- [Grouped-Query Attention (GQA)](./gqa.md) — Share one key/value head across a group of query heads — shrinks the KV cache with near-MHA quality.
- [Hybrid SSM–Transformer](./hybrid-ssm.md) — Interleave a majority of Mamba/linear layers with a minority of full-attention layers — long-context throughput with retained recall.
- [KV Cache](./kv-cache.md) — Cache past Key/Value tensors so each new token costs O(n) not O(n²) at inference.
- [Linear Attention](./linear-attention.md) — Replace softmax attention with a kernel/recurrent form that is linear in sequence length and supports O(1) decoding.
- [Mamba / State-Space Models (SSM)](./mamba.md) — Selective state-space sequence model with linear-time recurrence and constant memory per token — an attention-free alternative.
- [Mixture of Experts (MoE)](./moe.md) — Replace the dense FFN with many expert MLPs; a router activates only a few per token.
- [Multi-Head Attention](./multi-head.md) — Run attention in parallel h times in subspaces, then concatenate — multiple "relationship channels".
- [Multi-head Latent Attention (MLA)](./mla.md) — Compress keys/values into a shared low-rank latent vector — ~3–5× smaller KV cache than GQA at equal or better quality.
- [Multi-Query Attention (MQA)](./mqa.md) — Share a single key/value head across all query heads — extreme KV-cache compression at a modest quality cost.
- [Positional Encoding](./positional-encoding.md) — Injects order information, since attention is otherwise permutation-invariant.
- [RMSNorm](./rms-norm.md) — Normalize activations by their root-mean-square only (no mean-centering) — cheaper than LayerNorm at equal quality.
- [Rotary Position Embeddings (RoPE)](./rope.md) — Encode position as rotations applied to query/key vectors — relative-position aware and the basis for context-window extension.
- [Self-Attention](./self-attention.md) — Attention where Q, K, V all come from the same sequence — tokens attend to each other.
- [Sliding-Window Attention (SWA)](./sliding-window-attention.md) — Each layer attends only to a fixed local window; stacked layers still propagate information far beyond it.
- [SwiGLU (Gated FFN)](./swiglu.md) — A gated feed-forward block — SiLU(xW) ⊙ (xV) — that outperforms ReLU/GELU MLPs at equal parameter budget.
- [Transformer](./transformer.md) — The backbone architecture: stacked blocks of attention + feed-forward, connected by residuals.
