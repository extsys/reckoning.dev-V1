import React from 'react';

export default class Update extends React.Component {
  render() {
    return (
      <div class='update'>
        <strong>UPDATE</strong>
        <br />
        {this.props.msg}
      </div>
    );
  }
}
