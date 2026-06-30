---
type: "PEFT Method"
title: "Layer Freezing"
description: "Freeze lower layers, fine-tune only the top few — simplest selective method."
cluster: "peft"
level: 4
tags:
  - "peft"
  - "fine-tuning-techniques"
when_to_use: "Small datasets, classification heads, limited compute."
---

# Layer Freezing

Lower layers hold general features, upper layers are task-specific. Freezing reduces compute and forgetting. Common with BERT classification heads.

## When to use

Small datasets, classification heads, limited compute.
