# Reasoning & Test-Time

- [Long Chain-of-Thought](./long-cot.md) — Extended, self-correcting reasoning traces ("thinking" tokens) that backtrack, verify, and explore before answering.
- [Process Reward Model (PRM)](./process-reward-model.md) — Reward each step of a reasoning chain — not just the final answer — giving a denser signal for training and search.
- [Reasoning Distillation](./reasoning-distillation.md) — Distill long chain-of-thought traces from a large reasoner into a smaller model — cheap reasoning ability without running RL.
- [Reasoning Models](./reasoning-models.md) — Models trained to "think" before answering — spending test-time compute on long internal chains of thought (o1, DeepSeek-R1).
- [Self-Consistency](./self-consistency.md) — Sample multiple reasoning paths and take a majority vote on the answer — a cheap accuracy boost over greedy chain-of-thought.
- [Test-Time Compute Scaling](./test-time-compute.md) — Spend more compute at inference (longer reasoning, more samples, search) to raise accuracy — a new scaling axis beyond model size.
- [Tree-of-Thought (Search-Based Reasoning)](./tree-of-thought.md) — Explore multiple reasoning branches with explicit search (BFS/DFS) and state evaluation, instead of one linear chain.
- [Verifier-Based Search](./verifier-based-search.md) — Generate many candidate solutions and select with a verifier (process or outcome reward) rather than majority vote.
