#!/usr/bin/env node
/* ============================================================================
   LLM BODHI — 2026 currency seed
   Writes vetted OKF markdown files for the curated 2025–2026 concept additions.
   Run once:  node scripts/seed-2026.js   then:  node scripts/okf.js build
   Idempotent: overwrites the same files. Relations target existing or new ids.
   ============================================================================ */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const BUNDLE = path.join(ROOT, 'knowledge');
const CONFIG = require(path.join(ROOT, 'okf.config.js'));

// id, cluster, level, title, summary, detail, when, code?, relations[], refs[ [title,url] ]
const NODES = [
  // ---------------- ARCHITECTURE ----------------
  { id: 'gqa', cluster: 'architecture', level: 2, title: 'Grouped-Query Attention (GQA)',
    summary: 'Share one key/value head across a group of query heads — shrinks the KV cache with near-MHA quality.',
    detail: 'Interpolates between Multi-Head Attention (one KV head per query head) and Multi-Query Attention (a single shared KV head). By grouping query heads to share an intermediate number of KV heads, it cuts KV-cache memory and speeds decoding at minimal quality cost. Now the default attention in Llama 2/3, Mistral, Gemma, and Qwen.',
    when: 'Essentially the standard choice for decoder LLMs that need efficient long-context inference.',
    relations: ['improves-on:multi-head', 'alternative:mla', 'combines:kv-cache'],
    refs: [['GQA (Ainslie 2023)', 'https://arxiv.org/abs/2305.13245']] },

  { id: 'mla', cluster: 'architecture', level: 2, title: 'Multi-head Latent Attention (MLA)',
    summary: 'Compress keys/values into a shared low-rank latent vector — ~3–5× smaller KV cache than GQA at equal or better quality.',
    detail: 'Instead of caching full K/V per head, MLA jointly compresses them into a small latent that is cached and re-expanded at use. Gives a much larger effective state at a fraction of the memory. Core to DeepSeek-V2/V3 and adopted by Kimi and others.',
    when: 'When you want the strongest KV-cache reduction for long-context serving without GQA-level quality loss.',
    relations: ['improves-on:multi-head', 'alternative:gqa', 'requires:attention', 'combines:kv-cache'],
    refs: [['DeepSeek-V2', 'https://arxiv.org/abs/2405.04434']] },

  { id: 'sliding-window-attention', cluster: 'architecture', level: 2, title: 'Sliding-Window Attention (SWA)',
    summary: 'Each layer attends only to a fixed local window; stacked layers still propagate information far beyond it.',
    detail: 'Caps attention cost at O(n·w) instead of O(n²) by restricting each token to a window of recent tokens (e.g. 4096). Information flows further as it passes up the layer stack. Used in Mistral, Gemma 2, Phi-3, and GPT-OSS, often interleaved with full-attention layers.',
    when: 'Long sequences where most relevant context is local and you want linear-ish cost.',
    relations: ['alternative:attention', 'combines:kv-cache'],
    refs: [['Mistral 7B', 'https://arxiv.org/abs/2310.06825']] },

  { id: 'mamba', cluster: 'architecture', level: 2, title: 'Mamba / State-Space Models (SSM)',
    summary: 'Selective state-space sequence model with linear-time recurrence and constant memory per token — an attention-free alternative.',
    detail: 'SSMs (S4 → Mamba) model sequences with a learned recurrence instead of pairwise attention. Mamba adds input-dependent (selective) state updates and a hardware-aware parallel scan; Mamba-2\'s state-space duality (SSD) ties SSMs to linear attention and is the block used in most 2025 hybrids. Linear time, constant KV-free memory.',
    when: 'Very long sequences and high-throughput inference where the O(n²) attention cost dominates.',
    relations: ['alternative:transformer', 'alternative:attention'],
    refs: [['Mamba-2: Transformers are SSMs', 'https://arxiv.org/abs/2405.21060']] },

  { id: 'hybrid-ssm', cluster: 'architecture', level: 2, title: 'Hybrid SSM–Transformer',
    summary: 'Interleave a majority of Mamba/linear layers with a minority of full-attention layers — long-context throughput with retained recall.',
    detail: 'Pure SSMs are efficient but weaker at precise recall; pure attention is costly. Hybrids keep ~1 attention layer per several SSM layers to get both. Shipped at scale in Jamba (AI21), NVIDIA Nemotron-H, and IBM Granite 4.0, cutting KV memory and roughly doubling inference speed at parity.',
    when: 'Production long-context models that need Transformer-level quality at much lower serving cost.',
    relations: ['combines:mamba', 'combines:attention', 'builds-on:transformer'],
    refs: [['Nemotron-H', 'https://arxiv.org/abs/2504.03624'], ['Jamba', 'https://arxiv.org/abs/2403.19887']] },

  { id: 'linear-attention', cluster: 'architecture', level: 2, title: 'Linear Attention',
    summary: 'Replace softmax attention with a kernel/recurrent form that is linear in sequence length and supports O(1) decoding.',
    detail: 'A family — RetNet, Gated Linear Attention (GLA), Gated DeltaNet, Lightning Attention — that reformulates attention so it can run in parallel, recurrent, or chunkwise modes with constant per-token state. Gated DeltaNet powers Qwen3-Next; Lightning Attention powers MiniMax-01. Newer sparse-attention work (NSA, DeepSeek Sparse Attention) is a related thread.',
    when: 'When you need attention-like quality with linear cost and constant-memory decoding.',
    relations: ['alternative:attention', 'combines:transformer'],
    refs: [['Gated Linear Attention', 'https://arxiv.org/abs/2312.06635']] },

  // ---------------- LONG CONTEXT (foundations cluster) ----------------
  { id: 'context-extension', cluster: 'foundations', level: 4, title: 'Context-Window Extension',
    summary: 'Stretch a model\'s usable context far past its trained length by rescaling RoPE positions, usually with brief fine-tuning.',
    detail: 'Methods rescale rotary position encodings so out-of-range positions stay in distribution: Position Interpolation, NTK-aware, YaRN (now common in Qwen), and LongRoPE (to 2M+, used in Phi-3). LongLoRA adds shifted-sparse attention so the extension can be learned cheaply with LoRA.',
    when: 'You need a longer window than the base model was trained for and can afford a short fine-tune.',
    code: 'rope_scaling = {"type": "yarn", "factor": 4.0, "original_max_position_embeddings": 8192}',
    relations: ['builds-on:positional-encoding', 'requires:context-window', 'combines:lora'],
    refs: [['YaRN', 'https://arxiv.org/abs/2309.00071'], ['LongRoPE', 'https://arxiv.org/abs/2402.13753']] },

  { id: 'long-context-limits', cluster: 'foundations', level: 2, title: 'Long-Context Limitations',
    summary: 'A model\'s *effective* context is far below its advertised window — recall degrades long before the window fills.',
    detail: '"Lost in the middle" (U-shaped positional bias) and "context rot" (non-uniform degradation as input grows, even with perfect retrieval) mean a 1M-token window rarely means 1M tokens of reliable recall. Benchmarks like RULER and NoLiMa measure the real, much smaller, effective length. This is why RAG and context engineering stay relevant despite huge windows.',
    when: 'Always factor this in when choosing long-context prompting vs. RAG; do not trust the advertised window.',
    relations: ['requires:context-window', 'alternative:rag'],
    refs: [['RULER', 'https://arxiv.org/abs/2404.06654'], ['Lost in the Middle', 'https://arxiv.org/abs/2307.03172']] },

  // ---------------- EFFICIENCY ----------------
  { id: 'fp8-training', cluster: 'efficiency', level: 4, title: 'FP8 Training & Inference',
    summary: '8-bit floating point (E4M3/E5M2) — the default production precision on Hopper/Blackwell, validated for training at 600B+ scale.',
    detail: 'FP8 halves memory and roughly doubles throughput vs BF16 while keeping enough range/precision for stable training with per-tensor or blockwise scaling. DeepSeek-V3 demonstrated native blockwise FP8 training at 671B parameters; FP8 inference is now standard in serving stacks.',
    when: 'Default training/inference precision on modern datacenter GPUs when kernels support it.',
    relations: ['improves-on:mixed-precision', 'builds-on:quantization'],
    refs: [['DeepSeek-V3 Technical Report', 'https://arxiv.org/abs/2412.19437']] },

  { id: 'mxfp4', cluster: 'efficiency', level: 4, title: 'FP4 Microscaling (MXFP4 / NVFP4)',
    summary: '4-bit floating point with block-shared scales — native on Blackwell, used both for inference and increasingly for training.',
    detail: 'MXFP4 (OCP standard): E2M1 values in blocks of 32 sharing an E8M0 scale. NVFP4 is NVIDIA\'s finer-grained variant (16-element blocks, two-level FP8+FP32 scaling) — do not conflate the two. FP4 gives ~2–3× the arithmetic throughput and ~half the memory of FP8; MXFP4 is the checkpoint format behind GPT-OSS.',
    when: 'Aggressive memory/throughput wins on Blackwell-class hardware where a small accuracy hit is acceptable.',
    relations: ['improves-on:quantization', 'requires:mixed-precision', 'alternative:gptq'],
    refs: [['NVIDIA: Introducing NVFP4', 'https://developer.nvidia.com/blog/introducing-nvfp4-for-efficient-and-accurate-low-precision-inference/']] },

  { id: 'galore', cluster: 'efficiency', level: 4, title: 'GaLore (Gradient Low-Rank Projection)',
    summary: 'Project gradients/optimizer state into a periodically-recomputed low-rank subspace — memory-efficient *full-parameter* training, not an adapter.',
    detail: 'Unlike LoRA (which restricts the weight update to low rank), GaLore keeps full-rank weight updates but compresses the optimizer state by projecting gradients onto a low-rank subspace, cutting optimizer memory up to ~65%. Lets you full-fine-tune a 7B model on a single consumer GPU. Related low-memory optimizers: LOMO/AdaLOMO, Fira, APOLLO, BAdam.',
    when: 'You want full-FT quality but are optimizer-memory-bound and LoRA\'s low-rank limit is hurting.',
    relations: ['alternative:lora', 'requires:full-ft', 'combines:mixed-precision'],
    refs: [['GaLore', 'https://arxiv.org/abs/2403.03507']] },

  { id: 'eagle-speculative', cluster: 'efficiency', level: 5, title: 'Self-Speculative Decoding (EAGLE / MTP)',
    summary: 'Draft tokens from the model\'s own features or trained multi-token-prediction heads, not a separate draft model — the production speculative-decoding default.',
    detail: 'EAGLE-3 predicts future tokens from fused intermediate features; multi-token-prediction (MTP) heads are trained natively (DeepSeek-V3, Qwen3). Both give lossless 2–4× decode speedups and have superseded Medusa and standalone draft models in vLLM/SGLang/TRT-LLM.',
    when: 'Cut generation latency/cost at serving time with zero change to output distribution.',
    relations: ['improves-on:speculative-decoding'],
    refs: [['EAGLE-3', 'https://arxiv.org/abs/2503.01840']] },

  // ---------------- PEFT ----------------
  { id: 'rslora', cluster: 'peft', level: 4, title: 'rsLoRA (Rank-Stabilized LoRA)',
    summary: 'Scale LoRA by α/√r instead of α/r so higher ranks actually help instead of collapsing gradients.',
    detail: 'Vanilla LoRA\'s α/r scaling makes large ranks underperform; the √r correction stabilizes gradients so increasing rank reliably improves quality. A one-flag change (use_rslora=True) in HuggingFace PEFT.',
    when: 'Any time you want to use larger LoRA ranks without the usual plateau.',
    code: 'LoraConfig(r=64, lora_alpha=16, use_rslora=True, target_modules=[...])',
    relations: ['improves-on:lora'],
    refs: [['Rank-Stabilized LoRA', 'https://arxiv.org/abs/2312.03732']] },

  { id: 'pissa', cluster: 'peft', level: 4, title: 'PiSSA (Principal Singular-Value Init)',
    summary: 'Initialize the LoRA A/B matrices from the principal singular vectors of W (via SVD) and freeze the residual — much faster convergence than random init.',
    detail: 'Vanilla LoRA starts adapters from noise/zero; PiSSA starts them from the dominant directions of the pretrained weight, so training begins aligned with what matters (e.g. 72.9% vs 67.7% GSM8K on Mistral-7B). First-class in HuggingFace PEFT (init_lora_weights="pissa"). Related inits: OLoRA, LoRA-GA, CorDA; LoftQ does the same for quantized bases.',
    when: 'Drop-in LoRA upgrade when you want faster, higher convergence at no inference cost.',
    code: 'LoraConfig(r=16, init_lora_weights="pissa", target_modules=[...])',
    relations: ['improves-on:lora'],
    refs: [['PiSSA', 'https://arxiv.org/abs/2404.02948']] },

  // ---------------- ALIGNMENT ----------------
  { id: 'dapo', cluster: 'alignment', level: 5, title: 'DAPO',
    summary: 'Open-source GRPO recipe that fixes its instabilities: decoupled clip ("clip-higher"), dynamic sampling, token-level loss, overlong-reward shaping.',
    detail: 'GRPO is powerful but suffers entropy collapse and length/token bias. DAPO bundles four practical fixes that stabilize long reasoning-RL runs and made open reproduction of R1-style training reliable.',
    when: 'Running GRPO-style reasoning RL and hitting instability or length blow-up.',
    relations: ['improves-on:grpo', 'builds-on:rlvr'],
    refs: [['DAPO', 'https://arxiv.org/abs/2503.14476']] },

  { id: 'gspo', cluster: 'alignment', level: 5, title: 'Group Sequence Policy Optimization (GSPO)',
    summary: 'Define the RL importance ratio at the sequence level (not per token) for sequence-level clipping — stabilizes MoE RL.',
    detail: 'Token-level ratios (as in GRPO/PPO) destabilize training of large MoE models. GSPO clips at the sequence level, giving more stable updates; it powers Qwen3 post-training.',
    when: 'Reasoning RL on large or MoE models where token-level methods are unstable.',
    relations: ['improves-on:grpo', 'alternative:dapo'],
    refs: [['GSPO', 'https://arxiv.org/abs/2507.18071']] },

  { id: 'generative-reward-model', cluster: 'alignment', level: 5, title: 'Generative Reward Models (GenRM)',
    summary: 'Reward models that write a chain-of-thought critique before/with the score — more accurate, interpretable, and extendable to non-verifiable domains.',
    detail: 'Classic reward models emit a single scalar (Bradley-Terry). GenRMs generate a reasoned judgment, can be scaled at inference time, and bridge RLHF with LLM-as-judge. Approaches like DeepSeek-GRM/SPCT extend verifiable-reward training to soft, non-checkable domains.',
    when: 'When a scalar reward is too brittle or you need rewards in domains without a programmatic verifier.',
    relations: ['improves-on:reward-model', 'combines:llm-as-judge'],
    refs: [['Inference-Time Scaling for Generalist Reward Modeling', 'https://arxiv.org/abs/2504.02495']] },

  // ---------------- AGENTS & RETRIEVAL (new cluster) ----------------
  { id: 'agentic-rag', cluster: 'agents', level: 3, title: 'Agentic RAG',
    summary: 'RAG where an agent decides when, what, and how to retrieve — with planning, reflection, multi-hop, and tool use — instead of a fixed retrieve-then-read pipeline.',
    detail: 'Replaces single-shot retrieval with an agent loop that can reformulate queries, retrieve iteratively, verify, and combine sources. Often trained with RL (e.g. Search-R1). The backbone of deep-research agents.',
    when: 'Complex, multi-step questions where one retrieval pass is not enough.',
    relations: ['improves-on:rag', 'combines:react'],
    refs: [['Agentic RAG: A Survey', 'https://arxiv.org/abs/2501.09136']] },

  { id: 'graphrag', cluster: 'agents', level: 3, title: 'GraphRAG',
    summary: 'Build an LLM-extracted entity/relationship knowledge graph plus community summaries to answer global, multi-hop "sense-making" queries vector RAG misses.',
    detail: 'Indexes a corpus into a knowledge graph and hierarchical community summaries, so the agent can traverse relationships rather than only match nearby chunks. Microsoft\'s LazyGraphRAG slashes the (notoriously high) indexing cost by orders of magnitude.',
    when: 'Global or multi-hop questions ("what are the themes across this corpus?") that flat vector RAG answers poorly.',
    relations: ['improves-on:rag', 'combines:embedding'],
    refs: [['Microsoft GraphRAG', 'https://www.microsoft.com/en-us/research/project/graphrag/']] },

  { id: 'retrieval-reranking', cluster: 'agents', level: 3, title: 'Retrieval Reranking',
    summary: 'A second stage that re-scores first-stage retrieval candidates for relevance — cross-encoders, ColBERT late interaction, or LLM listwise rerankers.',
    detail: 'First-stage dense/BM25 retrieval favors recall; a reranker (joint query-document cross-encoder, or token-level late-interaction like ColBERT/ColPali) restores precision, typically +5–15 nDCG. Standard in production RAG and a cheap accuracy lever.',
    when: 'Almost always worth adding to a RAG pipeline to lift answer grounding quality.',
    relations: ['improves-on:rag', 'combines:embedding'],
    refs: [['ColBERT', 'https://arxiv.org/abs/2004.12832']] },

  { id: 'mcp', cluster: 'agents', level: 3, title: 'Model Context Protocol (MCP)',
    summary: 'An open standard ("USB-C for AI") for connecting LLM agents to tools and data via a JSON-RPC client/server interface — now the de-facto tool-interop layer.',
    detail: 'Introduced by Anthropic (Nov 2024); each tool publishes a machine-readable description so agents discover and invoke it without bespoke integrations. Adopted by OpenAI, Google, and Microsoft through 2025 and donated to the Linux Foundation\'s Agentic AI Foundation (Dec 2025). Complemented by agent-to-agent protocols like A2A.',
    when: 'Building agents that must connect to many tools/data sources in a portable, standard way.',
    relations: ['builds-on:react', 'combines:rag'],
    refs: [['Model Context Protocol (Anthropic)', 'https://www.anthropic.com/news/model-context-protocol']] },

  { id: 'agent-memory', cluster: 'agents', level: 3, title: 'Agent Memory',
    summary: 'Persistent long-term memory layers that page facts/preferences in and out of context across sessions — beyond stuffing full history into the window.',
    detail: 'Systems like MemGPT/Letta (OS-style tiered core/recall/archival memory via tool calls), Mem0 (vector+graph memory service), and Zep/Graphiti (bi-temporal knowledge-graph memory) give agents durable state. The standard "four memory types" framing: working, episodic, semantic, procedural.',
    when: 'Long-running or multi-session agents that must remember user facts, decisions, and history.',
    relations: ['combines:rag', 'requires:context-window'],
    refs: [['Mem0', 'https://arxiv.org/abs/2504.19413']] },

  { id: 'computer-use', cluster: 'agents', level: 3, title: 'Computer-Use / GUI Agents',
    summary: 'Vision-language agents that operate real desktops/browsers via screenshots plus mouse/keyboard actions — general control beyond brittle RPA scripts.',
    detail: 'A screenshot → reason → act (click/type/scroll) loop, OS-agnostic at the pixel level (Claude Computer Use) or DOM-aware (Gemini). Evaluated on OSWorld and WebArena, where scores are improving but still trail humans — the reliability gap is the honest story.',
    when: 'Automating GUI tasks that lack an API; expect to engineer for reliability.',
    relations: ['builds-on:react'],
    refs: [['OSWorld', 'https://os-world.github.io/']] },

  { id: 'context-engineering', cluster: 'agents', level: 3, title: 'Context Engineering',
    summary: 'The discipline of assembling the right tokens — instructions, memory, retrieved facts, tool results — into the window for each step. "Prompt engineering" is now a subset.',
    detail: 'Popularized by Lütke and Karpathy (June 2025) and codified by Anthropic, this reframes prompting as a systems problem: dynamically curate and compact context (RAG, memory, tool outputs) to combat context rot and stay within effective length. Central to agent and RAG design in 2026.',
    when: 'Designing any non-trivial agent/RAG system — the whole context, not just the prompt wording, is what you optimize.',
    relations: ['builds-on:prompting', 'combines:rag'],
    refs: [['Effective Context Engineering (Anthropic)', 'https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents']] },

  // ---------------- DATA & EVALUATION ----------------
  { id: 'model-based-filtering', cluster: 'dataeval', level: 3, title: 'Model-Based Data Filtering',
    summary: 'Use a trained classifier (fastText or LLM-distilled) to score and select pretraining documents by quality — the dominant lever for data quality.',
    detail: 'Replaces heuristic/perplexity-only cleaning. FineWeb-Edu scores "educational quality" to match performance on ~10× fewer tokens; DataComp-LM (DCLM) standardized model-based filtering as a benchmark. Paired with dedup (MinHash/LSH, SemDeDup) and synthetic rephrasing (WRAP, Nemotron-CC).',
    when: 'Curating any large pretraining or domain corpus — spend effort here before scaling tokens.',
    relations: ['improves-on:dataset-prep', 'combines:synthetic-data'],
    refs: [['FineWeb / FineWeb-Edu', 'https://arxiv.org/abs/2406.17557'], ['DataComp-LM', 'https://arxiv.org/abs/2406.11794']] },

  { id: 'model-collapse', cluster: 'dataeval', level: 3, title: 'Model Collapse',
    summary: 'Recursively training on model-generated data erodes distribution tails, causing irreversible quality degradation — the core caution for synthetic data.',
    detail: 'When models learn mostly from prior models\' outputs, rare patterns vanish and quality decays generation over generation. Mitigations: anchor on accumulated real data (not replacement), and verify/filter synthetic samples before training.',
    when: 'Any pipeline leaning heavily on synthetic data — keep a real-data anchor and verification step.',
    relations: ['combines:synthetic-data'],
    refs: [['AI models collapse on recursive data (Nature 2024)', 'https://www.nature.com/articles/s41586-024-07566-y']] },

  { id: 'agentic-eval', cluster: 'dataeval', level: 3, title: 'Agentic & Contamination-Resistant Eval',
    summary: 'Modern evaluation: agent task benchmarks (SWE-bench Verified, GAIA, τ-bench, WebArena) and contamination-limited, frequently-refreshed suites (LiveBench, ARC-AGI-2).',
    detail: 'As MMLU/GSM8K saturated and contamination grew, eval shifted to (1) verifiable agent tasks — resolving real GitHub issues (SWE-bench Verified), tool-use QA (GAIA), tool-agent-user dialogue (τ-bench); and (2) fresh, objectively-scored sets that resist leakage (LiveBench monthly, ARC-AGI-2, FrontierMath, GPQA-Diamond, Humanity\'s Last Exam).',
    when: 'Choosing benchmarks in 2026 — prefer agentic and contamination-resistant signals over saturated classics.',
    relations: ['improves-on:benchmarks', 'combines:rlvr'],
    refs: [['SWE-bench Verified (OpenAI)', 'https://openai.com/index/introducing-swe-bench-verified/'], ['LiveBench', 'https://arxiv.org/abs/2406.19314']] },
];

