import React, { Component } from 'react';
import addToMailchimp from 'gatsby-plugin-mailchimp';
import sadanand from '../../content/images/sadanand.jpg';

export default class Subscription extends React.Component {
  constructor() {
    super();
    this.state = {
      email: ``
    };
  }
  // Update state each time user edits their email address
  _handleEmailChange = e => {
    this.setState({ email: e.target.value, msg: '' });
  };

  // Post to MC server & handle its response
  _postEmailToMailchimp = (email, attributes) => {
    addToMailchimp(email, attributes)
      .then(data => {
        if (data.result === 'error') {
          throw data;
        }

        this.setState({
          status: `success`,
          email: '',
          subscribed: true
        });

        document.getElementById('Submit').disabled = true;

        setTimeout(() => {
          this.setState({
            subscribed: false,
            email: 'you@email.com',
            status: ''
          });
          document.getElementsByName('Email')[0].value = '';
          document.getElementById('Submit').disabled = false;
        }, 4000);
      })

      .catch(error => {
        this.setState({
          status: `error`,
          email: '',
          subscribed: false,
          msg: error.msg
        });

        document.getElementById('Submit').disabled = true;

        setTimeout(() => {
          this.setState({
            subscribed: false,
            email: 'you@email.com',
            status: ''
          });
          document.getElementsByName('Email')[0].value = '';
          document.getElementById('Submit').disabled = false;
        }, 4000);
      });
  };

  _handleFormSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    if (!this.state.email) {
      this.setState({
        status: `error`,
        email: '',
        msg: 'Please enter valid email!'
      });
    } else {
      this.setState({
        status: `sending`,
        msg: null
      });
      // setState callback (subscribe email to MC)
      this._postEmailToMailchimp(this.state.email, {
        pathname: document.location.pathname
      });
    }
  };
  render() {
    return (
      <aside className='note'>
        <div className='container note-container'>
          <div className='flex-author'>
            <h2>A Note From The Author</h2>
            <p>
              I write free resources for people learning machine learning, deep learning and
              programming. I aspire to help hundreds of people. I turn down everyone who offers to
              put ads, affiliate links, and sponsored posts on my website.
            </p>
            <p>
              If you feel my posts are helpful, please let me know via various{' '}
              <a href='/me'>social links</a>!
            </p>
            <div>
              <form className='SubscriptionForm' id='email-capture' method='post' noValidate>
                <h4>Enjoyed this post? Want to Receive the next one in your inbox!</h4>
                <div className='Wrapper'>
                  <input
                    name='Email'
                    placeholder='you@email.com'
                    onChange={this._handleEmailChange}
                    required
                  />
                  <button id='Submit' type='submit' onClick={this._handleFormSubmit}>
                    {this.state.subscribed ? <CheckMarkIcon /> : 'Subscribe'}
                  </button>
                </div>
                {this.state.status === `error` && (
                  <div className='error'>
                    <br />
                    <div className='error' dangerouslySetInnerHTML={{ __html: this.state.msg }} />
                  </div>
                )}
              </form>
            </div>
          </div>
          <div className='flex-avatar'>
            <img className='avatar' src={sadanand} />
          </div>
        </div>
        <div></div>
      </aside>
    );
  }
}

const CheckMarkIcon = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M9.00016 16.1698L4.83016 11.9998L3.41016 13.4098L9.00016 18.9998L21.0002 6.99984L19.5902 5.58984L9.00016 16.1698Z'
      fill='#ffffff'
    />
  </svg>
);
