import React, { Component } from 'react';
import pytorch from '../../content/thumbnails/pytorch.png';
import python from '../../content/thumbnails/python.png';
import netlify from '../../content/thumbnails/netlify.png';
import gatsby from '../../content/thumbnails/gatsby.png';
import github from '../../content/thumbnails/github.png';

export default class Footer extends Component {
  render() {
    return (
      <footer className='footer container'>
        <div>
          Copyright &copy; {new Date().getFullYear()} {}{' '}
          <a href='https://github.com/sadanand-singh/reckoning.dev/' target='_blank'>
            {' '}
            &nbsp;&nbsp; reckoning.dev
          </a>
        </div>
        <div>
          <a href='https://pytorch.org' title='Pytorch Library'>
            <img
              src={pytorch}
              target='_blank'
              rel='noopener noreferrer'
              className='footer-img'
              alt='Pytorch'
            />
          </a>
          <a href='https://www.python.org' title='Pytohon Programming'>
            <img
              src={python}
              target='_blank'
              rel='noopener noreferrer'
              className='footer-img'
              alt='Python'
            />
          </a>
          <a href='https://github.com/sadanand-singh' title='Open-source on GitHub'>
            <img
              src={github}
              target='_blank'
              rel='noopener noreferrer'
              className='footer-img'
              alt='GitHub'
            />
          </a>
          <a href='https://www.netlify.com/' title='Hosted by Netlify'>
            <img
              src={netlify}
              target='_blank'
              rel='noopener noreferrer'
              className='footer-img'
              alt='GitHub'
            />
          </a>
          <a href='https://www.gatsbyjs.org/' title='Built with Gatsby'>
            <img
              src={gatsby}
              target='_blank'
              rel='noopener noreferrer'
              className='footer-img'
              alt='GitHub'
            />
          </a>
        </div>
      </footer>
    );
  }
}