// ---- serialize (mirrors scripts/okf.js exporter format) --------------------
function q(v) { return typeof v === 'number' ? String(v) : JSON.stringify(String(v)); }
function fm(n) {
  const lines = ['---', `type: ${q(CONFIG.CLUSTER_TYPE[n.cluster])}`, `title: ${q(n.title)}`,
    `description: ${q(n.summary)}`, `cluster: ${q(n.cluster)}`, `level: ${n.level}`,
    'tags:', `  - ${q(n.cluster)}`, `when_to_use: ${q(n.when)}`, 'relations:'];
  n.relations.forEach((r) => lines.push(`  - ${q(r)}`));
  lines.push('references:');
  n.refs.forEach(([t, u]) => lines.push(`  - ${q(t + '|' + u)}`));
  if (n.refs[0]) lines.push(`resource: ${q(n.refs[0][1])}`);
  lines.push('---');
  return lines.join('\n');
}
function body(n) {
  const out = [`# ${n.title}`, '', n.detail, ''];
  if (n.code) out.push('## Example', '', '```python', n.code, '```', '');
  out.push('## When to use', '', n.when, '', '## References', '');
  n.refs.forEach(([t, u]) => out.push(`- [${t}](${u})`));
  return out.join('\n') + '\n';
}

let written = 0;
for (const n of NODES) {
  if (!CONFIG.CLUSTERS[n.cluster]) { console.error(`! unknown cluster ${n.cluster} for ${n.id}`); continue; }
  const dir = path.join(BUNDLE, n.cluster);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, n.id + '.md'), fm(n) + '\n\n' + body(n));
  written++;
}
console.log(`seed-2026 ✓ wrote ${written} concept files`);
