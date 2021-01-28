---
title: Inference on Selected Subgroups in Clinical Trials
toc: true
recommend: 1
keywords: 
tags: Note
categories:
  - Note
abbrlink: issct
date: 2021-01-27 18:00:00

mathjax: true
---
 
This note is based on the **[X. Guo and X. He (2020), Inference on Selected Subgroups in Clinical Trials, Journal of American Statistical Association](https://www.tandfonline.com/doi/full/10.1080/01621459.2020.1740096)**

## Subgroup Analyses and Selection bias Overview

Subgroup analyses figure out promising treatments to some subgroups. In practice, subgroup analyses consists of two steps: subgroup identification and subgroup confirmation. In the identification step, researchers looks for the best selected subgroup which comes from domain considerations or data-driven. The existing data-driven identification methods are mostly machine-learning based or model based. The confirmation step provides an inference for possibly additional trials on the identified subgroup. Generally, The inference to the selected subgroup may lead to an overly optimistic evaluation, which is called subgroup selection bias. This kind of bias is originated from the selection mechanism of $\max\limits_{i=1,\cdots,k}(\beta_i)$. Some of the existing methods for subgroup confirmation might be conservative, without theoretical justification, or model-dependent. Thus, this paper proposes a (data-adaptive) de-biasing bootstrap estimate and a valid one-sided confidence bound.

## Procedure

For predifined subgroups, the interested estimators are the \textbf{best selected subgroup effect} $\beta_s$ (the true effect size of the subgroup with the largest estimated effect) and \textbf{best subgroup effect} $\beta_{\max}$ (the largest true subgroup effect size). The procedure is: 

1. Obtain the largest modified bootstrapped subgroup effect $\beta^*_{\max,\text{modified}}=\max\limits_{i=1,\cdots,k}(\beta^*_i+d_i)$ with modification $d_i=(1-n^{r-0.5})(\hat\beta_{\max}-\hat\beta_i)$
2. Construct the bootstrap confidence interval $\hat\beta_{\max}\pm c_\alpha/\sqrt{n}$ with $c_{\alpha}=quantile(\sqrt{n}(\max\limits_{i=1,\cdots,k}(\beta^*_{i,b}+d_i)-\hat\beta_{\max}),1-\alpha)$ (asymptotically sharp interval for $\beta_s$).
3. Derive the bias-reduced estimator $\hat\beta_{\max,\text{reduced}}=\hat\beta_{\max}-E^*[\beta^*_{\max,\text{modified}}-\hat\beta_{\max}]$
4.  For data-adaptive $r$, tune $r$ with cross validation and bias-reduced estimator.

While considering the post-hoc subgroup identification, the procedure is similar to the predefined subgroup identification but no data-adaptive selection for $r$.

## Possible Extention

This method is useful for homogeneous subgroups, because the subgroup selection bias in the homogeneous subgroups might be larger than one in the heterogeneous subgroups. When the subgroup effects are heterogeneous, the naive approach of subgroup identification provide an efficient enough result with less empirical bias. However, the tradeoff among the tuning parameter $r$, heterogeneity, and number of subgroups has not been discussed. 

With the simulation provided in this paper, the bias and coverage get worse when the number of subgroups or $r$ gets large. When $r$ gets large, it means that the effect modification $d$ goes to 0. We could also discover that the empirical bias with small $r$ performs better than large $r$ in homogeneous subgroups setting. However, this situation is reversed in heterogeneous setting. Thus, the relationship between modification, heterogeneity, and number of subgroups might be a potential issue to work on.

Another possible extension associates with the confounding adjustment, especially for trial data and observational studies. This method allows overlapped subgroup; that is, we cannot think the subgroup as the stratification. With confounding adjustment, the subgroup effect size should be reconsidered.

