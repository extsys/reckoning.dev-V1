import React, { Component } from 'react';
import { IoLogoFacebook, IoLogoTwitter, IoLogoGithub, IoLogoLinkedin } from 'react-icons/io';

class Contact extends Component {
  render() {
    return (
      <>
        <ul>
          <li>
            <a target='_blank' href='https://www.facebook.com/sadanand4singh'>
              Facebook
            </a>{' '}
            <IoLogoFacebook />
          </li>
          <li>
            <a target='_blank' href='https://github.com/sadanand-singh'>
              Github
            </a>{' '}
            <IoLogoGithub />
          </li>
          <li>
            <a target='_blank' href='https://twitter.com/saddy4s'>
              Twitter
            </a>{' '}
            <IoLogoTwitter />
          </li>
          <li>
            <a target='_blank' href='https://www.linkedin.com/in/sadanandsingh/'>
              LinkedIn
            </a>{' '}
            <IoLogoLinkedin />
          </li>
        </ul>
      </>
    );
  }
}

export default Contact;
