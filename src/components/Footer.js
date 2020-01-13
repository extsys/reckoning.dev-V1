import React, { Component } from 'react';
import {
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoGithub,
  IoLogoLinkedin,
  IoLogoReddit
} from 'react-icons/io';

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
        <div className='footer-link'>
          <a
            className='footer-link'
            target='_blank'
            href='https://www.facebook.com/sadanand4singh'
          >
            <IoLogoFacebook size={20} />
          </a>
          <a className='footer-link' target='_blank' href='https://github.com/sadanand-singh'>
            <IoLogoGithub size={20} />
          </a>
          <a className='footer-link' target='_blank' href='https://twitter.com/reckoningdev'>
            <IoLogoTwitter size={20} />
          </a>
          <a
            className='footer-link'
            target='_blank'
            href='https://www.linkedin.com/in/sadanandsingh/'
          >
            <IoLogoLinkedin size={20} />
          </a>
          <a
            className='footer-link'
            target='_blank'
            href='https://www.reddit.com/user/sadanandsingh'
          >
            <IoLogoReddit size={20} />
          </a>
        </div>
      </footer>
    );
  }
}
