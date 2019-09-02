import React, { Component } from 'react';
import coffee from '../images/coffee.svg';
import sadanand from '../../content/images/sadanand.jpg';

class UserInfo extends Component {
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
          </div>
          <div className='flex-avatar'>
            <img className='avatar' src={sadanand} />
          </div>
        </div>
      </aside>
    );
  }
}

export default UserInfo;
