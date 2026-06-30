# PEFT

- [(IA)³](./ia3.md) — Learn tiny per-feature scaling vectors that rescale keys, values, and FFN activations.
- [AdaLoRA](./adalora.md) — Adaptively allocate the rank budget across layers via SVD — important layers get more rank.
- [Adapter Layers](./adapters.md) — Insert tiny bottleneck MLP modules between transformer layers; train only those.
- [BitFit](./bitfit.md) — Train only the bias terms — a tiny selective baseline that is surprisingly competitive.
- [DoRA](./dora.md) — Weight-Decomposed LoRA: split W into magnitude + direction, LoRA-adapt the direction.
- [Layer Freezing](./layer-freezing.md) — Freeze lower layers, fine-tune only the top few — simplest selective method.
- [LoRA](./lora.md) — Freeze W; learn a low-rank update ΔW = B·A (rank r ≪ d). The workhorse of PEFT.
- [P-Tuning (v2)](./p-tuning.md) — Soft prompts inserted at multiple layers via a small prompt encoder; strong on NLU.
- [PEFT](./peft.md) — Parameter-Efficient Fine-Tuning: update <1% of weights, match full-FT quality cheaply.
- [PiSSA (Principal Singular-Value Init)](./pissa.md) — Initialize the LoRA A/B matrices from the principal singular vectors of W (via SVD) and freeze the residual — much faster convergence than random init.
- [Prefix Tuning](./prefix-tuning.md) — Prepend trainable "virtual" key/value vectors to every attention layer; freeze the model.
- [Prompt Tuning](./prompt-tuning.md) — Learn a handful of soft (continuous) prompt embeddings prepended to the input only.
- [QLoRA](./qlora.md) — LoRA on a 4-bit quantized frozen base — fine-tune a 65B model on a single 48GB GPU.
- [ReFT (Representation Fine-Tuning)](./reft.md) — Learn lightweight interventions on frozen hidden-state representations instead of editing weights — reportedly 15–65× more parameter-efficient than LoRA.
- [rsLoRA (Rank-Stabilized LoRA)](./rslora.md) — Scale LoRA by α/√r instead of α/r so higher ranks actually help instead of collapsing gradients.
- [VeRA (Vector-based Random Matrix Adaptation)](./vera.md) — Freeze a single pair of random low-rank matrices shared across all layers and train only tiny per-layer scaling vectors — ~10× fewer params than LoRA.
