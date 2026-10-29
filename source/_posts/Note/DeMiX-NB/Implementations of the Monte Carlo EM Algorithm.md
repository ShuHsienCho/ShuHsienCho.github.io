---
title: Implementations of the Monte Carlo EM Algorithm
toc: true
recommend: 1
keywords: 
tags: 
  - Note
  - EM Algorithm
  - Monte Carlo
  - DeMiX-NB
categories:
  - Note
abbrlink: imcem
date: 2023-01-10 18:00:00

mathjax: true
---

This note is based on the **[R. Levine and G. Casella (2001), Implementations of the Monte Carlo EM Algorithm, Journal of Computational and Graphical Statistics](https://www.jstor.org/stable/1391097)**

<!-- more -->


## Monte Carlo EM Algorithm

### Overview

MCEM is a modification of the EM algorithm where the conditional expectation of log-likelihood in the E-step is computed numerically through Monte Carlo simulations, and MCMC sampler (Gibbs Sampler / Metropolis-Hasting) is the most flexible approach for Monte Carlo sample.

### Target

- **Minimizing computational cost** from non-closed form E-step (Problem from Wei(1990) original paper) to approximate the posterior: importance sampling whereby samples drawn during previous EM iterations are recycled
- **Choosing sample size**: regenerate approximate samples by subsampling the generated MCMC sample during different renewal periods.

### Existing paper

- Booth an Hobert(1990): Gauge error by increase sample size as algorithm converges, but requires i.i.d. samples or importance weighted.
- MCMC: Though the random variates are dependent in such a scenario, the E-step estimator is still unbiased and approaches the true value as the sample size increases.

### Notation

- Observed data: $\mathbf{y} = (y_1,\cdots,y_n)^T$
- Parameters: $\mathbf{\Psi}$
- MLE is simpler to compute on the data augmented by a set of latent variables $\mathbf{u}=(u_1,\cdots,u_q)^T$
- conditional distribution of the latent variables:  $g\left(\mathbf{u}|\mathbf{y,\Psi^{(r)}}\right)$ with iteration $r$
- EM: Complete data likelihood: $Q\left(\mathbf{\Psi}|\hat{\mathbf{\Psi}}^{(r)}\right)=E_{\hat{\mathbf{\Psi}}^{(r)}}\{\text{ln} f(\mathbf{y,u}|\mathbf{\Psi})|\mathbf{y}\}=\int\text{ln} f(\mathbf{y,u}|\mathbf{\Psi})g\left(\mathbf{u}|\mathbf{y,\Psi^{(r)}}\right)d\mathbf{u}$ and maximize it over $\mathbf{\Psi}$
- Obtain a sample $\mathbf{u^{(r)}_1},\cdots,\mathbf{u^{(r)}_m}$ from conditional distribution, the expectation can be estimated by Monte Carlo sum $Q\left(\mathbf{\Psi}|\hat{\mathbf{\Psi}}^{(r)}\right)=\dfrac{1}{m}\sum\limits^m_{t=1}\text{ln}f\left(\mathbf{y,u^{(r)}_t|\Psi}\right)$
- $m$ denotes the dependence of this estimator on the MC sample size.

So, how could we obtain a random sample from $g\left(\mathbf{u}|\mathbf{y,\Psi}\right)$ , and how do we choose $m$?

### Importance Sampling

Drawing an MCMC sample each iteration of the EM algorithm could be prohibitively costly particularly for large $m$. 

- Importance weight $w_t=\dfrac{g\left(\mathbf{u}_t|\mathbf{y,\Psi^{(r)}}\right)}{g\left(\mathbf{u}_t|\mathbf{y,\Psi^{(0)}}\right)}=\dfrac{L(\mathbf{\hat{\Psi}^{(r)}|u_t,y}))/L(\mathbf{\hat{\Psi}^{(r)}|y})}{L(\mathbf{\hat{\Psi}^{(0)}|u_t,y})/L(\mathbf{\hat{\Psi}^{(0)}|y})}$ corrects the original sample $\mathbf{u}$ with the new information we have at iteration $r$
- How much expense do we save? The expense saving with respect to the weights are not dependent on the unknown likelihood $L(\mathbf{\Psi|y})$ because it would be cancelled
- Reasonable choice:
$Q_m\left(\mathbf{\Psi}|\hat{\mathbf{\Psi}}^{(r)}\right)=\dfrac{\sum\limits^m_{t=1}w_t\text{ln}f\left(\mathbf{y,u^{(r)}_t|\Psi}\right)}{\sum\limits^m_{i=1}w_t}=\dfrac{\sum\limits^m_{t=1}w'_t\text{ln}f\left(\mathbf{y,u_t|\Psi}\right)}{\sum\limits^m_{i=1}w'_t}$
- $w'_t=\dfrac{L(\mathbf{\hat{\Psi}^{(r)}|u_t,y})}{L(\mathbf{\Psi^{(0)}|u_t,y})}$
- The reasonable choice has smaller MSE than the below one (Liu 1996 and Casella 1998).
- Another choice of important sampling: $Q_m\left(\mathbf{\Psi}|\hat{\mathbf{\Psi}}^{(r)}\right)=\dfrac{1}{m}\sum\limits^m_{t=1}w_t\text{ln}f\left(\mathbf{y,u_t|\Psi}\right)$. This would not affect the EM because the normalizing constant $\dfrac{L(\mathbf{\Psi^{(0)}|y})}{L(\mathbf{\hat{\Psi}^{(r)}|y})}$ only depends on initial value and updated estimate with iteration $r$ and does not involve the maximization. Use the reasonable one could avoid calculation of normalizing constant when choosing m.
- Burn-in in first few iteration: This approach fails when the estimates with $r$ iteration is too far from the initial value. The target density would be close enough to have small variance. Burn-in time is problem specific depending on how close we need to be to the MLE in order to obtain stable importance weights in subsequent M-steps. Trial runs of the EM algorithm with importance sampling, gauging the variability in the importance weights as the algorithm converges, will provide the user with an idea for the appropriate burn-in time.

