---
type: "Adaptation Strategy"
title: "Continued Pretraining"
description: "More self-supervised pretraining on domain text (law, code, medicine) before any SFT."
cluster: "adaptation"
level: 3
tags:
  - "adaptation"
  - "adaptation-basics"
when_to_use: "Your domain language differs sharply from web text and you have lots of unlabeled domain corpus."
---

# Continued Pretraining

aka DAPT (domain-adaptive pretraining). Injects domain vocabulary and distributions into the base model. Followed by SFT + alignment. Used to make code/medical/legal base models.

## When to use

Your domain language differs sharply from web text and you have lots of unlabeled domain corpus.
