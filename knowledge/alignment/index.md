# Alignment / Preference

- [DAPO](./dapo.md) — Open-source GRPO recipe that fixes its instabilities: decoupled clip ("clip-higher"), dynamic sampling, token-level loss, overlong-reward shaping.
- [DPO](./dpo.md) — Direct Preference Optimization — skip the reward model & RL; optimize preferences with a simple loss.
- [Generative Reward Models (GenRM)](./generative-reward-model.md) — Reward models that write a chain-of-thought critique before/with the score — more accurate, interpretable, and extendable to non-verifiable domains.
- [Group Sequence Policy Optimization (GSPO)](./gspo.md) — Define the RL importance ratio at the sequence level (not per token) for sequence-level clipping — stabilizes MoE RL.
- [GRPO](./grpo.md) — Group Relative Policy Optimization — PPO without a value model; advantage = reward vs. the group mean.
- [IPO](./ipo.md) — Identity-PO: a DPO variant that adds regularization to curb overfitting to preferences.
- [KTO](./kto.md) — Kahneman-Tversky Optimization — align using simple good/bad labels, not paired comparisons.
- [ORPO](./orpo.md) — Odds-Ratio PO — combine SFT and preference alignment into ONE stage, no reference model.
- [PPO](./ppo.md) — The RL algorithm in classic RLHF — policy-gradient updates clipped for stability, with KL control.
- [Rejection Sampling (Best-of-N)](./rejection-sampling.md) — Sample many responses, keep the best (per reward model / verifier), then SFT on them.
- [Reward Model](./reward-model.md) — A model trained on human preference rankings to score how good a response is.
- [RLAIF / Constitutional AI](./rlaif.md) — Use an AI (guided by a written constitution) instead of humans to generate preference labels.
- [RLHF](./rlhf.md) — Align with human preferences: SFT → train a reward model → optimize policy with RL (PPO).
- [RLVR (Verifiable Rewards)](./rlvr.md) — RL where the reward is a programmatic check (unit tests pass, answer matches) — no reward model.
- [SimPO](./simpo.md) — Simple PO — reference-free DPO using length-normalized reward, often stronger than DPO.
