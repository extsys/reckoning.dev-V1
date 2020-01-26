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
            <div className='subscription-container__widgets'>
              Follow me on Twitter &nbsp;
              <Follow
                username={`${config.userTwitter}`}
                options={{ size: 'large', showCount: false }}
              />
            </div>
            <div className='subscription-container'>
              Subscribe to my Newsletter.&nbsp;&nbsp;
              <a
                className='subscription-button'
                href='https://reckoningdev.substack.com/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FiPenTool
                  sx={{
                    display: `flex`,
                    flexDirection: `row`,
                    mt: 1,
                    mr: 1
                  }}
                  size={14}
                />{' '}
                {'  '} Subscribe
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