### Algorithm

1. Initialize $m$ and $\mathbf{\Psi}^{(0)}$
2. Generate $\mathbf{u_1},\cdots,\mathbf{u_m}\sim g\left(\mathbf{u}|\mathbf{y,\Psi^{(0)}}\right)$ via MCMC
3. At iteration $r+1$, compute the importance weight $w_t=\dfrac{L(\mathbf{\hat{\Psi}^{(r)}|u_t,y})}{L(\mathbf{\Psi^{(0)}|u_t,y})}$
4. E-step: estimate $Q\left(\mathbf{\Psi}|\hat{\mathbf{\Psi}}^{(r)}\right)$ by
$Q_m\left(\mathbf{\Psi}|\hat{\mathbf{\Psi}}^{(r)}\right)=\dfrac{\sum\limits^m_{t=1}w_t\text{ln}f\left(\mathbf{y,u_t|\Psi}\right)}{\sum\limits^m_{i=1}w_t}$
5. M-step: $\max\limits_{\Psi}Q_m\left(\mathbf{\Psi}|\hat{\mathbf{\Psi}}^{(r)}\right)$ to obtain $\hat{\mathbf{\Psi}}^{(r+1)}$
6. MC error estimation:
    1. Compute for each $j=1,\cdots,s$, $\hat\mu_{m;j}=\sum\limits^m_{t=1}w_t\dfrac{\partial}{\partial \psi(j)}\text{ln}f\left(\mathbf{y,u_t|\Psi}\right)/\sum\limits^m_{t=1}w_t$ by plugging in $\mathbf{\Psi}=\hat{\mathbf{\Psi}}^{(r+1)}$
    2. Compute for each $j=1,\cdots,s$, $\hat{v}_{m;j}=\sum\limits^m_{t=1}w_t\left[\dfrac{\partial}{\partial \psi(j)}\text{ln}f\left(\mathbf{y,u_t|\Psi}\right)\right]^2/\left(\sum\limits^m_{t=1}w_t-\hat\mu_{m;j}^2\right)$ by plugging in $\mathbf{\Psi}=\hat{\mathbf{\Psi}}^{(r+1)}$
    3. Obtain the $(1-\alpha)$ confidence interval about $Q^{(1)}_j\left(\mathbf{\Psi}|\hat{\mathbf{\Psi}}^{(r)}\right)$ by the above mean and variance from standard normal distribution.
7. Obtain subsampling instants $t_k=x_1+\cdots+x_k$ where $x_k-1\sim Poi(\nu_k), k=1,\cdots,N$ and $N=\sup\{n;t_n\leq m\}$
8. If $Q^{(1)}_m\left(\hat{\mathbf{\Psi}}^{(r)}|\mathbf{\Psi}^{(r-1)}\right)$ lies in confidence interval, then 
    1. Set $m_o=m$
    2. Set $m=m_o+gauss(m_o+c)$ for some $c>0$
    3. Obtain $\mathbf{u_{m_o+1}},\cdots,\mathbf{u_m}\sim g\left(\mathbf{u}|\mathbf{y,\Psi^{(0)}}\right)$
9. Compute for each $j=1,\cdots,s$, $Q^{(1)}_{m;j}\left(\hat{\mathbf{\Psi}}^{(r+1)}|\hat{\mathbf{\Psi}}^{(r)}\right)=\sum\limits^N_{k=1}w_{t_k}\dfrac{\partial}{\partial \psi(j)}\text{ln}f\left(\mathbf{y,u_{t_k}|\Psi}\right)/\sum\limits^m_{t=1}w_{t_k}$  by plugging in $\mathbf{\Psi}=\hat{\mathbf{\Psi}}^{(r+1)}$
10. Repeat step 3 to step 9 until converge

### Burn-in steps

run burn-in for one minutes

1. Set importance weights $w_t = 1,  \forall t=1,\cdots,m$ at iteration $b$
2. Generate $\mathbf{u_1},\cdots,\mathbf{u_m}\sim g\left(\mathbf{u}|\mathbf{y,\Psi^{(b)}}\right)$ via MCMC
3. Run E and M step above with $r=b$
4. Repeat Steps 2 and 3 for $B$ burn-in iterations.
5. Reinitialize $\mathbf{\Psi}^{(0)}=\mathbf{\Psi}^{(B)}$
