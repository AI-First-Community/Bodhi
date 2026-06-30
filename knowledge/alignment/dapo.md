---
type: "Alignment Method"
title: "DAPO"
description: "Open-source GRPO recipe that fixes its instabilities: decoupled clip (\"clip-higher\"), dynamic sampling, token-level loss, overlong-reward shaping."
cluster: "alignment"
level: 5
tags:
  - "alignment"
when_to_use: "Running GRPO-style reasoning RL and hitting instability or length blow-up."
relations:
  - "improves-on:grpo"
  - "builds-on:rlvr"
references:
  - "DAPO|https://arxiv.org/abs/2503.14476"
resource: "https://arxiv.org/abs/2503.14476"
---

# DAPO

GRPO is powerful but suffers entropy collapse and length/token bias. DAPO bundles four practical fixes that stabilize long reasoning-RL runs and made open reproduction of R1-style training reliable.

## When to use

Running GRPO-style reasoning RL and hitting instability or length blow-up.

## References

- [DAPO](https://arxiv.org/abs/2503.14476)
