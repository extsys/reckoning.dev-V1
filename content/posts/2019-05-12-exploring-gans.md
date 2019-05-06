---
title: 'Exploring GANs in Pytorch'
date: 2019-05-12
tags:
  - DeepLearning
  - GAN
  - Pytorch
categories:
  - Data Science
slug: exploring-gans
template: post
thumbnail: '../thumbnails/celeb.png'
draft: true
---

If you follow deep learning even lightly, likely you would have come across
[generative adversarial networks][gan], widely known as GANs. In this article, We will explore
different tricks to achieve better and faster training of such models in [Pytorch][pytorch].

Generative Adversarial Networks (GANs) belong to the class of generative models.
Generative models can be used to _generate_ random instances (outcomes), either of an observation
and target ($X$, $y$), or of an observation $X$ given a target value $y$. In contrast, typical
classification models that you read and hear about, belong to the class of discriminative models.
A discriminative model can be used to _discriminate_ the value of the target variable $y$, given an
observation $X$.

[gan]: https://arxiv.org/pdf/1406.2661.pdf
[pytorch]: https://pytorch.org/

## What are GANs?

[Invented originally by Jürgen Schmidhuber](https://en.wikipedia.org/wiki/Generative_adversarial_network)
in 1990 (originally termed as **artificial curiosity**) and made popular by
[Goodfellow et al](https://arxiv.org/abs/1406.2661),
GAN is a framework for estimating generative models via an adversarial process, in which one
simultaneously train two models: a generative model $G$ that captures the data distribution, and a
discriminative model $D$ that estimates the probability that a sample came from the training data
rather than $G$. The training procedure for $G$ is to maximize the probability of $D$ making a
mistake. In the case where both $G$ and $D$ are defined by neural networks, the entire system can
be trained end-to-end with backpropagation. This framework corresponds to a minimax two-player game.

Given a training data $D_{train}$, the generator, $G$ creates samples as an attempt to mimic the
ones from the same probability distribution as $D_{train}$. The discriminator, $D$ on the other hand,
is a common binary classifier. It categorizes whether its input comes from the true data distribution
($D_{train}$) or from the Generator distribution.

In this game, $G$ takes random noise as input and generates a sample image $G_{sample}$. This
sample is designed to maximize the probability of making $D$ mistakes it as coming from real
training set Dtrain.

During training, D receives half of the time images from the training set Dtrain, and the other
half, images from the generator network - Gsample. The discriminator is trained to maximize the
probability of assigning the correct class label to both: real images (from the training set) and
fake samples (from G). In the end, the hope is that the game finds an equilibrium - the Nash
equilibrium.
