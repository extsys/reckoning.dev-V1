import React, { Component } from 'react';
import NewsletterForm from './NewsletterForm';
import { IoLogoFacebook, IoLogoTwitter, IoLogoGithub, IoLogoLinkedin } from 'react-icons/io';

class Contact extends Component {
  render() {
    return (
      <>
        <h1>Stay in touch</h1>
        <div className='contacts'>
          <p>
            You can find me around the web:{' '}
            <a target='_blank' href='https://www.facebook.com/sadanand4singh'>
              <IoLogoFacebook />
              {'  '}
            </a>
            <a target='_blank' href='https://github.com/sadanand-singh'>
              <IoLogoGithub />
              {'  '}
            </a>
            <a target='_blank' href='https://twitter.com/sadanandsingh'>
              <IoLogoTwitter />
              {'  '}
            </a>
            <a target='_blank' href='https://www.linkedin.com/in/sadanandsingh/'>
              <IoLogoLinkedin />
              {'  '}
            </a>
          </p>
        </div>

        <p>Like the posts you see here? Sign up to get notified about new ones.</p>
        <NewsletterForm />
      </>
    );
  }
}

export default Contact;
