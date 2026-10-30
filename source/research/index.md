---
title: Research
date: 2026-10-28 21:30:00
comments: false
---

## Research interests

My research develops statistical methods that carry rare-variant analysis from discovery to interpretation. In biobank-scale sequencing studies, I work on gene-based association tests that use continuous functional annotations, on estimating the effects of different kinds of variants, and on calibrating continuous variant scores so that they can inform variant interpretation.

My second line of work is causal inference for time-to-event outcomes. I have developed mediation methods for survival outcomes with multiple causally ordered mediators, and I plan to continue developing causal mediation methods for biomedical studies.

## Selected projects

### 1. Annotation-informed rare-variant association tests for biobanks

![a, Rare variants in a gene; height and color show a continuous annotation score. b, Variant sets formed adaptively along the score. c, Estimated odds ratio with 95% confidence interval for each set. Simulated values for illustration.](vacant.svg)

Most rare variants are too rare to test one at a time, so gene-based tests pool them, usually keeping only the variants that pass a fixed annotation cutoff. My dissertation method, VACANT, uses continuous functional annotation scores to form variant sets adaptively and estimates an effect size for each annotation stratum, so the results show which kinds of variants drive an association. Its extension, VACANT-M, accounts for genetic relatedness and population structure through a mixed model. I presented this work as a platform talk at IGES 2026 and as posters at ASHG 2024 and 2025.

[Read the abstract (*Genetic Epidemiology*, 2026)](https://doi.org/10.1002/gepi.70057)

### 2. Calibrating continuous variant scores across variant types

![a, A premature stop more than 55 nucleotides upstream of the last exon junction triggers nonsense-mediated decay; a premature stop in the last exon escapes it, and the protein loses its tail. b, Two frameshifts with nearly the same CADD PHRED score receive opposite evidence from SHARC (example from the ASHG 2026 poster). c, Missense variants (\*scored by existing calibrated predictors) and the variant classes that SHARC scores, on one likelihood-ratio scale; simulated values.](sharc.svg)

Missense variants have many continuous pathogenicity scores, but loss-of-function SNVs and indels lack well-calibrated scores that can be compared with missense scores on the same scale. SHARC improves severity prediction for loss-of-function SNVs and indels and recalibrates coding-variant scores across variant types, with the goal of supporting variant interpretation. I presented this work as a poster at ASHG 2026.

### 3. Mediation analysis for survival outcomes with ordered mediators

![A, exposure; M₁ and M₂, causally ordered mediators; T, survival time. Each panel highlights one path-specific effect: a, direct; b, through M₂ only; c, through M₁.](mediation.svg)

Mediation analysis asks how much of an exposure's effect on an outcome passes through intermediate variables. For survival outcomes with several mediators, earlier methods required special models, such as probit or additive hazards models, or assumed that the outcome was rare. We defined path-specific effects through causally ordered mediators under the Cox proportional hazards model without the rare-outcome assumption, derived closed-form expressions on a transformed survival time and on survival probabilities, and applied the method to a hepatitis study of liver cancer risk.

[Read the paper (*Statistics in Medicine*, 2019)](https://doi.org/10.1002/sim.8058)

### 4. Collaboration: the genetics of stuttering

A genome-wide association study of more than one million individuals, analyzed by sex and ancestry, identified 57 loci for stuttering. I contributed a secondary heterogeneity analysis.

[Read the paper (*Nature Genetics*, 2025)](https://doi.org/10.1038/s41588-025-02267-2) · [Free full text (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC12339392/)
