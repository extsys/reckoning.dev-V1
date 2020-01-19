import React, { Component } from 'react';
import sadanand from '../../content/images/sadanand.jpg';
import config from '../../data/SiteConfig';
import { Follow } from 'react-twitter-widgets';
import { FiPenTool } from 'react-icons/fi';

export default class Subscription extends React.Component {
  render() {
    return (
      <aside className='note'>
        <div className='container note-container'>
          <div className='flex-author'>
            <h2>A Note From The Author</h2>
            <p>
              I write free resources for people learning machine learning, deep learning and
              programming. I turn down everyone who offers to put ads, affiliate links, and
              sponsored posts on my website.
            </p>
            <p class='subscription-container__widgets'>
              If you feel my posts are helpful &nbsp;
              <Follow
                username={`${config.userTwitter}`}
                options={{ size: 'large', showCount: false }}
              />
            </p>

            <p></p>
            <div className='subscription-container'>
              <strong>You can also subscribe to my weekly newsletter.&nbsp;&nbsp;</strong>
              <a
                className='subscription-button'
                href='https://reckoningdev.substack.com/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FiPenTool size={12} /> {'  '} Subscribe to Newsletter
              </a>
            </div>
          </div>
          <div className='flex-avatar'>
            <img className='avatar' src={sadanand} />
          </div>
        </div>
      </aside>
    );
  }
}
