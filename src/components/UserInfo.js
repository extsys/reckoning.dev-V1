import React, { Component } from 'react'
import coffee from '../images/coffee.svg'

class UserInfo extends Component {
  render() {
    return (
      <aside className="note">
        <div className="container note-container">
          <h2>A note from the author</h2>
          <p>
            Hi! I'm Sadanand. I write free resources for people learning machine learning, deep learning and programming. I aspire to help hundreds of people daily. I turn down
            everyone who offers to put ads, affiliate links, and sponsored posts on my website.
          </p>
          <p>
            <strong>If you enjoy my content, please consider supporting what I do!</strong>
          </p>
          <a href="https://ko-fi.com/sadanandsingh" className="donate-button" target="_blank">
            Support me <img src={coffee} className="coffee-icon" />
          </a>
        </div>
      </aside>
    )
  }
}

export default UserInfo
