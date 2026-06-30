/* ============================================================================
   LLM BODHI — Controlled vocabulary + presentation flows (Node + browser)
   Single source of truth for everything that is NOT a concept ("knowledge").
   The OKF bundle under knowledge/ holds the concepts (nodes) and their typed
   relations (edges); this file holds clusters, relation types, levels, and the
   interactive flows. build.js inlines this into the generated js/data.js.
   ============================================================================ */
(function (root, factory) {
  const o = factory();
  if (typeof module === 'object' && module.exports) module.exports = o; // Node (build.js)
  else { root.CLUSTERS = o.CLUSTERS; root.RELATIONS = o.RELATIONS; root.LEVELS = o.LEVELS;
         root.CLUSTER_TYPE = o.CLUSTER_TYPE; root.DECISION_TREE = o.DECISION_TREE; root.GUIDED_PATH = o.GUIDED_PATH;
         root.RELEASE = o.RELEASE; }
})(typeof self !== 'undefined' ? self : this, function () {

  // Current release. Concepts whose frontmatter `added:` equals `version` are
  // surfaced as "new" in the app. Bump on each release and tag new concepts with
  // the new version to highlight what changed.
  const RELEASE = { version: '0.4.0', label: 'v0.4.0' };

  const CLUSTERS = {
    foundations:  { label: 'Foundations',           color: '#3b82f6' },
    architecture: { label: 'Architecture',          color: '#8b5cf6' },
    modeltypes:   { label: 'Model Archetypes',      color: '#06b6d4' },
    adaptation:   { label: 'Adaptation Spectrum',   color: '#f59e0b' },
    peft:         { label: 'PEFT',                  color: '#10b981' },
    sft:          { label: 'SFT / Instruction',     color: '#84cc16' },
    alignment:    { label: 'Alignment / Preference', color: '#ef4444' },
    reasoning:    { label: 'Reasoning & Test-Time',  color: '#14b8a6' },
    agents:       { label: 'Agents & Retrieval',     color: '#f97316' }, // orange
    efficiency:   { label: 'Efficiency & Infra',    color: '#ec4899' },
    dataeval:     { label: 'Data & Evaluation',     color: '#a78bfa' },
  };

  // OKF `type` value assigned to each cluster's concepts (required frontmatter field)
  const CLUSTER_TYPE = {
    foundations: 'Concept',
    architecture: 'Architecture Component',
    modeltypes: 'Model Archetype',
    adaptation: 'Adaptation Strategy',
    peft: 'PEFT Method',
    sft: 'Training Method',
    alignment: 'Alignment Method',
    reasoning: 'Reasoning Method',
    agents: 'Agent / Retrieval Method',
    efficiency: 'Efficiency Technique',
    dataeval: 'Practice',
  };

  const LEVELS = {
    1: 'Foundations',
    2: 'Core Mechanics',
    3: 'Adaptation Basics',
    4: 'Fine-Tuning Techniques',
    5: 'Advanced / Alignment',
  };

  const RELATIONS = {
    'is-a':        { label: 'is a type of',    color: '#64748b', style: 'solid'  },
    'improves-on': { label: 'improves on',     color: '#10b981', style: 'solid'  },
    'alternative': { label: 'alternative to',  color: '#f59e0b', style: 'dashed' },
    'requires':    { label: 'requires',        color: '#ef4444', style: 'solid'  },
    'combines':    { label: 'combines with',   color: '#06b6d4', style: 'dotted' },
    'builds-on':   { label: 'builds on',       color: '#8b5cf6', style: 'solid'  },
    'path':        { label: 'example step',    color: '#fbbf24', style: 'solid'  },
  };

  const DECISION_TREE = {
    start: 'knowledge',
    steps: {
      knowledge: {
        q: 'Is the gap mainly missing or fast-changing FACTS — docs, policies, product data, knowledge that updates often?',
        a: [
          { label: 'Yes — it needs current, citable facts', rec: 'rag',
            why: 'Retrieval injects fresh knowledge at query time with citations — no training, no stale weights.' },
          { label: 'No / not only — it needs new behavior, skill, format, or tone', next: 'data' },
        ],
      },
      data: {
        q: 'How much task-specific demonstration data do you have?',
        a: [
          { label: 'Just a handful of examples', rec: 'prompting',
            why: 'A well-crafted prompt (optionally few-shot) is the cheapest rung — always try it first.' },
          { label: 'Dozens to a few hundred', next: 'fewshot' },
          { label: 'Thousands+ of high-quality examples', next: 'compute' },
        ],
      },
      fewshot: {
        q: 'Does putting a few examples in the prompt (few-shot) already get you close enough?',
        a: [
          { label: 'Yes, that\'s good enough', rec: 'few-shot',
            why: 'In-context learning needs zero training and zero infra — stop here if quality is acceptable.' },
          { label: 'No — quality/consistency falls short', next: 'compute' },
        ],
      },
      compute: {
        q: 'What is your GPU / VRAM situation for training?',
        a: [
          { label: 'Limited — single or consumer GPU', rec: 'qlora',
            why: '4-bit base + LoRA adapters fits big models on one GPU with near-zero quality loss.', then: 'preference' },
          { label: 'Comfortable — one large GPU', rec: 'lora',
            why: 'LoRA matches full fine-tuning on most tasks for a fraction of the cost, and merges cleanly.', then: 'preference' },
          { label: 'Multi-GPU cluster + large domain shift + lots of data', rec: 'full-ft',
            why: 'Maximum capacity is worth it only with a big domain gap, abundant data, and the hardware to shard state.', then: 'preference' },
        ],
      },
      preference: {
        q: 'Follow-up: do you also need to align to human/AI PREFERENCES (helpfulness, safety, style) beyond demonstrations?',
        a: [
          { label: 'Yes', rec: 'dpo',
            why: 'After SFT, DPO aligns to chosen/rejected preference pairs — far simpler than PPO, near-equal quality.' },
          { label: 'It\'s a verifiable task (math/code/logic)', rec: 'rlvr',
            why: 'When correctness is checkable, RL with verifiable rewards (often via GRPO) beats a learned reward model.' },
          { label: 'No, demonstrations are enough', rec: 'sft',
            why: 'Supervised fine-tuning on good demonstrations is sufficient when you don\'t need preference shaping.' },
        ],
      },
    },
  };

  const GUIDED_PATH = {
    title: 'Worked example: base model → production support assistant',
    steps: [
      { id: 'decoder-gpt',  note: 'Start from a pretrained decoder-only base (e.g. Llama-3-8B).' },
      { id: 'dataset-prep', note: 'Curate a few thousand high-quality support conversations. Quality > quantity.' },
      { id: 'sft',          note: 'Supervised fine-tune on demonstrations to teach format, tone, and task.' },
      { id: 'lora',         note: 'Do it parameter-efficiently with LoRA (or QLoRA if VRAM-bound).' },
      { id: 'dpo',          note: 'Collect chosen/rejected pairs and align with DPO — simpler than PPO.' },
      { id: 'evaluation',   note: 'Evaluate vs. a held-out set + benchmarks to catch regressions.' },
      { id: 'quantization', note: 'Quantize to 4-bit (AWQ/GPTQ) for cheap, fast production serving.' },
    ],
  };

  // Side-by-side comparison matrices. Each technique row links to its graph node
  // by `id`. Dimensions are the columns. Keep values terse (table cells).
  const COMPARISONS = [
    {
      id: 'peft',
      title: 'PEFT methods',
      blurb: 'Parameter-efficient fine-tuning — how the major methods trade off cost, quality, and deployment.',
      dimensions: [
        { key: 'family',  label: 'Family' },
        { key: 'params',  label: 'Trainable params' },
        { key: 'merge',   label: 'Mergeable (no inference cost)' },
        { key: 'vram',    label: 'VRAM' },
        { key: 'quality', label: 'Quality vs full-FT' },
        { key: 'bestfor', label: 'Best for' },
      ],
      rows: [
        { id: 'lora',          family: 'Reparameterization', params: '~0.1–1%',     merge: 'Yes', vram: 'Low',            quality: 'Matches on most tasks', bestfor: 'Default PEFT choice' },
        { id: 'qlora',         family: 'Reparam + 4-bit',    params: '~0.1–1%',     merge: 'Yes', vram: 'Very low (4-bit)', quality: '≈ 16-bit LoRA',         bestfor: 'Big models on 1 GPU' },
        { id: 'dora',          family: 'Reparameterization', params: '~ LoRA',      merge: 'Yes', vram: 'Low',            quality: '> LoRA at low rank',    bestfor: 'Extra quality, low rank' },
        { id: 'adalora',       family: 'Reparameterization', params: 'Budgeted',    merge: 'Yes', vram: 'Low',            quality: '≥ LoRA (adaptive)',     bestfor: 'Fixed budget, spent well' },
        { id: 'adapters',      family: 'Additive',           params: '~0.5–5%',     merge: 'No (adds layers)', vram: 'Low', quality: 'Strong',               bestfor: 'Composable multi-task' },
        { id: 'prefix-tuning', family: 'Additive',           params: 'Tiny',        merge: 'No',  vram: 'Very low',       quality: 'Good (generation)',     bestfor: 'Deep steering, gen tasks' },
        { id: 'prompt-tuning', family: 'Additive',           params: 'Tiniest',     merge: 'No',  vram: 'Lowest',         quality: 'Good only at scale',    bestfor: 'Huge model, many tasks' },
        { id: 'ia3',           family: 'Additive',           params: 'Tiny',        merge: 'Partial', vram: 'Very low',   quality: 'Strong few-shot',       bestfor: 'Extreme efficiency' },
        { id: 'bitfit',        family: 'Selective',          params: '~0.1% (bias)', merge: 'Yes', vram: 'Very low',      quality: 'Surprising baseline',   bestfor: 'Quick baseline' },
      ],
    },
    {
      id: 'preference',
      title: 'Preference optimization',
      blurb: 'Aligning a model to preferences after SFT — what each method needs and how the pipeline differs.',
      dimensions: [
        { key: 'rm',     label: 'Needs reward model' },
        { key: 'ref',    label: 'Needs reference model' },
        { key: 'mode',   label: 'Online / Offline' },
        { key: 'data',   label: 'Data format' },
        { key: 'stages', label: 'Pipeline' },
        { key: 'note',   label: 'Note' },
      ],
      rows: [
        { id: 'ppo',   family: 'RLHF', rm: 'Yes',         ref: 'Yes (KL)', mode: 'Online',  data: 'Reward signal',     stages: 'SFT → RM → PPO',      note: 'Powerful but complex/unstable' },
        { id: 'dpo',   family: 'Direct', rm: 'No',        ref: 'Yes',      mode: 'Offline', data: 'Chosen/rejected',   stages: 'SFT → DPO',           note: 'Simple — the default' },
        { id: 'ipo',   family: 'Direct', rm: 'No',        ref: 'Yes',      mode: 'Offline', data: 'Chosen/rejected',   stages: 'SFT → IPO',           note: 'Regularized DPO (less overfit)' },
        { id: 'kto',   family: 'Direct', rm: 'No',        ref: 'Yes',      mode: 'Offline', data: 'Binary good/bad',   stages: 'SFT → KTO',           note: 'Cheap labels (no pairs)' },
        { id: 'orpo',  family: 'Direct', rm: 'No',        ref: 'No',       mode: 'Offline', data: 'Chosen/rejected',   stages: 'Single stage (SFT+pref)', note: 'Reference-free, one stage' },
        { id: 'simpo', family: 'Direct', rm: 'No',        ref: 'No',       mode: 'Offline', data: 'Chosen/rejected',   stages: 'SFT → SimPO',         note: 'Reference-free, length-normalized' },
        { id: 'grpo',  family: 'RL',    rm: 'Optional / rule', ref: 'Yes (KL)', mode: 'Online', data: 'Group rewards', stages: 'SFT → GRPO',          note: 'PPO without value model (reasoning)' },
      ],
    },
    {
      id: 'adaptation',
      title: 'Adaptation strategies',
      blurb: 'The core decision: how to specialize a base model, from cheapest (prompting) to heaviest (continued pretraining).',
      dimensions: [
        { key: 'weights', label: 'Changes weights' },
        { key: 'knowledge', label: 'Adds knowledge' },
        { key: 'cost',    label: 'Cost' },
        { key: 'speed',   label: 'Iteration speed' },
        { key: 'bestfor', label: 'Best for' },
      ],
      rows: [
        { id: 'prompting',              weights: 'No',        knowledge: 'Uses existing',     cost: 'Lowest',   speed: 'Instant',     bestfor: 'Always try first' },
        { id: 'few-shot',               weights: 'No',        knowledge: 'Uses existing',     cost: 'Lowest',   speed: 'Instant',     bestfor: 'A few examples, no training' },
        { id: 'rag',                    weights: 'No',        knowledge: 'External, live',    cost: 'Low–med',  speed: 'Fast',        bestfor: 'Fresh facts + citations' },
        { id: 'peft',                   weights: '<1%',       knowledge: 'New skill / style', cost: 'Medium',   speed: 'Hours',       bestfor: 'Behavior change, cheaply' },
        { id: 'full-ft',                weights: 'All',       knowledge: 'New skill / style', cost: 'High',     speed: 'Hours–days',  bestfor: 'Big shift + data + GPUs' },
        { id: 'continued-pretraining',  weights: 'All (LM)',  knowledge: 'Domain distribution', cost: 'Highest', speed: 'Days',       bestfor: 'New domain language' },
      ],
    },
    {
      id: 'quantization',
      title: 'Quantization',
      blurb: 'Storing/computing weights in fewer bits to cut memory and speed up inference (or to make fine-tuning fit).',
      dimensions: [
        { key: 'bits',     label: 'Bits' },
        { key: 'type',     label: 'Method' },
        { key: 'speed',    label: 'Inference speed' },
        { key: 'accuracy', label: 'Accuracy' },
        { key: 'use',      label: 'Primary use' },
      ],
      rows: [
        { id: 'gptq',         bits: '3–4-bit',      type: 'PTQ (Hessian-based)',     speed: 'Fast',     accuracy: 'Good',          use: 'GPU inference serving' },
        { id: 'awq',          bits: '4-bit',        type: 'PTQ (activation-aware)',  speed: 'Fast',     accuracy: 'Often > GPTQ',  use: 'Edge / serving' },
        { id: 'bitsandbytes', bits: '8 / 4-bit NF4', type: 'PTQ + training (NF4)',   speed: 'Moderate', accuracy: 'High (NF4)',    use: 'QLoRA training + loading' },
      ],
    },
    {
      id: 'attention',
      title: 'Attention variants',
      blurb: 'How modern LLMs shrink the KV cache while keeping quality — the attention design choice behind efficient long-context inference.',
      dimensions: [
        { key: 'mechanism', label: 'Mechanism' },
        { key: 'kv',        label: 'KV cache' },
        { key: 'quality',   label: 'Quality' },
        { key: 'usedin',    label: 'Used in' },
      ],
      rows: [
        { id: 'multi-head',              mechanism: 'Full Q/K/V per head',     kv: 'Largest (1 KV/head)',     quality: 'Baseline (best)',  usedin: 'GPT-2/3, early LLMs' },
        { id: 'gqa',                     mechanism: 'Query heads share KV',    kv: 'Reduced',                 quality: '≈ MHA',            usedin: 'Llama 2/3, Mistral, Qwen, Gemma' },
        { id: 'mla',                     mechanism: 'Low-rank latent K/V',     kv: 'Smallest (~3–5× < GQA)',  quality: '≥ GQA',            usedin: 'DeepSeek-V2/V3, Kimi' },
        { id: 'sliding-window-attention', mechanism: 'Local window only',      kv: 'Bounded by window',       quality: 'Local-biased',     usedin: 'Mistral, Gemma 2, Phi-3' },
      ],
    },
    {
      id: 'architectures',
      title: 'Sequence architectures',
      blurb: 'Transformers vs. the linear-time challengers (SSMs, linear attention) and the hybrids that blend them.',
      dimensions: [
        { key: 'compute',  label: 'Compute' },
        { key: 'kv',       label: 'KV / state' },
        { key: 'recall',   label: 'Exact recall' },
        { key: 'longctx',  label: 'Long context' },
        { key: 'examples', label: 'Examples' },
      ],
      rows: [
        { id: 'transformer',     compute: 'O(n²)',         kv: 'Grows with length',     recall: 'Strong (exact)',      longctx: 'Costly',            examples: 'GPT, Llama, Claude' },
        { id: 'mamba',           compute: 'O(n) linear',   kv: 'Constant state',        recall: 'Weaker (compressed)', longctx: 'Cheap',             examples: 'Falcon-Mamba, Codestral-Mamba' },
        { id: 'hybrid-ssm',      compute: 'Mostly linear', kv: 'Small (few attn layers)', recall: 'Strong',            longctx: 'Cheap + accurate',  examples: 'Jamba, Nemotron-H, Granite 4' },
        { id: 'linear-attention', compute: 'O(n) linear',  kv: 'Constant state',        recall: 'Improving (gated/delta)', longctx: 'Cheap',         examples: 'Qwen3-Next, MiniMax-01' },
      ],
    },
  ];

  return { CLUSTERS, CLUSTER_TYPE, LEVELS, RELATIONS, RELEASE, DECISION_TREE, GUIDED_PATH, COMPARISONS };
});
