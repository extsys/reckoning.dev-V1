import React from 'react';

export default class TLDR extends React.Component {
  render() {
    return (
      <div class='tldr'>
        <strong>TL;DR</strong>
        <br />
        {this.props.msg}
      </div>
    );
  }
}
