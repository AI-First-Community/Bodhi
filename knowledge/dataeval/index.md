# Data & Evaluation

- [Agentic & Contamination-Resistant Eval](./agentic-eval.md) — Modern evaluation: agent task benchmarks (SWE-bench Verified, GAIA, τ-bench, WebArena) and contamination-limited, frequently-refreshed suites (LiveBench, ARC-AGI-2).
- [Benchmark Contamination Detection](./contamination-detection.md) — Detecting train/test leakage (string, n-gram, or embedding overlap; membership-inference) and decontaminating — a first-class honesty concern in 2026 eval.
- [Benchmarks](./benchmarks.md) — Standardized tests (MMLU, GSM8K, HumanEval, IFEval) for comparable capability signals.
- [Dataset Curation](./dataset-prep.md) — The highest-leverage step: quality, diversity, and de-duplication beat raw volume.
- [Evaluation](./evaluation.md) — Measure what fine-tuning actually changed — accuracy, regressions, safety.
- [LLM-as-Judge](./llm-as-judge.md) — Use a strong model to score/compare outputs — scalable proxy for human eval.
- [Model Collapse](./model-collapse.md) — Recursively training on model-generated data erodes distribution tails, causing irreversible quality degradation — the core caution for synthetic data.
- [Model-Based Data Filtering](./model-based-filtering.md) — Use a trained classifier (fastText or LLM-distilled) to score and select pretraining documents by quality — the dominant lever for data quality.
- [Preference Data Collection](./preference-data.md) — Gathering the chosen/rejected comparisons that drive RLHF/DPO — by humans (pairwise/ranked) or by AI (RLAIF/constitutional).
- [Synthetic Data](./synthetic-data.md) — Generate training data with a stronger model (self-instruct, Evol-Instruct, distillation).
- [Data Valuation & Example Importance](./data-valuation.md) — Score how much each training example contributes to model quality — influence functions, Data Shapley, gradient-based methods — to find harmful or redundant samples.
