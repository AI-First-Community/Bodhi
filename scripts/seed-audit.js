#!/usr/bin/env node
/* Curated additions from the multi-agent coverage audit (SME + reviewer + synthesis).
   Run once: node scripts/seed-audit.js  then: node scripts/okf.js build */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const BUNDLE = path.join(ROOT, 'knowledge');
const CONFIG = require(path.join(ROOT, 'okf.config.js'));

const NODES = [
  // ---- Architecture primitives (core gaps) ----
  { id: 'rope', cluster: 'architecture', level: 2, title: 'Rotary Position Embeddings (RoPE)',
    summary: 'Encode position as rotations applied to query/key vectors — relative-position aware and the basis for context-window extension.',
    detail: 'Rather than adding a position vector, RoPE rotates Q and K by an angle proportional to position, so attention naturally depends on *relative* offsets. It extrapolates better than learned/sinusoidal encodings and is the de-facto standard in Llama, Mistral, Qwen, and DeepSeek. RoPE scaling (NTK, YaRN, LongRoPE) is how short-context models get extended.',
    when: 'The positional scheme behind almost every modern decoder; key to understanding long-context extension.',
    relations: ['builds-on:positional-encoding', 'requires:self-attention', 'combines:context-extension'],
    refs: [['RoPE (RoFormer)', 'https://arxiv.org/abs/2104.09864']] },

  { id: 'rms-norm', cluster: 'architecture', level: 2, title: 'RMSNorm',
    summary: 'Normalize activations by their root-mean-square only (no mean-centering) — cheaper than LayerNorm at equal quality.',
    detail: 'RMSNorm drops the mean-subtraction and bias of LayerNorm, rescaling by RMS with a learned gain. It is faster and the modern decoder default (Llama, Mistral, Qwen). LayerNorm (the original Transformer norm, per-token mean/variance + affine) remains the baseline contrast and is still used in encoders.',
    when: 'The normalization layer in essentially every current LLM; contrast with LayerNorm.',
    relations: ['requires:transformer'],
    refs: [['RMSNorm (Zhang & Sennrich)', 'https://arxiv.org/abs/1910.07468']] },

  { id: 'swiglu', cluster: 'architecture', level: 2, title: 'SwiGLU (Gated FFN)',
    summary: 'A gated feed-forward block — SiLU(xW) ⊙ (xV) — that outperforms ReLU/GELU MLPs at equal parameter budget.',
    detail: 'SwiGLU replaces the FFN\'s single activation with a gated product: one linear branch passed through Swish/SiLU multiplies another linear branch. (The gate is SiLU, not sigmoid.) It is the FFN standard in Llama, Mistral, and Qwen; GELU is its smooth-ReLU predecessor from the BERT/GPT-2 era.',
    when: 'The FFN activation in modern decoders; a small architectural lever with consistent gains.',
    relations: ['improves-on:ffn'],
    refs: [['GLU Variants (Shazeer)', 'https://arxiv.org/abs/2002.05202']] },

  { id: 'mqa', cluster: 'architecture', level: 2, title: 'Multi-Query Attention (MQA)',
    summary: 'Share a single key/value head across all query heads — extreme KV-cache compression at a modest quality cost.',
    detail: 'The endpoint of the MHA → GQA → MQA spectrum: one KV head for every query head, shrinking the KV cache the most and speeding decoding, with some quality loss. GQA is the balanced middle ground; MQA was used in PaLM and Falcon.',
    when: 'When KV-cache memory dominates and you can tolerate a small quality hit; understand it to place GQA/MLA.',
    relations: ['improves-on:multi-head', 'alternative:gqa', 'combines:kv-cache'],
    refs: [['Fast Transformer Decoding (MQA)', 'https://arxiv.org/abs/1911.02150']] },

  // ---- Foundations ----
  { id: 'logit-softmax', cluster: 'foundations', level: 1, title: 'Logits & Softmax (Output Head)',
    summary: 'The final projection from hidden state to vocabulary logits, turned into a probability distribution by softmax — where sampling happens.',
    detail: 'The output head maps the last hidden state to one logit per vocabulary token; softmax (with temperature) converts logits to probabilities, and top-k / nucleus (top-p) sampling selects the next token. The output matrix is often *tied* to the input embedding matrix (weight tying) to save parameters.',
    when: 'Understand it to reason about temperature, sampling strategies, and how generation actually emits tokens.',
    relations: ['requires:embedding', 'combines:token'],
    refs: [['Weight Tying (Press & Wolf)', 'https://arxiv.org/abs/1608.05859']] },

  // ---- Efficiency / serving (core gaps) ----
  { id: 'paged-attention', cluster: 'efficiency', level: 5, title: 'PagedAttention',
    summary: 'Allocate the KV cache in non-contiguous blocks (OS-style virtual paging) to eliminate fragmentation and enable continuous batching.',
    detail: 'The KV cache normally needs a contiguous slab sized to the max length, wasting memory. PagedAttention (vLLM) pages it into fixed blocks mapped via a block table, cutting waste to near zero and enabling sharing across requests. The foundation of modern high-throughput serving.',
    when: 'The serving-side memory optimization behind vLLM; pairs with continuous batching and prefix caching.',
    relations: ['improves-on:kv-cache', 'combines:speculative-decoding'],
    refs: [['PagedAttention / vLLM', 'https://arxiv.org/abs/2309.06180']] },

  { id: 'continuous-batching', cluster: 'efficiency', level: 5, title: 'Continuous Batching',
    summary: 'Iteration-level scheduling that adds/removes requests from the running batch each decode step — 2–3× throughput vs. static batching.',
    detail: 'Static batching wastes the GPU waiting for the slowest sequence to finish. Continuous (in-flight) batching schedules at the token step, swapping completed requests out and new ones in, maximizing utilization and tail latency. Standard in vLLM, TGI, TensorRT-LLM.',
    when: 'The default request scheduler for any serious LLM serving deployment.',
    relations: ['requires:paged-attention', 'combines:speculative-decoding'],
    refs: [['vLLM (continuous batching)', 'https://arxiv.org/abs/2309.06180']] },

  { id: 'prefix-caching', cluster: 'efficiency', level: 5, title: 'Prefix Caching',
    summary: 'Cache and reuse the KV states of shared prefixes (system prompts, few-shot examples, RAG context) so they are not recomputed per request.',
    detail: 'Many requests share a long common prefix; prefix caching (RadixAttention in SGLang, automatic prefix caching in vLLM) stores its KV once and reuses it, skipping prefill for the shared part. Large latency/throughput wins for agents, RAG, and few-shot workloads.',
    when: 'Whenever requests share long prefixes — system prompts, tools, retrieved context.',
    relations: ['improves-on:kv-cache', 'combines:rag'],
    refs: [['RadixAttention / SGLang', 'https://arxiv.org/abs/2312.07104']] },

  { id: 'tensor-parallelism', cluster: 'efficiency', level: 5, title: 'Tensor Parallelism',
    summary: 'Split individual weight matrices across GPUs (column/row partitions with all-reduce) to run models larger than one GPU.',
    detail: 'Where FSDP/ZeRO shards optimizer state, tensor parallelism (Megatron-LM) partitions the matmuls themselves across devices, communicating activations each layer. Lower latency than pipeline parallelism but communication-heavy; usually combined with pipeline + data parallelism (3D parallelism) at scale.',
    when: 'Serving or training a model that exceeds a single GPU\'s memory or compute.',
    relations: ['alternative:fsdp-deepspeed', 'requires:full-ft'],
    refs: [['Megatron-LM', 'https://arxiv.org/abs/1909.08053']] },

  { id: 'multi-token-prediction', cluster: 'efficiency', level: 5, title: 'Multi-Token Prediction (MTP)',
    summary: 'Train auxiliary heads to predict several future tokens at once — better sample efficiency and built-in self-speculation at decode time.',
    detail: 'Instead of predicting only the next token, MTP adds heads that predict the next k tokens from a shared trunk, improving training signal and enabling cheap self-speculative decoding (the heads draft, the model verifies). Shipped in DeepSeek-V3 and used by Qwen3.',
    when: 'Pretraining for efficiency and to natively enable fast self-speculative inference.',
    relations: ['improves-on:speculative-decoding', 'combines:eagle-speculative'],
    refs: [['Multi-Token Prediction (Gloeckle et al)', 'https://arxiv.org/abs/2404.19737']] },

  // ---- Reasoning ----
  { id: 'tree-of-thought', cluster: 'reasoning', level: 5, title: 'Tree-of-Thought (Search-Based Reasoning)',
    summary: 'Explore multiple reasoning branches with explicit search (BFS/DFS) and state evaluation, instead of one linear chain.',
    detail: 'Tree-of-Thought frames problem solving as search over a tree of partial "thoughts," expanding promising branches and pruning dead ends with a value/heuristic. More powerful than single-chain CoT on planning and puzzles, at higher inference cost — a structured form of test-time compute.',
    when: 'Hard search/planning problems where a single chain of thought is insufficient.',
    relations: ['builds-on:cot', 'alternative:self-consistency', 'combines:test-time-compute'],
    refs: [['Tree of Thoughts (Yao et al)', 'https://arxiv.org/abs/2305.10601']] },

  { id: 'verifier-based-search', cluster: 'reasoning', level: 5, title: 'Verifier-Based Search',
    summary: 'Generate many candidate solutions and select with a verifier (process or outcome reward) rather than majority vote.',
    detail: 'A branch of test-time compute distinct from self-consistency: instead of voting, score candidates with a trained verifier / reward model (or a programmatic checker) and pick the best. With a strong verifier, scaling samples reliably improves accuracy — the basis of best-of-N and search-guided reasoning.',
    when: 'You have a good verifier/reward model and want to trade inference compute for accuracy.',
    relations: ['alternative:self-consistency', 'builds-on:process-reward-model', 'combines:test-time-compute'],
    refs: [['Scaling LLM Test-Time Compute', 'https://arxiv.org/abs/2408.03314']] },

  // ---- PEFT ----
  { id: 'vera', cluster: 'peft', level: 4, title: 'VeRA (Vector-based Random Matrix Adaptation)',
    summary: 'Freeze a single pair of random low-rank matrices shared across all layers and train only tiny per-layer scaling vectors — ~10× fewer params than LoRA.',
    detail: 'VeRA fixes one random A/B pair (shared everywhere) and learns only small per-layer scaling vectors, slashing trainable parameters (and checkpoint size) by roughly 10× versus LoRA at comparable quality. Useful when serving many task adapters cheaply. Supported in HuggingFace PEFT.',
    when: 'Extreme parameter/storage efficiency across many tasks, especially on large frozen models.',
    relations: ['improves-on:lora'],
    refs: [['VeRA', 'https://arxiv.org/abs/2310.11454']] },

  { id: 'reft', cluster: 'peft', level: 4, title: 'ReFT (Representation Fine-Tuning)',
    summary: 'Learn lightweight interventions on frozen hidden-state representations instead of editing weights — reportedly 15–65× more parameter-efficient than LoRA.',
    detail: 'ReFT (e.g. LoReFT) leaves all weights frozen and instead trains small interventions on activations in a low-rank subspace at selected layers/positions. A different paradigm from weight-delta PEFT (LoRA family), it is highly parameter-efficient and composable with LoRA.',
    when: 'You want maximal parameter efficiency or to steer behavior via representations rather than weights.',
    relations: ['alternative:lora'],
    refs: [['ReFT (Wu et al)', 'https://arxiv.org/abs/2404.03592']] },

  // ---- Agents & Retrieval ----
  { id: 'hybrid-retrieval', cluster: 'agents', level: 3, title: 'Hybrid Retrieval',
    summary: 'Combine dense (embedding) and lexical (BM25) retrieval — and sometimes structured queries — via fusion (RRF) for better recall and precision.',
    detail: 'Dense retrieval captures semantics but misses exact terms/rare tokens; BM25 nails lexical matches but not paraphrase. Hybrid retrieval runs both and fuses results (Reciprocal Rank Fusion or learned routing), often followed by a reranker. Production-standard for robust RAG; Anthropic\'s Contextual Retrieval is a strong recipe.',
    when: 'Almost any production RAG system — hybrid + rerank is the reliable default.',
    relations: ['improves-on:rag', 'combines:retrieval-reranking', 'combines:embedding'],
    refs: [['Contextual Retrieval (Anthropic)', 'https://www.anthropic.com/news/contextual-retrieval']] },

  // ---- Data & Evaluation ----
  { id: 'preference-data', cluster: 'dataeval', level: 3, title: 'Preference Data Collection',
    summary: 'Gathering the chosen/rejected comparisons that drive RLHF/DPO — by humans (pairwise/ranked) or by AI (RLAIF/constitutional).',
    detail: 'Alignment quality is capped by preference-data quality. Methods: pairwise comparisons, ranked lists, and rating scales from human annotators; or AI-generated preferences (RLAIF) guided by a constitution. Concerns: annotator agreement, coverage, and reward-model evaluation (RewardBench) of the resulting signal.',
    when: 'Before any RLHF/DPO/KTO run — this data, not the algorithm, usually determines the ceiling.',
    relations: ['requires:dataset-prep', 'combines:reward-model', 'combines:dpo'],
    refs: [['InstructGPT (preference pipeline)', 'https://arxiv.org/abs/2203.02155']] },

  { id: 'contamination-detection', cluster: 'dataeval', level: 3, title: 'Benchmark Contamination Detection',
    summary: 'Detecting train/test leakage (string, n-gram, or embedding overlap; membership-inference) and decontaminating — a first-class honesty concern in 2026 eval.',
    detail: 'As benchmarks leak into pretraining corpora, scores inflate. Detection ranges from exact/n-gram and embedding overlap to membership-inference probes; remediation means decontaminating training data and preferring fresh, contamination-limited benchmarks (LiveBench, time-windowed sets). Always report decontamination methodology.',
    when: 'Whenever you trust a benchmark number — verify it is not contaminated.',
    relations: ['improves-on:benchmarks', 'combines:dataset-prep'],
    refs: [['LiveBench (contamination-limited)', 'https://arxiv.org/abs/2406.19314']] },

  { id: 'data-valuation', cluster: 'dataeval', level: 4, title: 'Data Valuation & Example Importance',
    summary: 'Score how much each training example contributes to model quality — influence functions, Data Shapley, gradient-based methods — to find harmful or redundant samples.',
    detail: 'Not all data helps equally; some hurts. Data valuation estimates per-example contribution (influence functions, Shapley values, gradient tracing) to surface mislabeled, duplicated, or low-value samples and prioritize curation budget. Increasingly used to clean and select fine-tuning sets.',
    when: 'Debugging a dataset — finding the examples that help, hurt, or are redundant.',
    relations: ['combines:dataset-prep'],
    refs: [['Influence Functions (Koh & Liang)', 'https://arxiv.org/abs/1703.04730']] },
];

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
  const out = [`# ${n.title}`, '', n.detail, '', '## When to use', '', n.when, '', '## References', ''];
  n.refs.forEach(([t, u]) => out.push(`- [${t}](${u})`));
  return out.join('\n') + '\n';
}
let written = 0;
for (const n of NODES) {
  if (!CONFIG.CLUSTERS[n.cluster]) { console.error('! unknown cluster', n.cluster); continue; }
  fs.mkdirSync(path.join(BUNDLE, n.cluster), { recursive: true });
  fs.writeFileSync(path.join(BUNDLE, n.cluster, n.id + '.md'), fm(n) + '\n\n' + body(n));
  written++;
}
console.log(`seed-audit ✓ wrote ${written} concept files`);
