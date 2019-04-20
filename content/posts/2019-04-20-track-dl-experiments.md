---
title: 'Managing Deep Learning Experiments in Pytorch using Comet'
date: 2019-04-20
tags:
  - DeepLearning
  - Pytorch
categories:
  - DeepLearning
slug: track-dl-experiments
template: post
thumbnail: '../thumbnails/comet.png'
---

Managing multiple research experiments at a time can be overwhelming. The same applies to deep
learning research as well. Beyond the usual challenges in software development, machine learning
developers face new challenges - experiment management (tracking which parameters, code, and data
went into a result) and reproducibility (running the same code and environment later)!

Being an active researcher in medical applications of computer vision, I run multiple experiments
every day for exploring different research ideas. Managing this very iterative task is very crucial
in obtaining good models. In this article, I will describe my setup and procedure to manage experiments
that I run using [Pytorch](https://pytorch.org).

Let us consider the problem of classification of cats and dogs. You can download the data from
[here](https://www.microsoft.com/en-us/download/details.aspx?id=54765). This has 12500 images each
of cats and dogs. First thing, we will do is to clean up the data - remove non-image files, convert
images to standard 3 channel RGB PNG images and remove any corrupt image files. Additionally, we
also want to divide our data into training and testing sets. For this problem, I decided to put
10,000 images each of cats and dogs in training and remaining 2500 images each of cats and dogs
in the testing data set. I use the following python code to achieve this:

```python

```

Now that we have the data, We can take a look into the code format that I use for training
pytorch models. Pytorch is very research friendly framework giving you a flexible framework to
code new research ideas pretty quickly. However, it lacks any high level API like
[Keras](https://keras.io/). I use this pretty handy template to code my models, which I started from
[this github repository](https://github.com/victoresque/pytorch-template). The main idea in this
template is about segregating logic for models, data loaders, training process and its different
components.

[comet]: https://www.comet.ml/

The original codebase for this template uses tensorboard to log experiments. However, I find
tensorboard to be very rudimentary for the purpose of tracking of experiments. During my search
for tools for managing deep learning experiments, I came across [comet.ml][comet].
I fell in love with this instantly! It has some interesting features:

- Tracking of code, git sha key (if run from a git repository)
- Tracking of hyperparameters / config file
- Graph definition visualization per experiment
- A tabular view Metrics
- Plots of metrics and losses in both training and testing modes
- comparison of two experiments
- grouping experiments across projects
- steps to replicate an experiment
- logging images etc. (model outputs) for an experiment

If you are interested in even a subset of these feature, read on to find how to get this working
for your code. First thing you will need to do is open an account with [comet.ml][comet], you can
use your github credentials for a quick setup. Once you are inside your account, you can get your
API_KEY from the settings. I found the best place to save this is in your home folder in a
file named `.comet.config`.

```bash
[comet]
api_key=YOUR-API-KEY
```

If you use my codebase as a starting point, now you should get automatic comet tracking for your
experiments, as long as you have `comet: true` in your settings file. The experiment is saved under
the project named based on the `name` parameter in your settings.

Coming back to the problem of cats vs fogs problem, I did following set of experiments to compare
them in comet:
