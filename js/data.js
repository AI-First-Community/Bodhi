/* ============================================================================
   LLM BODHI — GENERATED FILE. Do not edit by hand.
   Source of truth: the OKF bundle in knowledge/  (+ okf.config.js for vocab/flows)
   Regenerate with:  node scripts/okf.js build
   ============================================================================ */
const CLUSTERS = {
  "foundations": {
    "label": "Foundations",
    "color": "#3b82f6"
  },
  "architecture": {
    "label": "Architecture",
    "color": "#8b5cf6"
  },
  "modeltypes": {
    "label": "Model Archetypes",
    "color": "#06b6d4"
  },
  "adaptation": {
    "label": "Adaptation Spectrum",
    "color": "#f59e0b"
  },
  "peft": {
    "label": "PEFT",
    "color": "#10b981"
  },
  "sft": {
    "label": "SFT / Instruction",
    "color": "#84cc16"
  },
  "alignment": {
    "label": "Alignment / Preference",
    "color": "#ef4444"
  },
  "reasoning": {
    "label": "Reasoning & Test-Time",
    "color": "#14b8a6"
  },
  "agents": {
    "label": "Agents & Retrieval",
    "color": "#f97316"
  },
  "efficiency": {
    "label": "Efficiency & Infra",
    "color": "#ec4899"
  },
  "dataeval": {
    "label": "Data & Evaluation",
    "color": "#a78bfa"
  }
};
const LEVELS = {
  "1": "Foundations",
  "2": "Core Mechanics",
  "3": "Adaptation Basics",
  "4": "Fine-Tuning Techniques",
  "5": "Advanced / Alignment"
};
const RELATIONS = {
  "is-a": {
    "label": "is a type of",
    "color": "#64748b",
    "style": "solid"
  },
  "improves-on": {
    "label": "improves on",
    "color": "#10b981",
    "style": "solid"
  },
  "alternative": {
    "label": "alternative to",
    "color": "#f59e0b",
    "style": "dashed"
  },
  "requires": {
    "label": "requires",
    "color": "#ef4444",
    "style": "solid"
  },
  "combines": {
    "label": "combines with",
    "color": "#06b6d4",
    "style": "dotted"
  },
  "builds-on": {
    "label": "builds on",
    "color": "#8b5cf6",
    "style": "solid"
  },
  "path": {
    "label": "example step",
    "color": "#fbbf24",
    "style": "solid"
  }
};
const GRAPH = {
  "nodes": [
    {
      "id": "context-window",
      "label": "Context Window",
      "type": "Concept",
      "cluster": "foundations",
      "level": 1,
      "summary": "The maximum number of tokens the model can attend to at once (e.g. 8K, 128K, 1M).",
      "detail": "Bounded by positional encoding scheme and the O(n²) cost of attention. Extension tricks: RoPE scaling, ALiBi, sliding-window attention. Long context ≠ good recall (\"lost in the middle\").",
      "whenToUse": "Decide between long-context prompting vs. RAG vs. fine-tuning when knowledge exceeds the window.",
      "refs": [
        {
          "t": "Lost in the Middle",
          "u": "https://arxiv.org/abs/2307.03172"
        }
      ]
    },
    {
      "id": "embedding",
      "label": "Embeddings",
      "type": "Concept",
      "cluster": "foundations",
      "level": 1,
      "summary": "Each token ID maps to a learned dense vector; semantically similar tokens land near each other.",
      "detail": "The embedding matrix (vocab × d_model) is the first learned layer. Vectors encode meaning geometrically — \"king\" − \"man\" + \"woman\" ≈ \"queen\". Output logits are typically the transpose of this matrix (weight tying).",
      "whenToUse": "Foundational for understanding RAG retrieval, similarity search, and what \"representation\" means.",
      "code": "# d_model=4096 for Llama-3-8B; embedding matrix ~ 128256 x 4096",
      "refs": [
        {
          "t": "word2vec",
          "u": "https://arxiv.org/abs/1301.3781"
        }
      ]
    },
    {
      "id": "logit-softmax",
      "label": "Logits & Softmax (Output Head)",
      "type": "Concept",
      "cluster": "foundations",
      "level": 1,
      "summary": "The final projection from hidden state to vocabulary logits, turned into a probability distribution by softmax — where sampling happens.",
      "detail": "The output head maps the last hidden state to one logit per vocabulary token; softmax (with temperature) converts logits to probabilities, and top-k / nucleus (top-p) sampling selects the next token. The output matrix is often *tied* to the input embedding matrix (weight tying) to save parameters.",
      "whenToUse": "Understand it to reason about temperature, sampling strategies, and how generation actually emits tokens.",
      "refs": [
        {
          "t": "Weight Tying (Press & Wolf)",
          "u": "https://arxiv.org/abs/1608.05859"
        }
      ]
    },
    {
      "id": "pretraining",
      "label": "Pretraining",
      "type": "Concept",
      "cluster": "foundations",
      "level": 1,
      "summary": "Self-supervised next-token prediction over trillions of tokens — creates the base model.",
      "detail": "Causal language modeling: predict token t+1 from tokens 1..t, cross-entropy loss. No labels needed — the data labels itself. This is where 99%+ of compute goes and where world knowledge is acquired. Everything downstream just *steers* this knowledge.",
      "whenToUse": "The origin of the base model. All fine-tuning techniques modify or adapt a pretrained model.",
      "code": "loss = CrossEntropy(logits[:, :-1], input_ids[:, 1:])  # shift by one",
      "refs": [
        {
          "t": "GPT-3",
          "u": "https://arxiv.org/abs/2005.14165"
        }
      ]
    },
    {
      "id": "scaling-laws",
      "label": "Scaling Laws",
      "type": "Concept",
      "cluster": "foundations",
      "level": 1,
      "summary": "Loss falls as a power law in parameters, data, and compute — predictably.",
      "detail": "Kaplan (2020) then Chinchilla (2022): for a fixed compute budget, params and tokens should scale together (~20 tokens/param optimal). That ~20:1 ratio is a 2022 *compute-optimal* estimate for training cost only — modern models deliberately **over-train far beyond it** (often hundreds–thousands of tokens/param) to shrink a smaller model that's cheaper to serve. Scaling has since been extended to data quality and test-time compute. Explains why \"bigger + more data\" reliably works and informs the build-vs-fine-tune decision.",
      "whenToUse": "Reason about whether a bigger base model or more fine-tuning data will help more.",
      "refs": [
        {
          "t": "Chinchilla",
          "u": "https://arxiv.org/abs/2203.15556"
        }
      ]
    },
    {
      "id": "token",
      "label": "Tokenization",
      "type": "Concept",
      "cluster": "foundations",
      "level": 1,
      "summary": "Text is split into subword tokens via BPE / WordPiece / Unigram before the model sees it.",
      "detail": "LLMs never see raw characters or words — they see integer token IDs. Byte-Pair Encoding (GPT), WordPiece (BERT), and SentencePiece/Unigram (T5, Llama) trade off vocabulary size vs. sequence length: a bigger vocab (e.g. 128K vs 32K) means a larger embedding matrix but fewer tokens per text — and far fewer for non-English/CJK and code, which fragment badly under small vocabularies. Token count drives both cost and context limits; ~1 token ≈ 4 chars in English.",
      "whenToUse": "Understand it to reason about context limits, cost, and why models miscount characters or struggle with rare words.",
      "code": "from transformers import AutoTokenizer\ntok = AutoTokenizer.from_pretrained(\"meta-llama/Llama-3-8B\")\ntok(\"Fine-tuning is fun\")  # -> {input_ids:[128000, 6713, 64, ...]}",
      "refs": [
        {
          "t": "BPE (Sennrich 2015)",
          "u": "https://arxiv.org/abs/1508.07909"
        }
      ]
    },
    {
      "id": "long-context-limits",
      "label": "Long-Context Limitations",
      "type": "Concept",
      "cluster": "foundations",
      "level": 2,
      "summary": "A model's *effective* context is far below its advertised window — recall degrades long before the window fills.",
      "detail": "\"Lost in the middle\" (U-shaped positional bias) and \"context rot\" (non-uniform degradation as input grows, even with perfect retrieval) mean a 1M-token window rarely means 1M tokens of reliable recall. Benchmarks like RULER and NoLiMa measure the real, much smaller, effective length. This is why RAG and context engineering stay relevant despite huge windows.",
      "whenToUse": "Always factor this in when choosing long-context prompting vs. RAG; do not trust the advertised window.",
      "refs": [
        {
          "t": "RULER",
          "u": "https://arxiv.org/abs/2404.06654"
        },
        {
          "t": "Lost in the Middle",
          "u": "https://arxiv.org/abs/2307.03172"
        }
      ]
    },
    {
      "id": "attention",
      "label": "Attention",
      "type": "Architecture Component",
      "cluster": "architecture",
      "level": 2,
      "summary": "Each token gathers information from others via weighted averaging of value vectors.",
      "detail": "softmax(QKᵀ/√d)·V. Queries ask, Keys advertise, Values carry content. The QKᵀ matrix is where \"which tokens matter to which\" is computed — the source of in-context learning.",
      "whenToUse": "Understanding which weight matrices (q_proj, k_proj, v_proj) LoRA typically targets.",
      "code": "A = softmax(Q @ K.transpose(-2,-1) / sqrt(d_k))\nout = A @ V",
      "refs": [
        {
          "t": "The Illustrated Transformer",
          "u": "https://jalammar.github.io/illustrated-transformer/"
        }
      ]
    },
    {
      "id": "ffn",
      "label": "Feed-Forward / MLP",
      "type": "Architecture Component",
      "cluster": "architecture",
      "level": 2,
      "summary": "Per-token 2-layer MLP (often with SwiGLU); holds most of the parameters and factual knowledge.",
      "detail": "Expands to ~4× d_model then projects back. Modern models use a **gated** variant (SwiGLU) where the gate is Swish/SiLU — *not* sigmoid — outperforming plain ReLU/GELU MLPs. Mechanistic-interpretability work suggests FFN layers act as key-value memories storing facts. Mixture-of-Experts (MoE) sparsifies this layer.",
      "whenToUse": "Some PEFT methods (DoRA, full-FT) target these; MoE models scale here."
    },
    {
      "id": "gqa",
      "label": "Grouped-Query Attention (GQA)",
      "type": "Architecture Component",
      "cluster": "architecture",
      "level": 2,
      "summary": "Share one key/value head across a group of query heads — shrinks the KV cache with near-MHA quality.",
      "detail": "Interpolates between Multi-Head Attention (one KV head per query head) and Multi-Query Attention (a single shared KV head). By grouping query heads to share an intermediate number of KV heads, it cuts KV-cache memory and speeds decoding at minimal quality cost. Now the default attention in Llama 2/3, Mistral, Gemma, and Qwen.",
      "whenToUse": "Essentially the standard choice for decoder LLMs that need efficient long-context inference.",
      "refs": [
        {
          "t": "GQA (Ainslie 2023)",
          "u": "https://arxiv.org/abs/2305.13245"
        }
      ]
    },
    {
      "id": "hybrid-ssm",
      "label": "Hybrid SSM–Transformer",
      "type": "Architecture Component",
      "cluster": "architecture",
      "level": 2,
      "summary": "Interleave a majority of Mamba/linear layers with a minority of full-attention layers — long-context throughput with retained recall.",
      "detail": "Pure SSMs are efficient but weaker at precise recall; pure attention is costly. Hybrids keep ~1 attention layer per several SSM layers to get both. Shipped at scale in Jamba (AI21), NVIDIA Nemotron-H, and IBM Granite 4.0, cutting KV memory and roughly doubling inference speed at parity.",
      "whenToUse": "Production long-context models that need Transformer-level quality at much lower serving cost.",
      "refs": [
        {
          "t": "Nemotron-H",
          "u": "https://arxiv.org/abs/2504.03624"
        },
        {
          "t": "Jamba",
          "u": "https://arxiv.org/abs/2403.19887"
        }
      ]
    },
    {
      "id": "kv-cache",
      "label": "KV Cache",
      "type": "Architecture Component",
      "cluster": "architecture",
      "level": 2,
      "summary": "Cache past Key/Value tensors so each new token costs O(n) not O(n²) at inference.",
      "detail": "The dominant memory consumer during generation — its size is `2 × batch × layers × kv_heads × seq_len × head_dim × bytes`, and at long context it can rival or exceed the model weights. Tackled at three levels: serving (PagedAttention/vLLM, prefix caching), quantization/eviction (FP8/INT8/INT4 KV cache for 4–8× reduction — KIVI, KVQuant), and — most impactfully — architecture: Grouped-Query Attention (GQA) and Multi-head Latent Attention (MLA) shrink the cache by design. Not used in training.",
      "whenToUse": "Critical for deployment/serving cost reasoning."
    },
    {
      "id": "linear-attention",
      "label": "Linear Attention",
      "type": "Architecture Component",
      "cluster": "architecture",
      "level": 2,
      "summary": "Replace softmax attention with a kernel/recurrent form that is linear in sequence length and supports O(1) decoding.",
      "detail": "A family — RetNet, Gated Linear Attention (GLA), Gated DeltaNet, Lightning Attention — that reformulates attention so it can run in parallel, recurrent, or chunkwise modes with constant per-token state. Gated DeltaNet powers Qwen3-Next; Lightning Attention powers MiniMax-01. Newer sparse-attention work (NSA, DeepSeek Sparse Attention) is a related thread.",
      "whenToUse": "When you need attention-like quality with linear cost and constant-memory decoding.",
      "refs": [
        {
          "t": "Gated Linear Attention",
          "u": "https://arxiv.org/abs/2312.06635"
        }
      ]
    },
    {
      "id": "mamba",
      "label": "Mamba / State-Space Models (SSM)",
      "type": "Architecture Component",
      "cluster": "architecture",
      "level": 2,
      "summary": "Selective state-space sequence model with linear-time recurrence and constant memory per token — an attention-free alternative.",
      "detail": "SSMs (S4 → Mamba) model sequences with a learned recurrence instead of pairwise attention. Mamba adds input-dependent (selective) state updates and a hardware-aware parallel scan; Mamba-2's state-space duality (SSD) ties SSMs to linear attention and is the block used in most 2025 hybrids. Linear time, constant KV-free memory.",
      "whenToUse": "Very long sequences and high-throughput inference where the O(n²) attention cost dominates.",
      "refs": [
        {
          "t": "Mamba-2: Transformers are SSMs",
          "u": "https://arxiv.org/abs/2405.21060"
        }
      ]
    },
    {
      "id": "mla",
      "label": "Multi-head Latent Attention (MLA)",
      "type": "Architecture Component",
      "cluster": "architecture",
      "level": 2,
      "summary": "Compress keys/values into a shared low-rank latent vector — ~3–5× smaller KV cache than GQA at equal or better quality.",
      "detail": "Instead of caching full K/V per head, MLA jointly compresses them into a small latent that is cached and re-expanded at use. Gives a much larger effective state at a fraction of the memory. Core to DeepSeek-V2/V3 and adopted by Kimi and others.",
      "whenToUse": "When you want the strongest KV-cache reduction for long-context serving without GQA-level quality loss.",
      "refs": [
        {
          "t": "DeepSeek-V2",
          "u": "https://arxiv.org/abs/2405.04434"
        }
      ]
    },
    {
      "id": "moe",
      "label": "Mixture of Experts (MoE)",
      "type": "Architecture Component",
      "cluster": "architecture",
      "level": 2,
      "summary": "Replace the dense FFN with many expert MLPs; a router activates only a few per token.",
      "detail": "Sparsely-activated — e.g. 8 experts, top-2 routed (Mixtral), so total params are large but compute per token stays low. Decouples capacity from cost. The 2024–2026 standard recipe (DeepSeekMoE, Qwen3-MoE) adds fine-grained expert segmentation, shared always-on experts, and auxiliary-loss-free load balancing (a per-expert routing bias) to maximize specialization. Fine-tuning MoE is trickier (router load balancing, expert imbalance); PEFT can target experts or just attention.",
      "whenToUse": "Scale model capacity without proportional inference cost. Relevant when fine-tuning Mixtral/DeepSeek-MoE/Qwen-MoE.",
      "refs": [
        {
          "t": "Mixtral / Sparse MoE",
          "u": "https://arxiv.org/abs/2401.04088"
        },
        {
          "t": "DeepSeekMoE",
          "u": "https://arxiv.org/abs/2401.06066"
        }
      ]
    },
    {
      "id": "mqa",
      "label": "Multi-Query Attention (MQA)",
      "type": "Architecture Component",
      "cluster": "architecture",
      "level": 2,
      "summary": "Share a single key/value head across all query heads — extreme KV-cache compression at a modest quality cost.",
      "detail": "The endpoint of the MHA → GQA → MQA spectrum: one KV head for every query head, shrinking the KV cache the most and speeding decoding, with some quality loss. GQA is the balanced middle ground; MQA was used in PaLM and Falcon.",
      "whenToUse": "When KV-cache memory dominates and you can tolerate a small quality hit; understand it to place GQA/MLA.",
      "refs": [
        {
          "t": "Fast Transformer Decoding (MQA)",
          "u": "https://arxiv.org/abs/1911.02150"
        }
      ]
    },
    {
      "id": "multi-head",
      "label": "Multi-Head Attention",
      "type": "Architecture Component",
      "cluster": "architecture",
      "level": 2,
      "summary": "Run attention in parallel h times in subspaces, then concatenate — multiple \"relationship channels\".",
      "detail": "Each head can specialize (syntax, coreference, position). GQA/MQA reduce KV heads to save memory at inference, used in Llama-3, Mistral.",
      "whenToUse": "Target modules for PEFT are usually the per-head projection matrices."
    },
    {
      "id": "positional-encoding",
      "label": "Positional Encoding",
      "type": "Architecture Component",
      "cluster": "architecture",
      "level": 2,
      "summary": "Injects order information, since attention is otherwise permutation-invariant.",
      "detail": "Sinusoidal (original) → learned → RoPE (rotary, used in Llama/Mistral) → ALiBi. RoPE scaling (NTK, YaRN) is how short-context models get extended to long context.",
      "whenToUse": "Key to understanding context-window extension.",
      "refs": [
        {
          "t": "RoPE",
          "u": "https://arxiv.org/abs/2104.09864"
        }
      ]
    },
    {
      "id": "rms-norm",
      "label": "RMSNorm",
      "type": "Architecture Component",
      "cluster": "architecture",
      "level": 2,
      "summary": "Normalize activations by their root-mean-square only (no mean-centering) — cheaper than LayerNorm at equal quality.",
      "detail": "RMSNorm drops the mean-subtraction and bias of LayerNorm, rescaling by RMS with a learned gain. It is faster and the modern decoder default (Llama, Mistral, Qwen). LayerNorm (the original Transformer norm, per-token mean/variance + affine) remains the baseline contrast and is still used in encoders.",
      "whenToUse": "The normalization layer in essentially every current LLM; contrast with LayerNorm.",
      "refs": [
        {
          "t": "RMSNorm (Zhang & Sennrich)",
          "u": "https://arxiv.org/abs/1910.07468"
        }
      ]
    },
    {
      "id": "rope",
      "label": "Rotary Position Embeddings (RoPE)",
      "type": "Architecture Component",
      "cluster": "architecture",
      "level": 2,
      "summary": "Encode position as rotations applied to query/key vectors — relative-position aware and the basis for context-window extension.",
      "detail": "Rather than adding a position vector, RoPE rotates Q and K by an angle proportional to position, so attention naturally depends on *relative* offsets. It extrapolates better than learned/sinusoidal encodings and is the de-facto standard in Llama, Mistral, Qwen, and DeepSeek. RoPE scaling (NTK, YaRN, LongRoPE) is how short-context models get extended.",
      "whenToUse": "The positional scheme behind almost every modern decoder; key to understanding long-context extension.",
      "refs": [
        {
          "t": "RoPE (RoFormer)",
          "u": "https://arxiv.org/abs/2104.09864"
        }
      ]
    },
    {
      "id": "self-attention",
      "label": "Self-Attention",
      "type": "Architecture Component",
      "cluster": "architecture",
      "level": 2,
      "summary": "Attention where Q, K, V all come from the same sequence — tokens attend to each other.",
      "detail": "In decoders it is *causal* (masked): token t can only attend to ≤ t, enforcing autoregression. This mask is the difference between GPT-style and BERT-style attention.",
      "whenToUse": "Explains why decoders generate left-to-right and encoders see the whole sequence."
    },
    {
      "id": "sliding-window-attention",
      "label": "Sliding-Window Attention (SWA)",
      "type": "Architecture Component",
      "cluster": "architecture",
      "level": 2,
      "summary": "Each layer attends only to a fixed local window; stacked layers still propagate information far beyond it.",
      "detail": "Caps attention cost at O(n·w) instead of O(n²) by restricting each token to a window of recent tokens (e.g. 4096). Information flows further as it passes up the layer stack. Used in Mistral, Gemma 2, Phi-3, and GPT-OSS, often interleaved with full-attention layers.",
      "whenToUse": "Long sequences where most relevant context is local and you want linear-ish cost.",
      "refs": [
        {
          "t": "Mistral 7B",
          "u": "https://arxiv.org/abs/2310.06825"
        }
      ]
    },
    {
      "id": "swiglu",
      "label": "SwiGLU (Gated FFN)",
      "type": "Architecture Component",
      "cluster": "architecture",
      "level": 2,
      "summary": "A gated feed-forward block — SiLU(xW) ⊙ (xV) — that outperforms ReLU/GELU MLPs at equal parameter budget.",
      "detail": "SwiGLU replaces the FFN's single activation with a gated product: one linear branch passed through Swish/SiLU multiplies another linear branch. (The gate is SiLU, not sigmoid.) It is the FFN standard in Llama, Mistral, and Qwen; GELU is its smooth-ReLU predecessor from the BERT/GPT-2 era.",
      "whenToUse": "The FFN activation in modern decoders; a small architectural lever with consistent gains.",
      "refs": [
        {
          "t": "GLU Variants (Shazeer)",
          "u": "https://arxiv.org/abs/2002.05202"
        }
      ]
    },
    {
      "id": "transformer",
      "label": "Transformer",
      "type": "Architecture Component",
      "cluster": "architecture",
      "level": 2,
      "summary": "The backbone architecture: stacked blocks of attention + feed-forward, connected by residuals.",
      "detail": "\"Attention Is All You Need\" (2017). A block = (norm → Multi-Head Attention → residual) then (norm → FFN → residual). The **residual** (skip) connections are what let very deep stacks train stably; modern decoders use **pre-norm with RMSNorm** (not the original post-LayerNorm) and a SwiGLU FFN. Stack N blocks. Parallelizable over sequence (unlike RNNs), which is what made large-scale pretraining feasible.",
      "whenToUse": "The structure every modern LLM shares; fine-tuning targets its weight matrices.",
      "refs": [
        {
          "t": "Attention Is All You Need",
          "u": "https://arxiv.org/abs/1706.03762"
        }
      ]
    },
    {
      "id": "decoder-gpt",
      "label": "Decoder-only (GPT)",
      "type": "Model Archetype",
      "cluster": "modeltypes",
      "level": 2,
      "summary": "Causal, autoregressive. The dominant architecture for generative LLMs.",
      "detail": "GPT, Llama, Mistral, Claude, Gemini. Trained on next-token prediction; excels at generation, in-context learning, and chat. Almost all fine-tuning literature targets this family.",
      "whenToUse": "Default choice for any generative / chat / agent use case."
    },
    {
      "id": "enc-dec-t5",
      "label": "Encoder-Decoder (T5)",
      "type": "Model Archetype",
      "cluster": "modeltypes",
      "level": 2,
      "summary": "Encoder reads input, decoder generates output. Natural fit for seq-to-seq.",
      "detail": "T5, BART, FLAN-T5. Framed as text-to-text. Strong for translation, summarization. Largely superseded by decoder-only for general chat, but still competitive when fine-tuned for fixed transformations.",
      "whenToUse": "Structured input→output transforms (translation, summarization) with abundant paired data."
    },
    {
      "id": "encoder-bert",
      "label": "Encoder-only (BERT)",
      "type": "Model Archetype",
      "cluster": "modeltypes",
      "level": 2,
      "summary": "Bidirectional, trained with masked language modeling. Best for understanding, not generation.",
      "detail": "Sees the full sequence at once. Fine-tuned with a task head for classification, NER, embeddings (sentence-transformers). Cheaper than decoders for discriminative tasks.",
      "whenToUse": "Classification, retrieval embeddings, token tagging — not text generation.",
      "refs": [
        {
          "t": "BERT",
          "u": "https://arxiv.org/abs/1810.04805"
        }
      ]
    },
    {
      "id": "adaptation",
      "label": "Adaptation Spectrum",
      "type": "Adaptation Strategy",
      "cluster": "adaptation",
      "level": 3,
      "summary": "The ladder of options to steer a base model, ordered by cost & how much you change weights.",
      "detail": "Prompting (no weight change) → RAG (external knowledge, no weight change) → PEFT (few weights) → Full fine-tuning (all weights) → Continued pretraining (new base). Choose the *cheapest* rung that solves your problem.",
      "whenToUse": "The decision framework that organizes every technique below. Start at the top of the ladder."
    },
    {
      "id": "continued-pretraining",
      "label": "Continued Pretraining",
      "type": "Adaptation Strategy",
      "cluster": "adaptation",
      "level": 3,
      "summary": "More self-supervised pretraining on domain text (law, code, medicine) before any SFT.",
      "detail": "aka DAPT (domain-adaptive pretraining). Injects domain vocabulary and distributions into the base model. Followed by SFT + alignment. Used to make code/medical/legal base models.",
      "whenToUse": "Your domain language differs sharply from web text and you have lots of unlabeled domain corpus."
    },
    {
      "id": "cot",
      "label": "Chain-of-Thought",
      "type": "Adaptation Strategy",
      "cluster": "adaptation",
      "level": 3,
      "summary": "Prompt the model to reason step-by-step before answering — boosts reasoning accuracy.",
      "detail": "\"Let's think step by step.\" Variants: zero-shot CoT, self-consistency (sample many, vote), tree-of-thought. Note the 2024+ shift: CoT *prompting* elicits latent reasoning in a base model, whereas reasoning models (o1/o3, DeepSeek-R1) *acquire* reasoning via RL on reasoning traces — the long chain-of-thought is learned and emergent, not just prompted.",
      "whenToUse": "Math, logic, multi-step tasks. Can also become *training data* for reasoning fine-tunes.",
      "refs": [
        {
          "t": "CoT",
          "u": "https://arxiv.org/abs/2201.11903"
        }
      ]
    },
    {
      "id": "few-shot",
      "label": "Few-Shot / ICL",
      "type": "Adaptation Strategy",
      "cluster": "adaptation",
      "level": 3,
      "summary": "Put labeled examples in the prompt; the model infers the pattern (in-context learning).",
      "detail": "Emergent ability of large models — no gradient updates. Powerful but consumes context, is order-sensitive, and degrades vs. fine-tuning when you have many examples (>~50).",
      "whenToUse": "You have a few examples and want zero training. Beyond ~hundreds of examples, fine-tune instead."
    },
    {
      "id": "full-ft",
      "label": "Full Fine-Tuning",
      "type": "Adaptation Strategy",
      "cluster": "adaptation",
      "level": 3,
      "summary": "Update ALL weights on your data. Maximum capacity, maximum cost & risk.",
      "detail": "Highest quality ceiling but memory-hungry: weights + gradients + Adam optimizer state alone are ~16 bytes/param (e.g. ~128 GB for an 8B model) before activations, so realistic full fine-tuning needs 180 GB+ and multi-GPU sharding. It also risks catastrophic forgetting and produces a full-size checkpoint per task. PEFT (LoRA) and QLoRA now match it on most tasks at a fraction of the cost — QLoRA brings an 8B fine-tune down to ~40–50 GB.",
      "whenToUse": "Large domain shift, abundant data, and you have the GPUs. Otherwise prefer PEFT.",
      "code": "# AdamW on 8B params ≈ 8B*(2+4+4+4) bytes ≈ 112 GB VRAM"
    },
    {
      "id": "prompting",
      "label": "Prompting",
      "type": "Adaptation Strategy",
      "cluster": "adaptation",
      "level": 3,
      "summary": "Steer behavior purely via the input text — zero weight changes, instant iteration.",
      "detail": "Zero-shot, few-shot (in-context examples), system prompts. Leverages knowledge already in the model. Cheapest and fastest, but bounded by context window and cannot add new skills the base model lacks. As of 2025–2026 the field reframes production prompting as a subset of *context engineering* — engineering the whole context window (instructions + memory + retrieved facts + tool outputs), not just the wording of one prompt.",
      "whenToUse": "Always try first. If a well-crafted prompt solves it, you are done.",
      "code": "system: \"You are a SQL expert. Output only valid Postgres.\""
    },
    {
      "id": "rag",
      "label": "RAG",
      "type": "Adaptation Strategy",
      "cluster": "adaptation",
      "level": 3,
      "summary": "Retrieve relevant documents and inject them into the prompt — adds knowledge without training.",
      "detail": "Embed corpus → vector DB → retrieve top-k for a query → ground the answer. Updates instantly, cites sources, avoids stale weights. Does NOT teach new *skills* or *style* — only supplies *facts*. Often the right answer when people think they need fine-tuning.",
      "whenToUse": "Knowledge that changes often, needs citations, or is too large for the context window. Pairs well with a fine-tuned model.",
      "refs": [
        {
          "t": "RAG (Lewis 2020)",
          "u": "https://arxiv.org/abs/2005.11401"
        }
      ]
    },
    {
      "id": "react",
      "label": "ReAct / Tool Use",
      "type": "Adaptation Strategy",
      "cluster": "adaptation",
      "level": 3,
      "summary": "Interleave reasoning with tool/API calls — the basis of agents.",
      "detail": "Reason → Act (call tool) → Observe → repeat. Function calling is often itself fine-tuned into models. The bridge from a chat model to an agent.",
      "whenToUse": "When the model needs live data or to take actions. Often combined with RAG.",
      "refs": [
        {
          "t": "ReAct",
          "u": "https://arxiv.org/abs/2210.03629"
        }
      ]
    },
    {
      "id": "agent-memory",
      "label": "Agent Memory",
      "type": "Agent / Retrieval Method",
      "cluster": "agents",
      "level": 3,
      "summary": "Persistent long-term memory layers that page facts/preferences in and out of context across sessions — beyond stuffing full history into the window.",
      "detail": "Systems like MemGPT/Letta (OS-style tiered core/recall/archival memory via tool calls), Mem0 (vector+graph memory service), and Zep/Graphiti (bi-temporal knowledge-graph memory) give agents durable state. The standard \"four memory types\" framing: working, episodic, semantic, procedural — with a latency/cost gradient: working memory is in-context (~ms), semantic is an embedding lookup (10s–100s ms), and episodic/archival is timestamped storage (higher latency, more storage). Graphiti's bi-temporal graph also tracks *when* a fact was true vs. ingested, which flat vector memory can't.",
      "whenToUse": "Long-running or multi-session agents that must remember user facts, decisions, and history.",
      "refs": [
        {
          "t": "Mem0",
          "u": "https://arxiv.org/abs/2504.19413"
        }
      ]
    },
    {
      "id": "agentic-rag",
      "label": "Agentic RAG",
      "type": "Agent / Retrieval Method",
      "cluster": "agents",
      "level": 3,
      "summary": "RAG where an agent decides when, what, and how to retrieve — with planning, reflection, multi-hop, and tool use — instead of a fixed retrieve-then-read pipeline.",
      "detail": "Replaces single-shot retrieval with an agent loop that can reformulate queries, retrieve iteratively, verify, and combine sources — e.g. decompose a multi-part question into sub-questions, retrieve and check evidence for each, then synthesize. Self-RAG adds reflection tokens so the model decides *when* to retrieve and critiques what it got. Often trained with RL (e.g. Search-R1). The backbone of deep-research agents.",
      "whenToUse": "Complex, multi-step questions where one retrieval pass is not enough.",
      "refs": [
        {
          "t": "Agentic RAG: A Survey",
          "u": "https://arxiv.org/abs/2501.09136"
        }
      ]
    },
    {
      "id": "computer-use",
      "label": "Computer-Use / GUI Agents",
      "type": "Agent / Retrieval Method",
      "cluster": "agents",
      "level": 3,
      "summary": "Vision-language agents that operate real desktops/browsers via screenshots plus mouse/keyboard actions — general control beyond brittle RPA scripts.",
      "detail": "A screenshot → reason → act (click/type/scroll) loop, OS-agnostic at the pixel level (Claude Computer Use) or DOM-aware (Gemini). Evaluated on OSWorld and WebArena: as of 2025–2026 frontier agents reach roughly 40–60% on OSWorld (e.g. Claude Sonnet 4.5 ~61%) against a human baseline near 72% — improving fast but still trailing. The reliability gap is the honest story.",
      "whenToUse": "Automating GUI tasks that lack an API; expect to engineer for reliability.",
      "refs": [
        {
          "t": "OSWorld",
          "u": "https://os-world.github.io/"
        }
      ]
    },
    {
      "id": "context-engineering",
      "label": "Context Engineering",
      "type": "Agent / Retrieval Method",
      "cluster": "agents",
      "level": 3,
      "summary": "The discipline of assembling the right tokens — instructions, memory, retrieved facts, tool results — into the window for each step. \"Prompt engineering\" is now a subset.",
      "detail": "Popularized by Lütke and Karpathy (June 2025) and codified by Anthropic, this reframes prompting as a systems problem: dynamically curate and compact context (RAG, memory, tool outputs) to combat context rot and stay within effective length. Core techniques: prefix/KV caching of stable context; compaction (summarize-then-detail, drop low-relevance spans); sparse top-k retrieval instead of stuffing; goal-oriented selection and time-decay weighting of memory. Central to agent and RAG design in 2026.",
      "whenToUse": "Designing any non-trivial agent/RAG system — the whole context, not just the prompt wording, is what you optimize.",
      "refs": [
        {
          "t": "Effective Context Engineering (Anthropic)",
          "u": "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents"
        }
      ]
    },
    {
      "id": "graphrag",
      "label": "GraphRAG",
      "type": "Agent / Retrieval Method",
      "cluster": "agents",
      "level": 3,
      "summary": "Build an LLM-extracted entity/relationship knowledge graph plus community summaries to answer global, multi-hop \"sense-making\" queries vector RAG misses.",
      "detail": "Pipeline: (1) LLM extracts entities & relationships from chunks; (2) build a graph with entity-resolution/dedup; (3) detect communities (e.g. Leiden clustering); (4) LLM writes community summaries — so the agent can traverse relationships and answer global \"what are the themes?\" questions rather than only matching nearby chunks. The catch is indexing cost; Microsoft's LazyGraphRAG slashes it by orders of magnitude.",
      "whenToUse": "Global or multi-hop questions (\"what are the themes across this corpus?\") that flat vector RAG answers poorly.",
      "refs": [
        {
          "t": "Microsoft GraphRAG",
          "u": "https://www.microsoft.com/en-us/research/project/graphrag/"
        }
      ]
    },
    {
      "id": "hybrid-retrieval",
      "label": "Hybrid Retrieval",
      "type": "Agent / Retrieval Method",
      "cluster": "agents",
      "level": 3,
      "summary": "Combine dense (embedding) and lexical (BM25) retrieval — and sometimes structured queries — via fusion (RRF) for better recall and precision.",
      "detail": "Dense retrieval captures semantics but misses exact terms/rare tokens; BM25 nails lexical matches but not paraphrase. Hybrid retrieval runs both and fuses results (Reciprocal Rank Fusion or learned routing), often followed by a reranker. Production-standard for robust RAG; Anthropic's Contextual Retrieval is a strong recipe.",
      "whenToUse": "Almost any production RAG system — hybrid + rerank is the reliable default.",
      "refs": [
        {
          "t": "Contextual Retrieval (Anthropic)",
          "u": "https://www.anthropic.com/news/contextual-retrieval"
        }
      ]
    },
    {
      "id": "mcp",
      "label": "Model Context Protocol (MCP)",
      "type": "Agent / Retrieval Method",
      "cluster": "agents",
      "level": 3,
      "summary": "An open standard (\"USB-C for AI\") for connecting LLM agents to tools and data via a JSON-RPC client/server interface — now the de-facto tool-interop layer.",
      "detail": "Introduced by Anthropic (Nov 2024); each tool publishes a machine-readable description so agents discover and invoke it without bespoke integrations. Adopted by OpenAI, Google, and Microsoft through 2025 and donated to the Linux Foundation's Agentic AI Foundation (Dec 2025). Complemented by agent-to-agent protocols like A2A.",
      "whenToUse": "Building agents that must connect to many tools/data sources in a portable, standard way.",
      "refs": [
        {
          "t": "Model Context Protocol (Anthropic)",
          "u": "https://www.anthropic.com/news/model-context-protocol"
        }
      ]
    },
    {
      "id": "retrieval-reranking",
      "label": "Retrieval Reranking",
      "type": "Agent / Retrieval Method",
      "cluster": "agents",
      "level": 3,
      "summary": "A second stage that re-scores first-stage retrieval candidates for relevance — cross-encoders, ColBERT late interaction, or LLM listwise rerankers.",
      "detail": "First-stage dense/BM25 retrieval favors recall; a reranker (joint query-document cross-encoder, or token-level late-interaction like ColBERT/ColPali) restores precision, typically +5–15 nDCG. Standard in production RAG and a cheap accuracy lever.",
      "whenToUse": "Almost always worth adding to a RAG pipeline to lift answer grounding quality.",
      "refs": [
        {
          "t": "ColBERT",
          "u": "https://arxiv.org/abs/2004.12832"
        }
      ]
    },
    {
      "id": "agentic-eval",
      "label": "Agentic & Contamination-Resistant Eval",
      "type": "Practice",
      "cluster": "dataeval",
      "level": 3,
      "summary": "Modern evaluation: agent task benchmarks (SWE-bench Verified, GAIA, τ-bench, WebArena) and contamination-limited, frequently-refreshed suites (LiveBench, ARC-AGI-2).",
      "detail": "As MMLU/GSM8K saturated and contamination grew, eval shifted to (1) verifiable agent tasks — resolving real GitHub issues (SWE-bench Verified), tool-use QA (GAIA), tool-agent-user dialogue (τ-bench); and (2) fresh, objectively-scored sets that resist leakage (LiveBench monthly, ARC-AGI-2, FrontierMath, GPQA-Diamond, Humanity's Last Exam).",
      "whenToUse": "Choosing benchmarks in 2026 — prefer agentic and contamination-resistant signals over saturated classics.",
      "refs": [
        {
          "t": "SWE-bench Verified (OpenAI)",
          "u": "https://openai.com/index/introducing-swe-bench-verified/"
        },
        {
          "t": "LiveBench",
          "u": "https://arxiv.org/abs/2406.19314"
        }
      ]
    },
    {
      "id": "benchmarks",
      "label": "Benchmarks",
      "type": "Practice",
      "cluster": "dataeval",
      "level": 3,
      "summary": "Standardized tests (MMLU, GSM8K, HumanEval, IFEval) for comparable capability signals.",
      "detail": "Useful for regression detection and capability tracking, but prone to contamination and overfitting. Pick by family: reasoning/knowledge (MMLU → GPQA-Diamond; GSM8K → AIME / FrontierMath), code (HumanEval → SWE-bench Verified), tool-use/agentic (GAIA, τ-bench), multimodal (MMBench / MMMU) — each with its own saturation level and contamination risk. The classics (MMLU, GSM8K, HumanEval) are largely saturated by 2026 frontier models; current signals come from harder, contamination-resistant, and agentic suites — see Agentic & Contamination-Resistant Eval. Necessary, not sufficient — pair with task-specific and human eval.",
      "whenToUse": "Track general capability and detect catastrophic forgetting after fine-tuning."
    },
    {
      "id": "contamination-detection",
      "label": "Benchmark Contamination Detection",
      "type": "Practice",
      "cluster": "dataeval",
      "level": 3,
      "summary": "Detecting train/test leakage (string, n-gram, or embedding overlap; membership-inference) and decontaminating — a first-class honesty concern in 2026 eval.",
      "detail": "As benchmarks leak into pretraining corpora, scores inflate. Detection ranges from exact/n-gram and embedding overlap to membership-inference probes; remediation means decontaminating training data and preferring fresh, contamination-limited benchmarks (LiveBench, time-windowed sets). Always report decontamination methodology.",
      "whenToUse": "Whenever you trust a benchmark number — verify it is not contaminated.",
      "refs": [
        {
          "t": "LiveBench (contamination-limited)",
          "u": "https://arxiv.org/abs/2406.19314"
        }
      ]
    },
    {
      "id": "dataset-prep",
      "label": "Dataset Curation",
      "type": "Practice",
      "cluster": "dataeval",
      "level": 3,
      "summary": "The highest-leverage step: quality, diversity, and de-duplication beat raw volume.",
      "detail": "\"Quality is all you need\" (LIMA: 1k great examples > 50k mediocre). The modern pretraining pipeline: near-duplicate removal (MinHash/LSH, then semantic SemDeDup), model-based quality filtering (FineWeb-Edu / DCLM classifiers — see Model-Based Data Filtering), decontamination against eval sets, balancing, and correct formatting. Garbage in → garbage fine-tune.",
      "whenToUse": "Before any SFT/preference run. Spend most of your effort here.",
      "refs": [
        {
          "t": "LIMA",
          "u": "https://arxiv.org/abs/2305.11206"
        }
      ]
    },
    {
      "id": "evaluation",
      "label": "Evaluation",
      "type": "Practice",
      "cluster": "dataeval",
      "level": 3,
      "summary": "Measure what fine-tuning actually changed — accuracy, regressions, safety.",
      "detail": "Held-out task metrics + general benchmarks (to catch forgetting) + human/LLM judgments. Four pillars: (1) a **held-out test set** (decontaminated, stratified, never trained on); (2) **regression detection** — a fixed before/after suite to catch what the fine-tune broke; (3) **task-specific metrics** — accuracy / F1 / exact-match / perplexity per domain; (4) **open-ended quality** via human or LLM-as-judge. Always keep the eval set decontaminated from training data. \"Vibes\" are not evaluation.",
      "whenToUse": "Before and after every training run; the only way to know if it helped."
    },
    {
      "id": "llm-as-judge",
      "label": "LLM-as-Judge",
      "type": "Practice",
      "cluster": "dataeval",
      "level": 3,
      "summary": "Use a strong model to score/compare outputs — scalable proxy for human eval.",
      "detail": "Pairwise or rubric scoring (MT-Bench, AlpacaEval). Advances: rubric/chain-of-thought scoring (G-Eval) and panels of diverse judges (PoLL) instead of one judge. Watch known biases: position, verbosity, self-preference, and \"preference leakage\" (a judge favoring models trained on its own outputs) — mitigate with position-swapping and calibration against a human-labeled subset. Where ground truth is checkable, prefer verifiable benchmarks (LiveBench, RLVR-style) over a judge.",
      "whenToUse": "Fast, cheap eval of open-ended generation when human eval does not scale.",
      "refs": [
        {
          "t": "MT-Bench / Judge",
          "u": "https://arxiv.org/abs/2306.05685"
        }
      ]
    },
    {
      "id": "model-based-filtering",
      "label": "Model-Based Data Filtering",
      "type": "Practice",
      "cluster": "dataeval",
      "level": 3,
      "summary": "Use a trained classifier (fastText or LLM-distilled) to score and select pretraining documents by quality — the dominant lever for data quality.",
      "detail": "Replaces heuristic/perplexity-only cleaning. FineWeb-Edu scores \"educational quality\" to match performance on ~10× fewer tokens; DataComp-LM (DCLM) standardized model-based filtering as a benchmark. Paired with dedup (MinHash/LSH, SemDeDup) and synthetic rephrasing (WRAP, Nemotron-CC).",
      "whenToUse": "Curating any large pretraining or domain corpus — spend effort here before scaling tokens.",
      "refs": [
        {
          "t": "FineWeb / FineWeb-Edu",
          "u": "https://arxiv.org/abs/2406.17557"
        },
        {
          "t": "DataComp-LM",
          "u": "https://arxiv.org/abs/2406.11794"
        }
      ]
    },
    {
      "id": "model-collapse",
      "label": "Model Collapse",
      "type": "Practice",
      "cluster": "dataeval",
      "level": 3,
      "summary": "Recursively training on model-generated data erodes distribution tails, causing irreversible quality degradation — the core caution for synthetic data.",
      "detail": "When models learn mostly from prior models' outputs, rare patterns vanish and quality decays generation over generation. Mitigations: anchor on accumulated real data (not replacement), and verify/filter synthetic samples before training.",
      "whenToUse": "Any pipeline leaning heavily on synthetic data — keep a real-data anchor and verification step.",
      "refs": [
        {
          "t": "AI models collapse on recursive data (Nature 2024)",
          "u": "https://www.nature.com/articles/s41586-024-07566-y"
        }
      ]
    },
    {
      "id": "preference-data",
      "label": "Preference Data Collection",
      "type": "Practice",
      "cluster": "dataeval",
      "level": 3,
      "summary": "Gathering the chosen/rejected comparisons that drive RLHF/DPO — by humans (pairwise/ranked) or by AI (RLAIF/constitutional).",
      "detail": "Alignment quality is capped by preference-data quality. Methods: pairwise comparisons, ranked lists, and rating scales from human annotators; or AI-generated preferences (RLAIF) guided by a constitution. Concerns: annotator agreement, coverage, and reward-model evaluation (RewardBench) of the resulting signal.",
      "whenToUse": "Before any RLHF/DPO/KTO run — this data, not the algorithm, usually determines the ceiling.",
      "refs": [
        {
          "t": "InstructGPT (preference pipeline)",
          "u": "https://arxiv.org/abs/2203.02155"
        }
      ]
    },
    {
      "id": "synthetic-data",
      "label": "Synthetic Data",
      "type": "Practice",
      "cluster": "dataeval",
      "level": 3,
      "summary": "Generate training data with a stronger model (self-instruct, Evol-Instruct, distillation).",
      "detail": "Bootstraps datasets cheaply (Alpaca, WizardLM, Orca). By 2025–2026 it became a *pretraining* tool too, not just instruction data: rephrasing web text (WRAP, Nemotron-CC) for ~3× speedups, persona-conditioned generation (Persona Hub, ~1B personas) for diversity, and reasoning-trace distillation from frontier reasoners (R1). Must filter for quality and watch licensing/model-output terms; over-reliance risks model collapse (distribution-tail erosion) — anchor on real data and verify samples.",
      "whenToUse": "You lack labeled data and have access to a capable teacher model.",
      "refs": [
        {
          "t": "Self-Instruct",
          "u": "https://arxiv.org/abs/2212.10560"
        }
      ]
    },
    {
      "id": "context-extension",
      "label": "Context-Window Extension",
      "type": "Concept",
      "cluster": "foundations",
      "level": 4,
      "summary": "Stretch a model's usable context far past its trained length by rescaling RoPE positions, usually with brief fine-tuning.",
      "detail": "Methods rescale rotary position encodings so out-of-range positions stay in distribution: Position Interpolation, NTK-aware, YaRN (now common in Qwen), and LongRoPE (claims 2M+, used in Phi-3). LongLoRA adds shifted-sparse attention so the extension can be learned cheaply with LoRA. Crucial caveat: extending the *window* doesn't guarantee usable recall — advertised length ≠ effective length (see Long-Context Limitations; RULER/NoLiMa), so treat headline numbers like LongRoPE's 2M with skepticism.",
      "whenToUse": "You need a longer window than the base model was trained for and can afford a short fine-tune.",
      "code": "rope_scaling = {\"type\": \"yarn\", \"factor\": 4.0, \"original_max_position_embeddings\": 8192}",
      "refs": [
        {
          "t": "YaRN",
          "u": "https://arxiv.org/abs/2309.00071"
        },
        {
          "t": "LongRoPE",
          "u": "https://arxiv.org/abs/2402.13753"
        }
      ]
    },
    {
      "id": "adalora",
      "label": "AdaLoRA",
      "type": "PEFT Method",
      "cluster": "peft",
      "level": 4,
      "summary": "Adaptively allocate the rank budget across layers via SVD — important layers get more rank.",
      "detail": "Prunes singular values during training so the parameter budget concentrates where it helps most, rather than a uniform rank everywhere.",
      "whenToUse": "Fixed small budget and you want it spent optimally across layers.",
      "refs": [
        {
          "t": "AdaLoRA",
          "u": "https://arxiv.org/abs/2303.10512"
        }
      ]
    },
    {
      "id": "adapters",
      "label": "Adapter Layers",
      "type": "PEFT Method",
      "cluster": "peft",
      "level": 4,
      "summary": "Insert tiny bottleneck MLP modules between transformer layers; train only those.",
      "detail": "The original PEFT method (Houlsby 2019). Down-project → nonlinearity → up-project, with a residual. Adds a small inference cost (not mergeable like LoRA), but very modular: adapters can be composed via AdapterFusion and combined across tasks/languages (MAD-X), and shared through hubs like AdapterHub.",
      "whenToUse": "Multi-task setups needing composable, stackable task modules.",
      "refs": [
        {
          "t": "Adapters",
          "u": "https://arxiv.org/abs/1902.00751"
        }
      ]
    },
    {
      "id": "bitfit",
      "label": "BitFit",
      "type": "PEFT Method",
      "cluster": "peft",
      "level": 4,
      "summary": "Train only the bias terms — a tiny selective baseline that is surprisingly competitive.",
      "detail": "Updates ~0.1% of params (just biases). A useful sanity baseline and instructive about how little needs to change to adapt a model.",
      "whenToUse": "Quick baseline; ultra-low-resource adaptation.",
      "refs": [
        {
          "t": "BitFit",
          "u": "https://arxiv.org/abs/2106.10199"
        }
      ]
    },
    {
      "id": "dora",
      "label": "DoRA",
      "type": "PEFT Method",
      "cluster": "peft",
      "level": 4,
      "summary": "Weight-Decomposed LoRA: split W into magnitude + direction, LoRA-adapt the direction.",
      "detail": "Decomposes pretrained weights into magnitude and directional components; applies low-rank updates to direction while learning magnitude separately. Closes much of the remaining gap to full-FT, especially at low rank. ~Same inference cost as LoRA after merge.",
      "whenToUse": "You want a bit more quality than LoRA at low rank and can afford slightly more training cost.",
      "code": "LoraConfig(r=16, use_dora=True, target_modules=[...])",
      "refs": [
        {
          "t": "DoRA",
          "u": "https://arxiv.org/abs/2402.09353"
        }
      ]
    },
    {
      "id": "ia3",
      "label": "(IA)³",
      "type": "PEFT Method",
      "cluster": "peft",
      "level": 4,
      "summary": "Learn tiny per-feature scaling vectors that rescale keys, values, and FFN activations.",
      "detail": "Even fewer parameters than LoRA; multiplies activations by learned vectors. Used in the T-Few recipe for strong few-shot results.",
      "whenToUse": "Extreme parameter efficiency / few-shot fine-tuning.",
      "refs": [
        {
          "t": "(IA)³ / T-Few",
          "u": "https://arxiv.org/abs/2205.05638"
        }
      ]
    },
    {
      "id": "layer-freezing",
      "label": "Layer Freezing",
      "type": "PEFT Method",
      "cluster": "peft",
      "level": 4,
      "summary": "Freeze lower layers, fine-tune only the top few — simplest selective method.",
      "detail": "Lower layers hold general features, upper layers are task-specific. Freezing reduces compute and forgetting. Common with BERT classification heads.",
      "whenToUse": "Small datasets, classification heads, limited compute."
    },
    {
      "id": "lora",
      "label": "LoRA",
      "type": "PEFT Method",
      "cluster": "peft",
      "level": 4,
      "summary": "Freeze W; learn a low-rank update ΔW = B·A (rank r ≪ d). The workhorse of PEFT.",
      "detail": "Trains two small matrices per target layer; merges into W at inference for zero added latency. Knobs: rank r (8–64), alpha (scaling), target_modules, dropout. Adapters are swappable and only a few MB each. For more quality at low rank see **DoRA** (weight decomposition); for faster, better convergence see **PiSSA**/**LoRA-GA** (smarter initialization), **rsLoRA** (rank-stable scaling), and **LoRA+** (higher LR on B).",
      "whenToUse": "Your default PEFT method. Cheap, mergeable, composable, well-supported.",
      "code": "from peft import LoraConfig\nLoraConfig(r=16, lora_alpha=32, lora_dropout=0.05,\n  target_modules=[\"q_proj\",\"k_proj\",\"v_proj\",\"o_proj\"], task_type=\"CAUSAL_LM\")",
      "refs": [
        {
          "t": "LoRA",
          "u": "https://arxiv.org/abs/2106.09685"
        }
      ]
    },
    {
      "id": "p-tuning",
      "label": "P-Tuning (v2)",
      "type": "PEFT Method",
      "cluster": "peft",
      "level": 4,
      "summary": "Soft prompts inserted at multiple layers via a small prompt encoder; strong on NLU.",
      "detail": "v2 applies deep prompts across layers (like prefix tuning) and matches full-FT on understanding tasks across scales.",
      "whenToUse": "BERT-style understanding tasks where you want PEFT to match full-FT.",
      "refs": [
        {
          "t": "P-Tuning v2",
          "u": "https://arxiv.org/abs/2110.07602"
        }
      ]
    },
    {
      "id": "peft",
      "label": "PEFT",
      "type": "PEFT Method",
      "cluster": "peft",
      "level": 4,
      "summary": "Parameter-Efficient Fine-Tuning: update <1% of weights, match full-FT quality cheaply.",
      "detail": "Three families — Additive (inject new params: adapters, prompts), Reparameterization (low-rank deltas: LoRA), Selective (train a subset: BitFit). Slashes VRAM, storage (MBs per task), and enables many task-specific adapters over one frozen base.",
      "whenToUse": "The default modern fine-tuning approach. Start with LoRA/QLoRA.",
      "refs": [
        {
          "t": "PEFT survey",
          "u": "https://arxiv.org/abs/2403.14608"
        }
      ]
    },
    {
      "id": "pissa",
      "label": "PiSSA (Principal Singular-Value Init)",
      "type": "PEFT Method",
      "cluster": "peft",
      "level": 4,
      "summary": "Initialize the LoRA A/B matrices from the principal singular vectors of W (via SVD) and freeze the residual — much faster convergence than random init.",
      "detail": "Vanilla LoRA starts adapters from noise/zero; PiSSA starts them from the dominant directions of the pretrained weight, so training begins aligned with what matters (e.g. 72.9% vs 67.7% GSM8K on Mistral-7B). First-class in HuggingFace PEFT (init_lora_weights=\"pissa\"). Related inits: OLoRA, LoRA-GA, CorDA; LoftQ does the same for quantized bases.",
      "whenToUse": "Drop-in LoRA upgrade when you want faster, higher convergence at no inference cost.",
      "code": "LoraConfig(r=16, init_lora_weights=\"pissa\", target_modules=[...])",
      "refs": [
        {
          "t": "PiSSA",
          "u": "https://arxiv.org/abs/2404.02948"
        }
      ]
    },
    {
      "id": "prefix-tuning",
      "label": "Prefix Tuning",
      "type": "PEFT Method",
      "cluster": "peft",
      "level": 4,
      "summary": "Prepend trainable \"virtual\" key/value vectors to every attention layer; freeze the model.",
      "detail": "Learns continuous task-specific prefixes in activation space at each layer. More expressive than prompt tuning (which only touches the input layer).",
      "whenToUse": "Generation tasks where you want deeper steering than input-only soft prompts.",
      "refs": [
        {
          "t": "Prefix-Tuning",
          "u": "https://arxiv.org/abs/2101.00190"
        }
      ]
    },
    {
      "id": "prompt-tuning",
      "label": "Prompt Tuning",
      "type": "PEFT Method",
      "cluster": "peft",
      "level": 4,
      "summary": "Learn a handful of soft (continuous) prompt embeddings prepended to the input only.",
      "detail": "The most parameter-light PEFT — just a few thousand params. Most effective at large scale (13B+); on sub-1B models it needs careful tuning and trails LoRA, becoming competitive around 3–7B with good initialization. \"The power of scale for parameter-efficient prompt tuning.\"",
      "whenToUse": "Very large frozen model, many tasks, minimal storage. Weak on small models.",
      "refs": [
        {
          "t": "Prompt Tuning",
          "u": "https://arxiv.org/abs/2104.08691"
        }
      ]
    },
    {
      "id": "qlora",
      "label": "QLoRA",
      "type": "PEFT Method",
      "cluster": "peft",
      "level": 4,
      "summary": "LoRA on a 4-bit quantized frozen base — fine-tune a 65B model on a single 48GB GPU.",
      "detail": "Combines 4-bit NormalFloat (NF4) quantization, double quantization, and paged optimizers with LoRA adapters trained in bf16. Near-zero quality loss vs. 16-bit LoRA. Democratized fine-tuning of large models. Pair with **LoftQ** initialization to close the remaining gap to full-precision fine-tuning, especially at very low bit-widths.",
      "whenToUse": "You are VRAM-constrained and want to fine-tune a big model on consumer/single GPU.",
      "code": "from transformers import BitsAndBytesConfig\nBitsAndBytesConfig(load_in_4bit=True, bnb_4bit_quant_type=\"nf4\",\n  bnb_4bit_compute_dtype=\"bfloat16\", bnb_4bit_use_double_quant=True)",
      "refs": [
        {
          "t": "QLoRA",
          "u": "https://arxiv.org/abs/2305.14314"
        }
      ]
    },
    {
      "id": "reft",
      "label": "ReFT (Representation Fine-Tuning)",
      "type": "PEFT Method",
      "cluster": "peft",
      "level": 4,
      "summary": "Learn lightweight interventions on frozen hidden-state representations instead of editing weights — reportedly 15–65× more parameter-efficient than LoRA.",
      "detail": "ReFT (e.g. LoReFT) leaves all weights frozen and instead trains small interventions on activations in a low-rank subspace at selected layers/positions. A different paradigm from weight-delta PEFT (LoRA family), it is highly parameter-efficient and composable with LoRA.",
      "whenToUse": "You want maximal parameter efficiency or to steer behavior via representations rather than weights.",
      "refs": [
        {
          "t": "ReFT (Wu et al)",
          "u": "https://arxiv.org/abs/2404.03592"
        }
      ]
    },
    {
      "id": "rslora",
      "label": "rsLoRA (Rank-Stabilized LoRA)",
      "type": "PEFT Method",
      "cluster": "peft",
      "level": 4,
      "summary": "Scale LoRA by α/√r instead of α/r so higher ranks actually help instead of collapsing gradients.",
      "detail": "Vanilla LoRA's α/r scaling makes large ranks underperform; the √r correction stabilizes gradients so increasing rank reliably improves quality. A one-flag change (use_rslora=True) in HuggingFace PEFT.",
      "whenToUse": "Any time you want to use larger LoRA ranks without the usual plateau.",
      "code": "LoraConfig(r=64, lora_alpha=16, use_rslora=True, target_modules=[...])",
      "refs": [
        {
          "t": "Rank-Stabilized LoRA",
          "u": "https://arxiv.org/abs/2312.03732"
        }
      ]
    },
    {
      "id": "vera",
      "label": "VeRA (Vector-based Random Matrix Adaptation)",
      "type": "PEFT Method",
      "cluster": "peft",
      "level": 4,
      "summary": "Freeze a single pair of random low-rank matrices shared across all layers and train only tiny per-layer scaling vectors — ~10× fewer params than LoRA.",
      "detail": "VeRA fixes one random A/B pair (shared everywhere) and learns only small per-layer scaling vectors, slashing trainable parameters (and checkpoint size) by roughly 10× versus LoRA at comparable quality. Useful when serving many task adapters cheaply. Supported in HuggingFace PEFT.",
      "whenToUse": "Extreme parameter/storage efficiency across many tasks, especially on large frozen models.",
      "refs": [
        {
          "t": "VeRA",
          "u": "https://arxiv.org/abs/2310.11454"
        }
      ]
    },
    {
      "id": "chat-template",
      "label": "Chat Templates & Data Format",
      "type": "Training Method",
      "cluster": "sft",
      "level": 4,
      "summary": "The exact token format (roles, special tokens) the model expects for multi-turn chat.",
      "detail": "ChatML / Llama / Mistral templates wrap turns with special tokens (<|im_start|>, [INST]). Getting this wrong silently wrecks fine-tuning. Loss-masking ensures you train on assistant tokens only.",
      "whenToUse": "Always — correct templating is the #1 source of silent fine-tuning bugs.",
      "code": "tokenizer.apply_chat_template(messages, tokenize=False)"
    },
    {
      "id": "instruction-tuning",
      "label": "Instruction Tuning",
      "type": "Training Method",
      "cluster": "sft",
      "level": 4,
      "summary": "SFT on diverse (instruction → response) data so the model follows arbitrary instructions.",
      "detail": "FLAN, Alpaca, etc. Generalizes to unseen instructions. The difference between a raw base model and a usable \"instruct\" model.",
      "whenToUse": "Turn a base model into a general instruction-follower before specializing.",
      "refs": [
        {
          "t": "FLAN",
          "u": "https://arxiv.org/abs/2109.01652"
        }
      ]
    },
    {
      "id": "sft",
      "label": "Supervised Fine-Tuning",
      "type": "Training Method",
      "cluster": "sft",
      "level": 4,
      "summary": "Train on (prompt, ideal-response) pairs with next-token loss on the response tokens.",
      "detail": "The first post-pretraining step. Loss is masked to the assistant turn only. Teaches format, task behavior, and tone. Can be done full-FT or (usually) via LoRA/QLoRA. Quality of data >> quantity.",
      "whenToUse": "You have demonstrations of the behavior you want. The foundation before any preference alignment.",
      "code": "# TRL SFTTrainer\nfrom trl import SFTTrainer\nSFTTrainer(model, train_dataset=ds, peft_config=lora_cfg, args=...)",
      "refs": [
        {
          "t": "InstructGPT",
          "u": "https://arxiv.org/abs/2203.02155"
        }
      ]
    },
    {
      "id": "awq",
      "label": "AWQ",
      "type": "Efficiency Technique",
      "cluster": "efficiency",
      "level": 4,
      "summary": "Activation-aware quantization — protect the ~1% salient weights to preserve accuracy at 4-bit.",
      "detail": "Scales weights by activation magnitude before quantizing. Often beats GPTQ on accuracy and inference speed.",
      "whenToUse": "High-quality 4-bit inference, especially on edge/serving.",
      "refs": [
        {
          "t": "AWQ",
          "u": "https://arxiv.org/abs/2306.00978"
        }
      ]
    },
    {
      "id": "bitsandbytes",
      "label": "bitsandbytes (NF4/INT8)",
      "type": "Efficiency Technique",
      "cluster": "efficiency",
      "level": 4,
      "summary": "The library providing 8-bit optimizers and 4-bit NF4 quantization used by QLoRA.",
      "detail": "LLM.int8() for inference, NF4 + double-quant for training. The practical backbone of memory-efficient fine-tuning in HuggingFace.",
      "whenToUse": "Implementing QLoRA / loading big models in 4–8 bit."
    },
    {
      "id": "distillation",
      "label": "Knowledge Distillation",
      "type": "Efficiency Technique",
      "cluster": "efficiency",
      "level": 4,
      "summary": "Train a small \"student\" to mimic a large \"teacher\" — compress capability into a cheaper model.",
      "detail": "Match teacher logits (soft labels) and/or generate synthetic data from the teacher (sequence-level distillation, e.g. Alpaca from GPT). DistilBERT, Zephyr. Trades a little quality for big speed/cost wins.",
      "whenToUse": "You need the behavior of a big model at the cost of a small one.",
      "refs": [
        {
          "t": "Distillation",
          "u": "https://arxiv.org/abs/1503.02531"
        }
      ]
    },
    {
      "id": "fp8-training",
      "label": "FP8 Training & Inference",
      "type": "Efficiency Technique",
      "cluster": "efficiency",
      "level": 4,
      "summary": "8-bit floating point (E4M3/E5M2) — the default production precision on Hopper/Blackwell, validated for training at 600B+ scale.",
      "detail": "FP8 halves memory and roughly doubles throughput vs BF16 while keeping enough range/precision for stable training with per-tensor or blockwise scaling. DeepSeek-V3 demonstrated native blockwise FP8 training at 671B parameters; FP8 inference is now standard in serving stacks.",
      "whenToUse": "Default training/inference precision on modern datacenter GPUs when kernels support it.",
      "refs": [
        {
          "t": "DeepSeek-V3 Technical Report",
          "u": "https://arxiv.org/abs/2412.19437"
        }
      ]
    },
    {
      "id": "galore",
      "label": "GaLore (Gradient Low-Rank Projection)",
      "type": "Efficiency Technique",
      "cluster": "efficiency",
      "level": 4,
      "summary": "Project gradients/optimizer state into a periodically-recomputed low-rank subspace — memory-efficient *full-parameter* training, not an adapter.",
      "detail": "Unlike LoRA (which restricts the weight update to low rank), GaLore keeps full-rank weight updates but compresses the optimizer state by projecting gradients onto a low-rank subspace, cutting optimizer memory up to ~65%. Lets you full-fine-tune a 7B model on a single consumer GPU. Choosing among low-memory full-FT optimizers: **GaLore** is the general baseline; **LOMO/AdaLOMO** push memory/wall-clock lower (AdaLOMO adds adaptive scaling); **Fira** targets very large models; **APOLLO** cheaply approximates Adam's state; **BAdam** does block-wise updates.",
      "whenToUse": "You want full-FT quality but are optimizer-memory-bound and LoRA's low-rank limit is hurting.",
      "refs": [
        {
          "t": "GaLore",
          "u": "https://arxiv.org/abs/2403.03507"
        }
      ]
    },
    {
      "id": "gptq",
      "label": "GPTQ",
      "type": "Efficiency Technique",
      "cluster": "efficiency",
      "level": 4,
      "summary": "One-shot PTQ to 3–4 bit using second-order (Hessian) info to minimize error.",
      "detail": "Layer-by-layer weight quantization with error compensation. Fast, accurate 4-bit for inference. Popular for serving.",
      "whenToUse": "Quantize a trained model for efficient GPU inference.",
      "refs": [
        {
          "t": "GPTQ",
          "u": "https://arxiv.org/abs/2210.17323"
        }
      ]
    },
    {
      "id": "gradient-checkpointing",
      "label": "Gradient Checkpointing",
      "type": "Efficiency Technique",
      "cluster": "efficiency",
      "level": 4,
      "summary": "Trade compute for memory: recompute activations in the backward pass instead of storing them.",
      "detail": "Cuts activation memory dramatically (~√n), enabling larger batches/sequences/models at ~20–30% more compute. Standard in QLoRA recipes.",
      "whenToUse": "You hit OOM on activations during fine-tuning.",
      "code": "model.gradient_checkpointing_enable()"
    },
    {
      "id": "mixed-precision",
      "label": "Mixed Precision (bf16/fp16)",
      "type": "Efficiency Technique",
      "cluster": "efficiency",
      "level": 4,
      "summary": "Train in 16-bit to halve memory and double throughput, with key ops kept in fp32.",
      "detail": "bf16 (wider range, no loss scaling) is the standard training precision on modern datacenter GPUs (H100/H200, Blackwell, and accelerators like Trainium and Gaudi); A100/H100 remain widely deployed, with fp32 kept for stability-critical ops (norms, softmax, loss). The 2025–2026 frontier pushes further to FP8 and FP4 (see those nodes). Foundational training optimization beneath everything else.",
      "whenToUse": "Essentially always for training on modern GPUs."
    },
    {
      "id": "mxfp4",
      "label": "FP4 Microscaling (MXFP4 / NVFP4)",
      "type": "Efficiency Technique",
      "cluster": "efficiency",
      "level": 4,
      "summary": "4-bit floating point with block-shared scales — native on Blackwell, used both for inference and increasingly for training.",
      "detail": "MXFP4 (OCP standard): E2M1 values in blocks of 32 sharing an E8M0 scale. NVFP4 is NVIDIA's finer-grained variant (16-element blocks, two-level FP8+FP32 scaling) — do not conflate the two. FP4 gives ~2–3× the arithmetic throughput and ~half the memory of FP8; MXFP4 is the checkpoint format behind GPT-OSS.",
      "whenToUse": "Aggressive memory/throughput wins on Blackwell-class hardware where a small accuracy hit is acceptable.",
      "refs": [
        {
          "t": "NVIDIA: Introducing NVFP4",
          "u": "https://developer.nvidia.com/blog/introducing-nvfp4-for-efficient-and-accurate-low-precision-inference/"
        }
      ]
    },
    {
      "id": "quantization",
      "label": "Quantization",
      "type": "Efficiency Technique",
      "cluster": "efficiency",
      "level": 4,
      "summary": "Store/compute weights in fewer bits (8/4/even 2-bit) to cut memory and speed up inference.",
      "detail": "Post-Training Quantization (PTQ) vs. Quantization-Aware Training. Enables big models on small GPUs. The frozen-base half of QLoRA. Trade a little accuracy for large memory savings.",
      "whenToUse": "Deployment on limited hardware, or to make fine-tuning fit (QLoRA)."
    },
    {
      "id": "data-valuation",
      "label": "Data Valuation & Example Importance",
      "type": "Practice",
      "cluster": "dataeval",
      "level": 4,
      "summary": "Score how much each training example contributes to model quality — influence functions, Data Shapley, gradient-based methods — to find harmful or redundant samples.",
      "detail": "Not all data helps equally; some hurts. Data valuation estimates per-example contribution (influence functions, Shapley values, gradient tracing) to surface mislabeled, duplicated, or low-value samples and prioritize curation budget. Increasingly used to clean and select fine-tuning sets.",
      "whenToUse": "Debugging a dataset — finding the examples that help, hurt, or are redundant.",
      "refs": [
        {
          "t": "Influence Functions (Koh & Liang)",
          "u": "https://arxiv.org/abs/1703.04730"
        }
      ]
    },
    {
      "id": "dapo",
      "label": "DAPO",
      "type": "Alignment Method",
      "cluster": "alignment",
      "level": 5,
      "summary": "Open-source GRPO recipe that fixes its instabilities: decoupled clip (\"clip-higher\"), dynamic sampling, token-level loss, overlong-reward shaping.",
      "detail": "GRPO is powerful but suffers entropy collapse and length/token bias. DAPO bundles four practical fixes that stabilize long reasoning-RL runs and made open reproduction of R1-style training reliable.",
      "whenToUse": "Running GRPO-style reasoning RL and hitting instability or length blow-up.",
      "refs": [
        {
          "t": "DAPO",
          "u": "https://arxiv.org/abs/2503.14476"
        }
      ]
    },
    {
      "id": "dpo",
      "label": "DPO",
      "type": "Alignment Method",
      "cluster": "alignment",
      "level": 5,
      "summary": "Direct Preference Optimization — skip the reward model & RL; optimize preferences with a simple loss.",
      "detail": "Reframes RLHF as a classification loss directly on (chosen, rejected) pairs against a frozen reference model. No reward model, no sampling, no RL instability. Now the default preference-tuning method; works great on top of LoRA.",
      "whenToUse": "Default choice for preference alignment — far simpler than PPO, near-equal quality.",
      "code": "from trl import DPOTrainer\nDPOTrainer(model, ref_model, train_dataset=pref_ds, beta=0.1, ...)",
      "refs": [
        {
          "t": "DPO",
          "u": "https://arxiv.org/abs/2305.18290"
        }
      ]
    },
    {
      "id": "generative-reward-model",
      "label": "Generative Reward Models (GenRM)",
      "type": "Alignment Method",
      "cluster": "alignment",
      "level": 5,
      "summary": "Reward models that write a chain-of-thought critique before/with the score — more accurate, interpretable, and extendable to non-verifiable domains.",
      "detail": "Classic reward models emit a single scalar (Bradley-Terry). GenRMs generate a reasoned judgment, can be scaled at inference time, and bridge RLHF with LLM-as-judge. Approaches like DeepSeek-GRM/SPCT extend verifiable-reward training to soft, non-checkable domains.",
      "whenToUse": "When a scalar reward is too brittle or you need rewards in domains without a programmatic verifier.",
      "refs": [
        {
          "t": "Inference-Time Scaling for Generalist Reward Modeling",
          "u": "https://arxiv.org/abs/2504.02495"
        }
      ]
    },
    {
      "id": "grpo",
      "label": "GRPO",
      "type": "Alignment Method",
      "cluster": "alignment",
      "level": 5,
      "summary": "Group Relative Policy Optimization — PPO without a value model; advantage = reward vs. the group mean.",
      "detail": "Samples a group of responses per prompt, normalizes their rewards to get advantages, and skips the costly critic/value network of PPO. Far cheaper and more stable for RL fine-tuning. The algorithm behind DeepSeek-R1's reasoning training. It has known instabilities (entropy collapse, length/token-level bias) that successors specifically fix: DAPO (clip-higher, dynamic sampling, token-level loss), GSPO (sequence-level ratios for MoE), and Dr.GRPO.",
      "whenToUse": "Online RL fine-tuning (esp. reasoning) when you want PPO-style gains without the value-model overhead.",
      "code": "# advantage_i = (reward_i - mean(group_rewards)) / std(group_rewards)",
      "refs": [
        {
          "t": "DeepSeekMath / GRPO",
          "u": "https://arxiv.org/abs/2402.03300"
        }
      ]
    },
    {
      "id": "gspo",
      "label": "Group Sequence Policy Optimization (GSPO)",
      "type": "Alignment Method",
      "cluster": "alignment",
      "level": 5,
      "summary": "Define the RL importance ratio at the sequence level (not per token) for sequence-level clipping — stabilizes MoE RL.",
      "detail": "Token-level ratios (as in GRPO/PPO) destabilize training of large MoE models. GSPO clips at the sequence level, giving more stable updates; it powers Qwen3 post-training.",
      "whenToUse": "Reasoning RL on large or MoE models where token-level methods are unstable.",
      "refs": [
        {
          "t": "GSPO",
          "u": "https://arxiv.org/abs/2507.18071"
        }
      ]
    },
    {
      "id": "ipo",
      "label": "IPO",
      "type": "Alignment Method",
      "cluster": "alignment",
      "level": 5,
      "summary": "Identity-PO: a DPO variant that adds regularization to curb overfitting to preferences.",
      "detail": "Replaces DPO's log-sigmoid with a squared loss to avoid over-optimizing when preferences are deterministic / near-saturated.",
      "whenToUse": "DPO is overfitting or your preference data is noisy/saturated.",
      "refs": [
        {
          "t": "IPO",
          "u": "https://arxiv.org/abs/2310.12036"
        }
      ]
    },
    {
      "id": "kto",
      "label": "KTO",
      "type": "Alignment Method",
      "cluster": "alignment",
      "level": 5,
      "summary": "Kahneman-Tversky Optimization — align using simple good/bad labels, not paired comparisons.",
      "detail": "Needs only a binary \"desirable/undesirable\" signal per example (no chosen-vs-rejected pairs), which is far cheaper to collect. Based on prospect theory.",
      "whenToUse": "You have thumbs-up/down style feedback rather than ranked pairs.",
      "refs": [
        {
          "t": "KTO",
          "u": "https://arxiv.org/abs/2402.01306"
        }
      ]
    },
    {
      "id": "orpo",
      "label": "ORPO",
      "type": "Alignment Method",
      "cluster": "alignment",
      "level": 5,
      "summary": "Odds-Ratio PO — combine SFT and preference alignment into ONE stage, no reference model.",
      "detail": "Adds an odds-ratio penalty to the SFT loss so the model learns format AND preferences simultaneously. No separate SFT or reference model needed — simplest pipeline of all.",
      "whenToUse": "You want a single-stage, reference-free pipeline (less compute, less plumbing).",
      "refs": [
        {
          "t": "ORPO",
          "u": "https://arxiv.org/abs/2403.07691"
        }
      ]
    },
    {
      "id": "ppo",
      "label": "PPO",
      "type": "Alignment Method",
      "cluster": "alignment",
      "level": 5,
      "summary": "The RL algorithm in classic RLHF — policy-gradient updates clipped for stability, with KL control.",
      "detail": "Proximal Policy Optimization. Online: generate, score with reward model, update. Needs 4 models in memory (policy, ref, reward, value), tricky to tune. GRPO (used in DeepSeek) drops the value model for efficiency.",
      "whenToUse": "Online RLHF when you have a good reward model and infra. Consider GRPO/DPO to simplify.",
      "refs": [
        {
          "t": "PPO",
          "u": "https://arxiv.org/abs/1707.06347"
        }
      ]
    },
    {
      "id": "rejection-sampling",
      "label": "Rejection Sampling (Best-of-N)",
      "type": "Alignment Method",
      "cluster": "alignment",
      "level": 5,
      "summary": "Sample many responses, keep the best (per reward model / verifier), then SFT on them.",
      "detail": "aka RFT / RAFT / STaR-style bootstrapping. A simple, stable alternative to online RL: generate N, filter to the winners, fine-tune. Used in Llama-2/3 post-training. Easy to reason about and debug.",
      "whenToUse": "You have a reward model or verifier and want RL-like gains without RL instability.",
      "refs": [
        {
          "t": "STaR",
          "u": "https://arxiv.org/abs/2203.14465"
        }
      ]
    },
    {
      "id": "reward-model",
      "label": "Reward Model",
      "type": "Alignment Method",
      "cluster": "alignment",
      "level": 5,
      "summary": "A model trained on human preference rankings to score how good a response is.",
      "detail": "Usually the base LLM + a scalar head, trained with a Bradley-Terry pairwise loss on (chosen, rejected) pairs. Its quality caps RLHF quality; reward hacking is the central failure mode. By 2025–2026 this scalar form is increasingly replaced by Generative Reward Models (which critique-then-score), and RM quality is measured on RewardBench / RewardBench 2.",
      "whenToUse": "Needed for PPO-style RLHF and for best-of-n / rejection sampling.",
      "code": "loss = -log_sigmoid(reward(chosen) - reward(rejected))"
    },
    {
      "id": "rlaif",
      "label": "RLAIF / Constitutional AI",
      "type": "Alignment Method",
      "cluster": "alignment",
      "level": 5,
      "summary": "Use an AI (guided by a written constitution) instead of humans to generate preference labels.",
      "detail": "Scales preference data by replacing human raters with a model that critiques/ranks per stated principles. Constitutional AI (Anthropic) uses self-critique + RL from AI feedback for harmlessness.",
      "whenToUse": "Human labeling is the bottleneck and you can encode your principles as rules.",
      "refs": [
        {
          "t": "Constitutional AI",
          "u": "https://arxiv.org/abs/2212.08073"
        }
      ]
    },
    {
      "id": "rlhf",
      "label": "RLHF",
      "type": "Alignment Method",
      "cluster": "alignment",
      "level": 5,
      "summary": "Align with human preferences: SFT → train a reward model → optimize policy with RL (PPO).",
      "detail": "The classic 3-stage pipeline behind InstructGPT/ChatGPT. Humans rank outputs → reward model learns the preference → PPO updates the LLM to maximize reward while a KL penalty keeps it near the SFT model. Powerful but complex and unstable.",
      "whenToUse": "You need nuanced alignment (helpfulness, safety, tone) beyond what demonstrations give.",
      "refs": [
        {
          "t": "InstructGPT",
          "u": "https://arxiv.org/abs/2203.02155"
        }
      ]
    },
    {
      "id": "rlvr",
      "label": "RLVR (Verifiable Rewards)",
      "type": "Alignment Method",
      "cluster": "alignment",
      "level": 5,
      "summary": "RL where the reward is a programmatic check (unit tests pass, answer matches) — no reward model.",
      "detail": "Reinforcement Learning with Verifiable Rewards: for math/code/logic, correctness is checkable, so the verifier *is* the reward. Eliminates reward-model bias and hacking. Combined with GRPO, this is how modern reasoning models (o1/R1-style) are trained to \"think\".",
      "whenToUse": "Tasks with an automatic correctness signal — math, code, structured outputs, agentic tool success.",
      "refs": [
        {
          "t": "Tülu 3 / RLVR",
          "u": "https://arxiv.org/abs/2411.15124"
        }
      ]
    },
    {
      "id": "simpo",
      "label": "SimPO",
      "type": "Alignment Method",
      "cluster": "alignment",
      "level": 5,
      "summary": "Simple PO — reference-free DPO using length-normalized reward, often stronger than DPO.",
      "detail": "Drops the reference model and uses the average log-prob as an implicit reward with a target margin, reducing length bias.",
      "whenToUse": "Want reference-free preference tuning with strong benchmarks and less length bias.",
      "refs": [
        {
          "t": "SimPO",
          "u": "https://arxiv.org/abs/2405.14734"
        }
      ]
    },
    {
      "id": "long-cot",
      "label": "Long Chain-of-Thought",
      "type": "Reasoning Method",
      "cluster": "reasoning",
      "level": 5,
      "summary": "Extended, self-correcting reasoning traces (\"thinking\" tokens) that backtrack, verify, and explore before answering.",
      "detail": "Unlike short, prompted chain-of-thought, long-CoT is *learned* behavior: the model emits thousands of reasoning tokens that reflect, check intermediate results, recognize mistakes, and revise — sometimes restarting an approach entirely. It emerges from RL training on verifiable tasks and is what makes reasoning models strong on competition math and code. The trace (\"&lt;think&gt;…\") is typically hidden from the user and separated from the final answer.",
      "whenToUse": "Underpins reasoning models; relevant when fine-tuning or distilling for deliberate, multi-step problem solving.",
      "refs": [
        {
          "t": "DeepSeek-R1",
          "u": "https://arxiv.org/abs/2501.12948"
        }
      ]
    },
    {
      "id": "process-reward-model",
      "label": "Process Reward Model (PRM)",
      "type": "Reasoning Method",
      "cluster": "reasoning",
      "level": 5,
      "summary": "Reward each step of a reasoning chain — not just the final answer — giving a denser signal for training and search.",
      "detail": "An *outcome* reward model (ORM) scores only the final answer; a *process* reward model scores every intermediate reasoning step. This denser supervision improves RL training stability, enables step-level verification, and powers search methods (beam/tree search over reasoning steps where each step is scored). PRMs are costlier to label — they need step-level annotations or automated step checking — but are stronger for hard reasoning.",
      "whenToUse": "Training or verifying multi-step reasoning where step-level credit assignment and error localization help.",
      "refs": [
        {
          "t": "Let's Verify Step by Step",
          "u": "https://arxiv.org/abs/2305.20050"
        }
      ]
    },
    {
      "id": "reasoning-distillation",
      "label": "Reasoning Distillation",
      "type": "Reasoning Method",
      "cluster": "reasoning",
      "level": 5,
      "summary": "Distill long chain-of-thought traces from a large reasoner into a smaller model — cheap reasoning ability without running RL.",
      "detail": "Generate long-CoT reasoning traces with a strong reasoner (e.g. DeepSeek-R1), then supervised-fine-tune a smaller model on those traces. DeepSeek showed that small models distilled from R1 outperform the same small models trained with RL directly — the reasoning behavior transfers through the traces. It is the cheapest path to a capable small reasoner, since it needs only SFT, no reward model or RL infrastructure. Limitation: distilled students still trail the frontier teacher (R1-distilled models show sizable gaps on the hardest benchmarks) and inherit its blind spots — set expectations accordingly.",
      "whenToUse": "You want strong reasoning in a small / cheap model and have access to a capable reasoner to generate traces.",
      "refs": [
        {
          "t": "DeepSeek-R1 (distilled models)",
          "u": "https://arxiv.org/abs/2501.12948"
        }
      ]
    },
    {
      "id": "reasoning-models",
      "label": "Reasoning Models",
      "type": "Reasoning Method",
      "cluster": "reasoning",
      "level": 5,
      "summary": "Models trained to \"think\" before answering — spending test-time compute on long internal chains of thought (o1, DeepSeek-R1).",
      "detail": "A class of models (OpenAI's o1 → o3 lineage, DeepSeek-R1, Gemini \"thinking\", Qwen-QwQ) that generate a long internal chain of thought before the final answer, trading inference compute for accuracy on math, code, and logic. They are trained largely with RL on *verifiable* rewards (RLVR) — often via GRPO/DAPO — rather than human preference, and the reasoning behavior (self-checking, backtracking) is emergent. The \"thinking\" trace is usually hidden from the end user (OpenAI hides it; DeepSeek exposes it in `<think>` tags).",
      "whenToUse": "Hard multi-step problems (math, code, planning, agents) where accuracy matters more than latency or cost.",
      "refs": [
        {
          "t": "DeepSeek-R1",
          "u": "https://arxiv.org/abs/2501.12948"
        },
        {
          "t": "OpenAI o1 system card",
          "u": "https://openai.com/index/learning-to-reason-with-llms/"
        }
      ]
    },
    {
      "id": "self-consistency",
      "label": "Self-Consistency",
      "type": "Reasoning Method",
      "cluster": "reasoning",
      "level": 5,
      "summary": "Sample multiple reasoning paths and take a majority vote on the answer — a cheap accuracy boost over greedy chain-of-thought.",
      "detail": "Draw N independent chains of thought at non-zero temperature, then marginalize over the reasoning by majority-voting the final answers. Because there are many valid reasoning paths to a correct answer but fewer to any particular wrong one, voting reliably improves accuracy on arithmetic and commonsense tasks. It is the simplest, most robust form of test-time compute.",
      "whenToUse": "Boost chain-of-thought accuracy on math/logic when you can afford a handful of samples.",
      "code": "answers = [model.generate(prompt, temperature=0.7) for _ in range(20)]\nfinal = Counter(extract_answer(a) for a in answers).most_common(1)[0][0]",
      "refs": [
        {
          "t": "Self-Consistency (Wang 2022)",
          "u": "https://arxiv.org/abs/2203.11171"
        }
      ]
    },
    {
      "id": "test-time-compute",
      "label": "Test-Time Compute Scaling",
      "type": "Reasoning Method",
      "cluster": "reasoning",
      "level": 5,
      "summary": "Spend more compute at inference (longer reasoning, more samples, search) to raise accuracy — a new scaling axis beyond model size.",
      "detail": "Instead of (or alongside) scaling parameters and training data, allocate more compute at *inference*. Three families: (1) **parallel sampling + selection** — best-of-N or self-consistency voting; (2) **verifier-guided search** — score candidates with a reward model/verifier (or tree search); (3) **sequential refinement** — a long chain-of-thought that revises itself. For hard tasks this is often more cost-effective than a bigger model — a key finding behind reasoning models. It opens a third scaling axis complementing the classic parameter/data scaling laws.",
      "whenToUse": "When a smaller model plus more inference compute beats a larger model at a fixed total budget.",
      "refs": [
        {
          "t": "Scaling LLM Test-Time Compute",
          "u": "https://arxiv.org/abs/2408.03314"
        }
      ]
    },
    {
      "id": "tree-of-thought",
      "label": "Tree-of-Thought (Search-Based Reasoning)",
      "type": "Reasoning Method",
      "cluster": "reasoning",
      "level": 5,
      "summary": "Explore multiple reasoning branches with explicit search (BFS/DFS) and state evaluation, instead of one linear chain.",
      "detail": "Tree-of-Thought frames problem solving as search over a tree of partial \"thoughts,\" expanding promising branches and pruning dead ends with a value/heuristic. More powerful than single-chain CoT on planning and puzzles, at higher inference cost — a structured form of test-time compute.",
      "whenToUse": "Hard search/planning problems where a single chain of thought is insufficient.",
      "refs": [
        {
          "t": "Tree of Thoughts (Yao et al)",
          "u": "https://arxiv.org/abs/2305.10601"
        }
      ]
    },
    {
      "id": "verifier-based-search",
      "label": "Verifier-Based Search",
      "type": "Reasoning Method",
      "cluster": "reasoning",
      "level": 5,
      "summary": "Generate many candidate solutions and select with a verifier (process or outcome reward) rather than majority vote.",
      "detail": "A branch of test-time compute distinct from self-consistency: instead of voting, score candidates with a trained verifier / reward model (or a programmatic checker) and pick the best. With a strong verifier, scaling samples reliably improves accuracy — the basis of best-of-N and search-guided reasoning.",
      "whenToUse": "You have a good verifier/reward model and want to trade inference compute for accuracy.",
      "refs": [
        {
          "t": "Scaling LLM Test-Time Compute",
          "u": "https://arxiv.org/abs/2408.03314"
        }
      ]
    },
    {
      "id": "continuous-batching",
      "label": "Continuous Batching",
      "type": "Efficiency Technique",
      "cluster": "efficiency",
      "level": 5,
      "summary": "Iteration-level scheduling that adds/removes requests from the running batch each decode step — 2–3× throughput vs. static batching.",
      "detail": "Static batching wastes the GPU waiting for the slowest sequence to finish. Continuous (in-flight) batching schedules at the token step, swapping completed requests out and new ones in, maximizing utilization and tail latency. Standard in vLLM, TGI, TensorRT-LLM.",
      "whenToUse": "The default request scheduler for any serious LLM serving deployment.",
      "refs": [
        {
          "t": "vLLM (continuous batching)",
          "u": "https://arxiv.org/abs/2309.06180"
        }
      ]
    },
    {
      "id": "eagle-speculative",
      "label": "Self-Speculative Decoding (EAGLE / MTP)",
      "type": "Efficiency Technique",
      "cluster": "efficiency",
      "level": 5,
      "summary": "Draft tokens from the model's own features or trained multi-token-prediction heads, not a separate draft model — the production speculative-decoding default.",
      "detail": "EAGLE-3 predicts future tokens from fused intermediate features; multi-token-prediction (MTP) heads are trained natively (DeepSeek-V3, Qwen3). Both give lossless 2–4× decode speedups and have superseded Medusa and standalone draft models in vLLM/SGLang/TRT-LLM.",
      "whenToUse": "Cut generation latency/cost at serving time with zero change to output distribution.",
      "refs": [
        {
          "t": "EAGLE-3",
          "u": "https://arxiv.org/abs/2503.01840"
        }
      ]
    },
    {
      "id": "flash-attention",
      "label": "FlashAttention",
      "type": "Efficiency Technique",
      "cluster": "efficiency",
      "level": 5,
      "summary": "IO-aware exact attention kernel — fewer memory reads/writes, big speed & memory wins.",
      "detail": "Avoids materializing the n×n attention matrix in HBM via tiling and recomputation, making attention IO-bound rather than memory-bound. FA-2/3 deliver ~2–4× speedup and ~2–3× memory reduction vs. vanilla attention and unlock 128K-class contexts; standard in vLLM, SGLang, and transformers. Exact (not approximate) — same outputs, less memory traffic.",
      "whenToUse": "Always enable if supported — free speedup and longer context.",
      "refs": [
        {
          "t": "FlashAttention",
          "u": "https://arxiv.org/abs/2205.14135"
        }
      ]
    },
    {
      "id": "fsdp-deepspeed",
      "label": "FSDP / DeepSpeed ZeRO",
      "type": "Efficiency Technique",
      "cluster": "efficiency",
      "level": 5,
      "summary": "Shard params, gradients, and optimizer state across GPUs to train models bigger than one GPU.",
      "detail": "ZeRO stages 1–3 / Fully Sharded Data Parallel partition state so memory scales with GPU count. Required for full fine-tuning of large models. CPU/NVMe offload for extreme cases.",
      "whenToUse": "Multi-GPU full fine-tuning or very large models.",
      "refs": [
        {
          "t": "ZeRO",
          "u": "https://arxiv.org/abs/1910.02054"
        }
      ]
    },
    {
      "id": "model-merging",
      "label": "Model Merging",
      "type": "Efficiency Technique",
      "cluster": "efficiency",
      "level": 5,
      "summary": "Combine multiple fine-tuned models/adapters into one — no extra training (SLERP, TIES, DARE).",
      "detail": "Average or interpolate weights of models tuned on different tasks/data to fuse their skills. TIES/DARE resolve sign conflicts and prune redundant deltas. Cheap way to build a multi-skill model or ensemble LoRA adapters.",
      "whenToUse": "Fuse several specialist fine-tunes (or LoRA adapters) into one model without retraining.",
      "refs": [
        {
          "t": "TIES-Merging",
          "u": "https://arxiv.org/abs/2306.01708"
        }
      ]
    },
    {
      "id": "multi-token-prediction",
      "label": "Multi-Token Prediction (MTP)",
      "type": "Efficiency Technique",
      "cluster": "efficiency",
      "level": 5,
      "summary": "Train auxiliary heads to predict several future tokens at once — better sample efficiency and built-in self-speculation at decode time.",
      "detail": "Instead of predicting only the next token, MTP adds heads that predict the next k tokens from a shared trunk, improving training signal and enabling cheap self-speculative decoding (the heads draft, the model verifies). Shipped in DeepSeek-V3 and used by Qwen3.",
      "whenToUse": "Pretraining for efficiency and to natively enable fast self-speculative inference.",
      "refs": [
        {
          "t": "Multi-Token Prediction (Gloeckle et al)",
          "u": "https://arxiv.org/abs/2404.19737"
        }
      ]
    },
    {
      "id": "paged-attention",
      "label": "PagedAttention",
      "type": "Efficiency Technique",
      "cluster": "efficiency",
      "level": 5,
      "summary": "Allocate the KV cache in non-contiguous blocks (OS-style virtual paging) to eliminate fragmentation and enable continuous batching.",
      "detail": "The KV cache normally needs a contiguous slab sized to the max length, wasting memory. PagedAttention (vLLM) pages it into fixed blocks mapped via a block table, cutting waste to near zero and enabling sharing across requests. The foundation of modern high-throughput serving.",
      "whenToUse": "The serving-side memory optimization behind vLLM; pairs with continuous batching and prefix caching.",
      "refs": [
        {
          "t": "PagedAttention / vLLM",
          "u": "https://arxiv.org/abs/2309.06180"
        }
      ]
    },
    {
      "id": "prefix-caching",
      "label": "Prefix Caching",
      "type": "Efficiency Technique",
      "cluster": "efficiency",
      "level": 5,
      "summary": "Cache and reuse the KV states of shared prefixes (system prompts, few-shot examples, RAG context) so they are not recomputed per request.",
      "detail": "Many requests share a long common prefix; prefix caching (RadixAttention in SGLang, automatic prefix caching in vLLM) stores its KV once and reuses it, skipping prefill for the shared part. Large latency/throughput wins for agents, RAG, and few-shot workloads.",
      "whenToUse": "Whenever requests share long prefixes — system prompts, tools, retrieved context.",
      "refs": [
        {
          "t": "RadixAttention / SGLang",
          "u": "https://arxiv.org/abs/2312.07104"
        }
      ]
    },
    {
      "id": "speculative-decoding",
      "label": "Speculative Decoding",
      "type": "Efficiency Technique",
      "cluster": "efficiency",
      "level": 5,
      "summary": "A small draft model proposes several tokens; the big model verifies them in one pass — faster, identical output.",
      "detail": "Lossless inference speedup (2–4×): the target model accepts/rejects the draft's guesses in parallel. As of 2026 the production default is *self*-speculation — EAGLE-3 (drafting from the model's own features) and natively-trained multi-token-prediction (MTP) heads — which have superseded Medusa and standalone draft models in vLLM/SGLang/TRT-LLM. Pure serving optimization — output distribution is unchanged.",
      "whenToUse": "Cut generation latency/cost at serving time with zero quality loss.",
      "refs": [
        {
          "t": "Speculative Decoding",
          "u": "https://arxiv.org/abs/2211.17192"
        }
      ]
    },
    {
      "id": "tensor-parallelism",
      "label": "Tensor Parallelism",
      "type": "Efficiency Technique",
      "cluster": "efficiency",
      "level": 5,
      "summary": "Split individual weight matrices across GPUs (column/row partitions with all-reduce) to run models larger than one GPU.",
      "detail": "Where FSDP/ZeRO shards optimizer state, tensor parallelism (Megatron-LM) partitions the matmuls themselves across devices, communicating activations each layer. Lower latency than pipeline parallelism but communication-heavy; usually combined with pipeline + data parallelism (3D parallelism) at scale.",
      "whenToUse": "Serving or training a model that exceeds a single GPU's memory or compute.",
      "refs": [
        {
          "t": "Megatron-LM",
          "u": "https://arxiv.org/abs/1909.08053"
        }
      ]
    }
  ],
  "edges": [
    {
      "s": "adaptation",
      "t": "prompting",
      "r": "is-a"
    },
    {
      "s": "adaptation",
      "t": "rag",
      "r": "is-a"
    },
    {
      "s": "adaptation",
      "t": "peft",
      "r": "is-a"
    },
    {
      "s": "adaptation",
      "t": "full-ft",
      "r": "is-a"
    },
    {
      "s": "adaptation",
      "t": "continued-pretraining",
      "r": "is-a"
    },
    {
      "s": "cot",
      "t": "react",
      "r": "builds-on"
    },
    {
      "s": "few-shot",
      "t": "sft",
      "r": "alternative"
    },
    {
      "s": "full-ft",
      "t": "continued-pretraining",
      "r": "builds-on"
    },
    {
      "s": "full-ft",
      "t": "fsdp-deepspeed",
      "r": "requires"
    },
    {
      "s": "full-ft",
      "t": "mixed-precision",
      "r": "requires"
    },
    {
      "s": "prompting",
      "t": "few-shot",
      "r": "is-a"
    },
    {
      "s": "prompting",
      "t": "cot",
      "r": "is-a"
    },
    {
      "s": "prompting",
      "t": "rag",
      "r": "builds-on"
    },
    {
      "s": "rag",
      "t": "full-ft",
      "r": "alternative"
    },
    {
      "s": "rag",
      "t": "context-window",
      "r": "requires"
    },
    {
      "s": "rag",
      "t": "peft",
      "r": "builds-on"
    },
    {
      "s": "react",
      "t": "rag",
      "r": "combines"
    },
    {
      "s": "agent-memory",
      "t": "rag",
      "r": "combines"
    },
    {
      "s": "agent-memory",
      "t": "context-window",
      "r": "requires"
    },
    {
      "s": "agentic-rag",
      "t": "rag",
      "r": "improves-on"
    },
    {
      "s": "agentic-rag",
      "t": "react",
      "r": "combines"
    },
    {
      "s": "computer-use",
      "t": "react",
      "r": "builds-on"
    },
    {
      "s": "context-engineering",
      "t": "prompting",
      "r": "builds-on"
    },
    {
      "s": "context-engineering",
      "t": "rag",
      "r": "combines"
    },
    {
      "s": "graphrag",
      "t": "rag",
      "r": "improves-on"
    },
    {
      "s": "graphrag",
      "t": "embedding",
      "r": "combines"
    },
    {
      "s": "hybrid-retrieval",
      "t": "rag",
      "r": "improves-on"
    },
    {
      "s": "hybrid-retrieval",
      "t": "retrieval-reranking",
      "r": "combines"
    },
    {
      "s": "hybrid-retrieval",
      "t": "embedding",
      "r": "combines"
    },
    {
      "s": "mcp",
      "t": "react",
      "r": "builds-on"
    },
    {
      "s": "mcp",
      "t": "rag",
      "r": "combines"
    },
    {
      "s": "retrieval-reranking",
      "t": "rag",
      "r": "improves-on"
    },
    {
      "s": "retrieval-reranking",
      "t": "embedding",
      "r": "combines"
    },
    {
      "s": "dapo",
      "t": "grpo",
      "r": "improves-on"
    },
    {
      "s": "dapo",
      "t": "rlvr",
      "r": "builds-on"
    },
    {
      "s": "dpo",
      "t": "ipo",
      "r": "alternative"
    },
    {
      "s": "dpo",
      "t": "kto",
      "r": "alternative"
    },
    {
      "s": "dpo",
      "t": "orpo",
      "r": "alternative"
    },
    {
      "s": "dpo",
      "t": "simpo",
      "r": "alternative"
    },
    {
      "s": "dpo",
      "t": "lora",
      "r": "combines"
    },
    {
      "s": "dpo",
      "t": "dataset-prep",
      "r": "requires"
    },
    {
      "s": "generative-reward-model",
      "t": "reward-model",
      "r": "improves-on"
    },
    {
      "s": "generative-reward-model",
      "t": "llm-as-judge",
      "r": "combines"
    },
    {
      "s": "grpo",
      "t": "dpo",
      "r": "alternative"
    },
    {
      "s": "grpo",
      "t": "ppo",
      "r": "improves-on"
    },
    {
      "s": "grpo",
      "t": "rlvr",
      "r": "combines"
    },
    {
      "s": "gspo",
      "t": "grpo",
      "r": "improves-on"
    },
    {
      "s": "gspo",
      "t": "dapo",
      "r": "alternative"
    },
    {
      "s": "orpo",
      "t": "sft",
      "r": "combines"
    },
    {
      "s": "ppo",
      "t": "dpo",
      "r": "alternative"
    },
    {
      "s": "rejection-sampling",
      "t": "sft",
      "r": "combines"
    },
    {
      "s": "rejection-sampling",
      "t": "ppo",
      "r": "alternative"
    },
    {
      "s": "reward-model",
      "t": "ppo",
      "r": "requires"
    },
    {
      "s": "reward-model",
      "t": "rejection-sampling",
      "r": "requires"
    },
    {
      "s": "rlhf",
      "t": "reward-model",
      "r": "requires"
    },
    {
      "s": "rlhf",
      "t": "ppo",
      "r": "requires"
    },
    {
      "s": "rlhf",
      "t": "sft",
      "r": "requires"
    },
    {
      "s": "rlhf",
      "t": "dpo",
      "r": "alternative"
    },
    {
      "s": "rlhf",
      "t": "rlaif",
      "r": "alternative"
    },
    {
      "s": "rlvr",
      "t": "cot",
      "r": "combines"
    },
    {
      "s": "rlvr",
      "t": "reward-model",
      "r": "alternative"
    },
    {
      "s": "rlvr",
      "t": "evaluation",
      "r": "requires"
    },
    {
      "s": "attention",
      "t": "self-attention",
      "r": "is-a"
    },
    {
      "s": "ffn",
      "t": "moe",
      "r": "is-a"
    },
    {
      "s": "gqa",
      "t": "multi-head",
      "r": "improves-on"
    },
    {
      "s": "gqa",
      "t": "mla",
      "r": "alternative"
    },
    {
      "s": "gqa",
      "t": "kv-cache",
      "r": "combines"
    },
    {
      "s": "hybrid-ssm",
      "t": "mamba",
      "r": "combines"
    },
    {
      "s": "hybrid-ssm",
      "t": "attention",
      "r": "combines"
    },
    {
      "s": "hybrid-ssm",
      "t": "transformer",
      "r": "builds-on"
    },
    {
      "s": "linear-attention",
      "t": "attention",
      "r": "alternative"
    },
    {
      "s": "linear-attention",
      "t": "transformer",
      "r": "combines"
    },
    {
      "s": "mamba",
      "t": "transformer",
      "r": "alternative"
    },
    {
      "s": "mamba",
      "t": "attention",
      "r": "alternative"
    },
    {
      "s": "mla",
      "t": "multi-head",
      "r": "improves-on"
    },
    {
      "s": "mla",
      "t": "gqa",
      "r": "alternative"
    },
    {
      "s": "mla",
      "t": "attention",
      "r": "requires"
    },
    {
      "s": "mla",
      "t": "kv-cache",
      "r": "combines"
    },
    {
      "s": "mqa",
      "t": "multi-head",
      "r": "improves-on"
    },
    {
      "s": "mqa",
      "t": "gqa",
      "r": "alternative"
    },
    {
      "s": "mqa",
      "t": "kv-cache",
      "r": "combines"
    },
    {
      "s": "multi-head",
      "t": "kv-cache",
      "r": "combines"
    },
    {
      "s": "positional-encoding",
      "t": "context-window",
      "r": "requires"
    },
    {
      "s": "rms-norm",
      "t": "transformer",
      "r": "requires"
    },
    {
      "s": "rope",
      "t": "positional-encoding",
      "r": "builds-on"
    },
    {
      "s": "rope",
      "t": "self-attention",
      "r": "requires"
    },
    {
      "s": "rope",
      "t": "context-extension",
      "r": "combines"
    },
    {
      "s": "self-attention",
      "t": "multi-head",
      "r": "builds-on"
    },
    {
      "s": "self-attention",
      "t": "decoder-gpt",
      "r": "requires"
    },
    {
      "s": "sliding-window-attention",
      "t": "attention",
      "r": "alternative"
    },
    {
      "s": "sliding-window-attention",
      "t": "kv-cache",
      "r": "combines"
    },
    {
      "s": "swiglu",
      "t": "ffn",
      "r": "improves-on"
    },
    {
      "s": "transformer",
      "t": "attention",
      "r": "builds-on"
    },
    {
      "s": "transformer",
      "t": "positional-encoding",
      "r": "requires"
    },
    {
      "s": "transformer",
      "t": "ffn",
      "r": "builds-on"
    },
    {
      "s": "transformer",
      "t": "pretraining",
      "r": "requires"
    },
    {
      "s": "transformer",
      "t": "decoder-gpt",
      "r": "is-a"
    },
    {
      "s": "transformer",
      "t": "encoder-bert",
      "r": "is-a"
    },
    {
      "s": "transformer",
      "t": "enc-dec-t5",
      "r": "is-a"
    },
    {
      "s": "transformer",
      "t": "flash-attention",
      "r": "combines"
    },
    {
      "s": "transformer",
      "t": "moe",
      "r": "builds-on"
    },
    {
      "s": "agentic-eval",
      "t": "benchmarks",
      "r": "improves-on"
    },
    {
      "s": "agentic-eval",
      "t": "rlvr",
      "r": "combines"
    },
    {
      "s": "contamination-detection",
      "t": "benchmarks",
      "r": "improves-on"
    },
    {
      "s": "contamination-detection",
      "t": "dataset-prep",
      "r": "combines"
    },
    {
      "s": "data-valuation",
      "t": "dataset-prep",
      "r": "combines"
    },
    {
      "s": "dataset-prep",
      "t": "synthetic-data",
      "r": "is-a"
    },
    {
      "s": "dataset-prep",
      "t": "evaluation",
      "r": "combines"
    },
    {
      "s": "evaluation",
      "t": "llm-as-judge",
      "r": "combines"
    },
    {
      "s": "evaluation",
      "t": "benchmarks",
      "r": "combines"
    },
    {
      "s": "model-based-filtering",
      "t": "dataset-prep",
      "r": "improves-on"
    },
    {
      "s": "model-based-filtering",
      "t": "synthetic-data",
      "r": "combines"
    },
    {
      "s": "model-collapse",
      "t": "synthetic-data",
      "r": "combines"
    },
    {
      "s": "preference-data",
      "t": "dataset-prep",
      "r": "requires"
    },
    {
      "s": "preference-data",
      "t": "reward-model",
      "r": "combines"
    },
    {
      "s": "preference-data",
      "t": "dpo",
      "r": "combines"
    },
    {
      "s": "continuous-batching",
      "t": "paged-attention",
      "r": "requires"
    },
    {
      "s": "continuous-batching",
      "t": "speculative-decoding",
      "r": "combines"
    },
    {
      "s": "distillation",
      "t": "synthetic-data",
      "r": "combines"
    },
    {
      "s": "distillation",
      "t": "decoder-gpt",
      "r": "requires"
    },
    {
      "s": "eagle-speculative",
      "t": "speculative-decoding",
      "r": "improves-on"
    },
    {
      "s": "fp8-training",
      "t": "mixed-precision",
      "r": "improves-on"
    },
    {
      "s": "fp8-training",
      "t": "quantization",
      "r": "builds-on"
    },
    {
      "s": "galore",
      "t": "lora",
      "r": "alternative"
    },
    {
      "s": "galore",
      "t": "full-ft",
      "r": "requires"
    },
    {
      "s": "galore",
      "t": "mixed-precision",
      "r": "combines"
    },
    {
      "s": "model-merging",
      "t": "full-ft",
      "r": "alternative"
    },
    {
      "s": "multi-token-prediction",
      "t": "speculative-decoding",
      "r": "improves-on"
    },
    {
      "s": "multi-token-prediction",
      "t": "eagle-speculative",
      "r": "combines"
    },
    {
      "s": "mxfp4",
      "t": "quantization",
      "r": "improves-on"
    },
    {
      "s": "mxfp4",
      "t": "mixed-precision",
      "r": "requires"
    },
    {
      "s": "mxfp4",
      "t": "gptq",
      "r": "alternative"
    },
    {
      "s": "paged-attention",
      "t": "kv-cache",
      "r": "improves-on"
    },
    {
      "s": "paged-attention",
      "t": "speculative-decoding",
      "r": "combines"
    },
    {
      "s": "prefix-caching",
      "t": "kv-cache",
      "r": "improves-on"
    },
    {
      "s": "prefix-caching",
      "t": "rag",
      "r": "combines"
    },
    {
      "s": "quantization",
      "t": "gptq",
      "r": "is-a"
    },
    {
      "s": "quantization",
      "t": "awq",
      "r": "is-a"
    },
    {
      "s": "quantization",
      "t": "bitsandbytes",
      "r": "is-a"
    },
    {
      "s": "quantization",
      "t": "speculative-decoding",
      "r": "combines"
    },
    {
      "s": "speculative-decoding",
      "t": "kv-cache",
      "r": "combines"
    },
    {
      "s": "tensor-parallelism",
      "t": "fsdp-deepspeed",
      "r": "alternative"
    },
    {
      "s": "tensor-parallelism",
      "t": "full-ft",
      "r": "requires"
    },
    {
      "s": "context-extension",
      "t": "positional-encoding",
      "r": "builds-on"
    },
    {
      "s": "context-extension",
      "t": "context-window",
      "r": "requires"
    },
    {
      "s": "context-extension",
      "t": "lora",
      "r": "combines"
    },
    {
      "s": "embedding",
      "t": "transformer",
      "r": "requires"
    },
    {
      "s": "logit-softmax",
      "t": "embedding",
      "r": "requires"
    },
    {
      "s": "logit-softmax",
      "t": "token",
      "r": "combines"
    },
    {
      "s": "long-context-limits",
      "t": "context-window",
      "r": "requires"
    },
    {
      "s": "long-context-limits",
      "t": "rag",
      "r": "alternative"
    },
    {
      "s": "pretraining",
      "t": "scaling-laws",
      "r": "combines"
    },
    {
      "s": "pretraining",
      "t": "decoder-gpt",
      "r": "requires"
    },
    {
      "s": "token",
      "t": "embedding",
      "r": "requires"
    },
    {
      "s": "decoder-gpt",
      "t": "adaptation",
      "r": "requires"
    },
    {
      "s": "decoder-gpt",
      "t": "moe",
      "r": "combines"
    },
    {
      "s": "adapters",
      "t": "lora",
      "r": "alternative"
    },
    {
      "s": "lora",
      "t": "qlora",
      "r": "improves-on"
    },
    {
      "s": "lora",
      "t": "dora",
      "r": "improves-on"
    },
    {
      "s": "lora",
      "t": "adalora",
      "r": "improves-on"
    },
    {
      "s": "lora",
      "t": "full-ft",
      "r": "alternative"
    },
    {
      "s": "lora",
      "t": "attention",
      "r": "requires"
    },
    {
      "s": "lora",
      "t": "model-merging",
      "r": "combines"
    },
    {
      "s": "peft",
      "t": "full-ft",
      "r": "builds-on"
    },
    {
      "s": "peft",
      "t": "lora",
      "r": "is-a"
    },
    {
      "s": "peft",
      "t": "adapters",
      "r": "is-a"
    },
    {
      "s": "peft",
      "t": "prefix-tuning",
      "r": "is-a"
    },
    {
      "s": "peft",
      "t": "prompt-tuning",
      "r": "is-a"
    },
    {
      "s": "peft",
      "t": "p-tuning",
      "r": "is-a"
    },
    {
      "s": "peft",
      "t": "ia3",
      "r": "is-a"
    },
    {
      "s": "peft",
      "t": "bitfit",
      "r": "is-a"
    },
    {
      "s": "peft",
      "t": "layer-freezing",
      "r": "is-a"
    },
    {
      "s": "peft",
      "t": "sft",
      "r": "combines"
    },
    {
      "s": "pissa",
      "t": "lora",
      "r": "improves-on"
    },
    {
      "s": "prefix-tuning",
      "t": "p-tuning",
      "r": "alternative"
    },
    {
      "s": "prompt-tuning",
      "t": "prefix-tuning",
      "r": "improves-on"
    },
    {
      "s": "qlora",
      "t": "quantization",
      "r": "requires"
    },
    {
      "s": "qlora",
      "t": "bitsandbytes",
      "r": "requires"
    },
    {
      "s": "qlora",
      "t": "gradient-checkpointing",
      "r": "combines"
    },
    {
      "s": "reft",
      "t": "lora",
      "r": "alternative"
    },
    {
      "s": "rslora",
      "t": "lora",
      "r": "improves-on"
    },
    {
      "s": "vera",
      "t": "lora",
      "r": "improves-on"
    },
    {
      "s": "long-cot",
      "t": "cot",
      "r": "improves-on"
    },
    {
      "s": "long-cot",
      "t": "reasoning-models",
      "r": "requires"
    },
    {
      "s": "process-reward-model",
      "t": "reward-model",
      "r": "improves-on"
    },
    {
      "s": "process-reward-model",
      "t": "reasoning-models",
      "r": "combines"
    },
    {
      "s": "process-reward-model",
      "t": "rlvr",
      "r": "combines"
    },
    {
      "s": "reasoning-distillation",
      "t": "distillation",
      "r": "is-a"
    },
    {
      "s": "reasoning-distillation",
      "t": "reasoning-models",
      "r": "requires"
    },
    {
      "s": "reasoning-distillation",
      "t": "long-cot",
      "r": "combines"
    },
    {
      "s": "reasoning-distillation",
      "t": "sft",
      "r": "combines"
    },
    {
      "s": "reasoning-models",
      "t": "cot",
      "r": "builds-on"
    },
    {
      "s": "reasoning-models",
      "t": "rlvr",
      "r": "requires"
    },
    {
      "s": "reasoning-models",
      "t": "grpo",
      "r": "combines"
    },
    {
      "s": "reasoning-models",
      "t": "test-time-compute",
      "r": "combines"
    },
    {
      "s": "self-consistency",
      "t": "cot",
      "r": "builds-on"
    },
    {
      "s": "self-consistency",
      "t": "test-time-compute",
      "r": "combines"
    },
    {
      "s": "test-time-compute",
      "t": "reasoning-models",
      "r": "combines"
    },
    {
      "s": "test-time-compute",
      "t": "cot",
      "r": "builds-on"
    },
    {
      "s": "test-time-compute",
      "t": "self-consistency",
      "r": "combines"
    },
    {
      "s": "test-time-compute",
      "t": "rejection-sampling",
      "r": "combines"
    },
    {
      "s": "tree-of-thought",
      "t": "cot",
      "r": "builds-on"
    },
    {
      "s": "tree-of-thought",
      "t": "self-consistency",
      "r": "alternative"
    },
    {
      "s": "tree-of-thought",
      "t": "test-time-compute",
      "r": "combines"
    },
    {
      "s": "verifier-based-search",
      "t": "self-consistency",
      "r": "alternative"
    },
    {
      "s": "verifier-based-search",
      "t": "process-reward-model",
      "r": "builds-on"
    },
    {
      "s": "verifier-based-search",
      "t": "test-time-compute",
      "r": "combines"
    },
    {
      "s": "instruction-tuning",
      "t": "sft",
      "r": "builds-on"
    },
    {
      "s": "sft",
      "t": "instruction-tuning",
      "r": "is-a"
    },
    {
      "s": "sft",
      "t": "chat-template",
      "r": "requires"
    },
    {
      "s": "sft",
      "t": "lora",
      "r": "combines"
    },
    {
      "s": "sft",
      "t": "dataset-prep",
      "r": "requires"
    },
    {
      "s": "sft",
      "t": "evaluation",
      "r": "requires"
    },
    {
      "s": "decoder-gpt",
      "t": "dataset-prep",
      "r": "path"
    },
    {
      "s": "dataset-prep",
      "t": "sft",
      "r": "path"
    },
    {
      "s": "sft",
      "t": "lora",
      "r": "path"
    },
    {
      "s": "lora",
      "t": "dpo",
      "r": "path"
    },
    {
      "s": "dpo",
      "t": "evaluation",
      "r": "path"
    },
    {
      "s": "evaluation",
      "t": "quantization",
      "r": "path"
    }
  ],
  "decisionTree": {
    "start": "knowledge",
    "steps": {
      "knowledge": {
        "q": "Is the gap mainly missing or fast-changing FACTS — docs, policies, product data, knowledge that updates often?",
        "a": [
          {
            "label": "Yes — it needs current, citable facts",
            "rec": "rag",
            "why": "Retrieval injects fresh knowledge at query time with citations — no training, no stale weights."
          },
          {
            "label": "No / not only — it needs new behavior, skill, format, or tone",
            "next": "data"
          }
        ]
      },
      "data": {
        "q": "How much task-specific demonstration data do you have?",
        "a": [
          {
            "label": "Just a handful of examples",
            "rec": "prompting",
            "why": "A well-crafted prompt (optionally few-shot) is the cheapest rung — always try it first."
          },
          {
            "label": "Dozens to a few hundred",
            "next": "fewshot"
          },
          {
            "label": "Thousands+ of high-quality examples",
            "next": "compute"
          }
        ]
      },
      "fewshot": {
        "q": "Does putting a few examples in the prompt (few-shot) already get you close enough?",
        "a": [
          {
            "label": "Yes, that's good enough",
            "rec": "few-shot",
            "why": "In-context learning needs zero training and zero infra — stop here if quality is acceptable."
          },
          {
            "label": "No — quality/consistency falls short",
            "next": "compute"
          }
        ]
      },
      "compute": {
        "q": "What is your GPU / VRAM situation for training?",
        "a": [
          {
            "label": "Limited — single or consumer GPU",
            "rec": "qlora",
            "why": "4-bit base + LoRA adapters fits big models on one GPU with near-zero quality loss.",
            "then": "preference"
          },
          {
            "label": "Comfortable — one large GPU",
            "rec": "lora",
            "why": "LoRA matches full fine-tuning on most tasks for a fraction of the cost, and merges cleanly.",
            "then": "preference"
          },
          {
            "label": "Multi-GPU cluster + large domain shift + lots of data",
            "rec": "full-ft",
            "why": "Maximum capacity is worth it only with a big domain gap, abundant data, and the hardware to shard state.",
            "then": "preference"
          }
        ]
      },
      "preference": {
        "q": "Follow-up: do you also need to align to human/AI PREFERENCES (helpfulness, safety, style) beyond demonstrations?",
        "a": [
          {
            "label": "Yes",
            "rec": "dpo",
            "why": "After SFT, DPO aligns to chosen/rejected preference pairs — far simpler than PPO, near-equal quality."
          },
          {
            "label": "It's a verifiable task (math/code/logic)",
            "rec": "rlvr",
            "why": "When correctness is checkable, RL with verifiable rewards (often via GRPO) beats a learned reward model."
          },
          {
            "label": "No, demonstrations are enough",
            "rec": "sft",
            "why": "Supervised fine-tuning on good demonstrations is sufficient when you don't need preference shaping."
          }
        ]
      }
    }
  },
  "guidedPath": {
    "title": "Worked example: base model → production support assistant",
    "steps": [
      {
        "id": "decoder-gpt",
        "note": "Start from a pretrained decoder-only base (e.g. Llama-3-8B)."
      },
      {
        "id": "dataset-prep",
        "note": "Curate a few thousand high-quality support conversations. Quality > quantity."
      },
      {
        "id": "sft",
        "note": "Supervised fine-tune on demonstrations to teach format, tone, and task."
      },
      {
        "id": "lora",
        "note": "Do it parameter-efficiently with LoRA (or QLoRA if VRAM-bound)."
      },
      {
        "id": "dpo",
        "note": "Collect chosen/rejected pairs and align with DPO — simpler than PPO."
      },
      {
        "id": "evaluation",
        "note": "Evaluate vs. a held-out set + benchmarks to catch regressions."
      },
      {
        "id": "quantization",
        "note": "Quantize to 4-bit (AWQ/GPTQ) for cheap, fast production serving."
      }
    ]
  },
  "comparisons": [
    {
      "id": "peft",
      "title": "PEFT methods",
      "blurb": "Parameter-efficient fine-tuning — how the major methods trade off cost, quality, and deployment.",
      "dimensions": [
        {
          "key": "family",
          "label": "Family"
        },
        {
          "key": "params",
          "label": "Trainable params"
        },
        {
          "key": "merge",
          "label": "Mergeable (no inference cost)"
        },
        {
          "key": "vram",
          "label": "VRAM"
        },
        {
          "key": "quality",
          "label": "Quality vs full-FT"
        },
        {
          "key": "bestfor",
          "label": "Best for"
        }
      ],
      "rows": [
        {
          "id": "lora",
          "family": "Reparameterization",
          "params": "~0.1–1%",
          "merge": "Yes",
          "vram": "Low",
          "quality": "Matches on most tasks",
          "bestfor": "Default PEFT choice"
        },
        {
          "id": "qlora",
          "family": "Reparam + 4-bit",
          "params": "~0.1–1%",
          "merge": "Yes",
          "vram": "Very low (4-bit)",
          "quality": "≈ 16-bit LoRA",
          "bestfor": "Big models on 1 GPU"
        },
        {
          "id": "dora",
          "family": "Reparameterization",
          "params": "~ LoRA",
          "merge": "Yes",
          "vram": "Low",
          "quality": "> LoRA at low rank",
          "bestfor": "Extra quality, low rank"
        },
        {
          "id": "adalora",
          "family": "Reparameterization",
          "params": "Budgeted",
          "merge": "Yes",
          "vram": "Low",
          "quality": "≥ LoRA (adaptive)",
          "bestfor": "Fixed budget, spent well"
        },
        {
          "id": "adapters",
          "family": "Additive",
          "params": "~0.5–5%",
          "merge": "No (adds layers)",
          "vram": "Low",
          "quality": "Strong",
          "bestfor": "Composable multi-task"
        },
        {
          "id": "prefix-tuning",
          "family": "Additive",
          "params": "Tiny",
          "merge": "No",
          "vram": "Very low",
          "quality": "Good (generation)",
          "bestfor": "Deep steering, gen tasks"
        },
        {
          "id": "prompt-tuning",
          "family": "Additive",
          "params": "Tiniest",
          "merge": "No",
          "vram": "Lowest",
          "quality": "Good only at scale",
          "bestfor": "Huge model, many tasks"
        },
        {
          "id": "ia3",
          "family": "Additive",
          "params": "Tiny",
          "merge": "Partial",
          "vram": "Very low",
          "quality": "Strong few-shot",
          "bestfor": "Extreme efficiency"
        },
        {
          "id": "bitfit",
          "family": "Selective",
          "params": "~0.1% (bias)",
          "merge": "Yes",
          "vram": "Very low",
          "quality": "Surprising baseline",
          "bestfor": "Quick baseline"
        }
      ]
    },
    {
      "id": "preference",
      "title": "Preference optimization",
      "blurb": "Aligning a model to preferences after SFT — what each method needs and how the pipeline differs.",
      "dimensions": [
        {
          "key": "rm",
          "label": "Needs reward model"
        },
        {
          "key": "ref",
          "label": "Needs reference model"
        },
        {
          "key": "mode",
          "label": "Online / Offline"
        },
        {
          "key": "data",
          "label": "Data format"
        },
        {
          "key": "stages",
          "label": "Pipeline"
        },
        {
          "key": "note",
          "label": "Note"
        }
      ],
      "rows": [
        {
          "id": "ppo",
          "family": "RLHF",
          "rm": "Yes",
          "ref": "Yes (KL)",
          "mode": "Online",
          "data": "Reward signal",
          "stages": "SFT → RM → PPO",
          "note": "Powerful but complex/unstable"
        },
        {
          "id": "dpo",
          "family": "Direct",
          "rm": "No",
          "ref": "Yes",
          "mode": "Offline",
          "data": "Chosen/rejected",
          "stages": "SFT → DPO",
          "note": "Simple — the default"
        },
        {
          "id": "ipo",
          "family": "Direct",
          "rm": "No",
          "ref": "Yes",
          "mode": "Offline",
          "data": "Chosen/rejected",
          "stages": "SFT → IPO",
          "note": "Regularized DPO (less overfit)"
        },
        {
          "id": "kto",
          "family": "Direct",
          "rm": "No",
          "ref": "Yes",
          "mode": "Offline",
          "data": "Binary good/bad",
          "stages": "SFT → KTO",
          "note": "Cheap labels (no pairs)"
        },
        {
          "id": "orpo",
          "family": "Direct",
          "rm": "No",
          "ref": "No",
          "mode": "Offline",
          "data": "Chosen/rejected",
          "stages": "Single stage (SFT+pref)",
          "note": "Reference-free, one stage"
        },
        {
          "id": "simpo",
          "family": "Direct",
          "rm": "No",
          "ref": "No",
          "mode": "Offline",
          "data": "Chosen/rejected",
          "stages": "SFT → SimPO",
          "note": "Reference-free, length-normalized"
        },
        {
          "id": "grpo",
          "family": "RL",
          "rm": "Optional / rule",
          "ref": "Yes (KL)",
          "mode": "Online",
          "data": "Group rewards",
          "stages": "SFT → GRPO",
          "note": "PPO without value model (reasoning)"
        }
      ]
    },
    {
      "id": "adaptation",
      "title": "Adaptation strategies",
      "blurb": "The core decision: how to specialize a base model, from cheapest (prompting) to heaviest (continued pretraining).",
      "dimensions": [
        {
          "key": "weights",
          "label": "Changes weights"
        },
        {
          "key": "knowledge",
          "label": "Adds knowledge"
        },
        {
          "key": "cost",
          "label": "Cost"
        },
        {
          "key": "speed",
          "label": "Iteration speed"
        },
        {
          "key": "bestfor",
          "label": "Best for"
        }
      ],
      "rows": [
        {
          "id": "prompting",
          "weights": "No",
          "knowledge": "Uses existing",
          "cost": "Lowest",
          "speed": "Instant",
          "bestfor": "Always try first"
        },
        {
          "id": "few-shot",
          "weights": "No",
          "knowledge": "Uses existing",
          "cost": "Lowest",
          "speed": "Instant",
          "bestfor": "A few examples, no training"
        },
        {
          "id": "rag",
          "weights": "No",
          "knowledge": "External, live",
          "cost": "Low–med",
          "speed": "Fast",
          "bestfor": "Fresh facts + citations"
        },
        {
          "id": "peft",
          "weights": "<1%",
          "knowledge": "New skill / style",
          "cost": "Medium",
          "speed": "Hours",
          "bestfor": "Behavior change, cheaply"
        },
        {
          "id": "full-ft",
          "weights": "All",
          "knowledge": "New skill / style",
          "cost": "High",
          "speed": "Hours–days",
          "bestfor": "Big shift + data + GPUs"
        },
        {
          "id": "continued-pretraining",
          "weights": "All (LM)",
          "knowledge": "Domain distribution",
          "cost": "Highest",
          "speed": "Days",
          "bestfor": "New domain language"
        }
      ]
    },
    {
      "id": "quantization",
      "title": "Quantization",
      "blurb": "Storing/computing weights in fewer bits to cut memory and speed up inference (or to make fine-tuning fit).",
      "dimensions": [
        {
          "key": "bits",
          "label": "Bits"
        },
        {
          "key": "type",
          "label": "Method"
        },
        {
          "key": "speed",
          "label": "Inference speed"
        },
        {
          "key": "accuracy",
          "label": "Accuracy"
        },
        {
          "key": "use",
          "label": "Primary use"
        }
      ],
      "rows": [
        {
          "id": "gptq",
          "bits": "3–4-bit",
          "type": "PTQ (Hessian-based)",
          "speed": "Fast",
          "accuracy": "Good",
          "use": "GPU inference serving"
        },
        {
          "id": "awq",
          "bits": "4-bit",
          "type": "PTQ (activation-aware)",
          "speed": "Fast",
          "accuracy": "Often > GPTQ",
          "use": "Edge / serving"
        },
        {
          "id": "bitsandbytes",
          "bits": "8 / 4-bit NF4",
          "type": "PTQ + training (NF4)",
          "speed": "Moderate",
          "accuracy": "High (NF4)",
          "use": "QLoRA training + loading"
        }
      ]
    },
    {
      "id": "attention",
      "title": "Attention variants",
      "blurb": "How modern LLMs shrink the KV cache while keeping quality — the attention design choice behind efficient long-context inference.",
      "dimensions": [
        {
          "key": "mechanism",
          "label": "Mechanism"
        },
        {
          "key": "kv",
          "label": "KV cache"
        },
        {
          "key": "quality",
          "label": "Quality"
        },
        {
          "key": "usedin",
          "label": "Used in"
        }
      ],
      "rows": [
        {
          "id": "multi-head",
          "mechanism": "Full Q/K/V per head",
          "kv": "Largest (1 KV/head)",
          "quality": "Baseline (best)",
          "usedin": "GPT-2/3, early LLMs"
        },
        {
          "id": "gqa",
          "mechanism": "Query heads share KV",
          "kv": "Reduced",
          "quality": "≈ MHA",
          "usedin": "Llama 2/3, Mistral, Qwen, Gemma"
        },
        {
          "id": "mla",
          "mechanism": "Low-rank latent K/V",
          "kv": "Smallest (~3–5× < GQA)",
          "quality": "≥ GQA",
          "usedin": "DeepSeek-V2/V3, Kimi"
        },
        {
          "id": "sliding-window-attention",
          "mechanism": "Local window only",
          "kv": "Bounded by window",
          "quality": "Local-biased",
          "usedin": "Mistral, Gemma 2, Phi-3"
        }
      ]
    },
    {
      "id": "architectures",
      "title": "Sequence architectures",
      "blurb": "Transformers vs. the linear-time challengers (SSMs, linear attention) and the hybrids that blend them.",
      "dimensions": [
        {
          "key": "compute",
          "label": "Compute"
        },
        {
          "key": "kv",
          "label": "KV / state"
        },
        {
          "key": "recall",
          "label": "Exact recall"
        },
        {
          "key": "longctx",
          "label": "Long context"
        },
        {
          "key": "examples",
          "label": "Examples"
        }
      ],
      "rows": [
        {
          "id": "transformer",
          "compute": "O(n²)",
          "kv": "Grows with length",
          "recall": "Strong (exact)",
          "longctx": "Costly",
          "examples": "GPT, Llama, Claude"
        },
        {
          "id": "mamba",
          "compute": "O(n) linear",
          "kv": "Constant state",
          "recall": "Weaker (compressed)",
          "longctx": "Cheap",
          "examples": "Falcon-Mamba, Codestral-Mamba"
        },
        {
          "id": "hybrid-ssm",
          "compute": "Mostly linear",
          "kv": "Small (few attn layers)",
          "recall": "Strong",
          "longctx": "Cheap + accurate",
          "examples": "Jamba, Nemotron-H, Granite 4"
        },
        {
          "id": "linear-attention",
          "compute": "O(n) linear",
          "kv": "Constant state",
          "recall": "Improving (gated/delta)",
          "longctx": "Cheap",
          "examples": "Qwen3-Next, MiniMax-01"
        }
      ]
    }
  ]
};
