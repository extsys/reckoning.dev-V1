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
import glob
import random
from PIL import Image

cats = glob.glob('/home/sadanand/Downloads/PetImages/Cat/*.*')
random.shuffle(cats)

dogs = glob.glob('/home/sadanand/Downloads/PetImages/Dog/*.*')
random.shuffle(dogs)

train_cats, test_cats = cats[:10000], cats[10000:]
train_dogs, test_dogs = dogs[:10000], dogs[10000:]

def write_data(data, mode, animal):
    for d in data:
        d_fname_base = d.split('/')[-1].split('.')[0]
        d_fname = f'/data/data/cats-and-dogs/{mode}/{animal}/{d_fname_base}.png'
        try:
            im = Image.open(d)
        except IOError:
            print(f'skipping image {d}')
            continue
        rgb_im = im.convert('RGB')
        rgb_im.save(d_fname)

write_data(train_cats, 'train', 'cat')
write_data(test_cats, 'test', 'cat')

write_data(train_dogs, 'train', 'dog')
write_data(test_dogs, 'test', 'dog')
```

Now that we have the data, We can take a look into the code format that I use for training
pytorch models. Pytorch is very research friendly framework giving you a flexible framework to
code new research ideas pretty quickly. However, it lacks any high level API like
[Keras](https://keras.io/). I use this pretty handy template to code my models, which I started from
[this github repository](https://github.com/victoresque/pytorch-template). The main idea in this
template is about segregating logic for models, data loaders, training process and its different
components. You can clone my code from [this github repository][cats-dogs-github]. This repository
also has an "mnist" branch to get you started quickly. The file structure of the codebase is as follows:

```terminal
.
├── LICENSE
├── README.md
├── base
│   ├── __init__.py
│   ├── base_data_loader.py
│   ├── base_model.py
│   └── base_trainer.py
├── config.json
├── data
├── data_loader
│   └── data_loaders.py
├── model
│   ├── loss.py
│   ├── metric.py
│   └── model.py
├── saved
├── test.py
├── train.py
├── trainer
│   ├── __init__.py
│   └── trainer.py
└── utils
    ├── __init__.py
    ├── logger.py
    └── util.py
```

[comet]: https://www.comet.ml/
[cats-dogs-github]: https://github.com/sadanand-singh/comet-cats-and-dogs

The original codebase for this template uses tensorboard to log experiments. However, I find
tensorboard to be very rudimentary for the purpose of tracking of experiments. During my search
for tools for managing deep learning experiments, I came across [comet.ml][comet].
I fell in love with this instantly! It has some interesting features:

- Tracking of code, git sha key (if run from a git repository)
- Tracking of hyperparameters / config file
- Graph definition visualization per experiment
- Tabular view of metrics
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
experiments, as long as you have `comet: true` in your `config.json` file. The experiment is saved under
the project named based on the `name` parameter in your `config.json`.

[vgg]: https://arxiv.org/abs/1409.1556

Coming back to the problem of cats vs dogs problem, I explored the problem using transfer
learning. Specifically, I have used an imagenet pretrained [VGG16 model with Batch Norm][vgg]
(which available in the `torchvision.models` module).

I performed the following set of experiments to compare them in comet:

- Use features from pretrained VGG16-BN model and train two new fully connected layers.
- Same as above with higher learning rate.
- Same as above with Adam optimizer (with different learning rates).
- Find best model among above and retrain the last conv block of the original VGG16 model.
