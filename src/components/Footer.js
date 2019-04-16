import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className='footer container'>
        <small>
          Made by <strong>Sadanand singh</strong> / Theme by{' '}
          <a href='https://www.taniarascia.com/'>Tania Rascia</a> /{' '}
          <a href='https://github.com/sadanand-singh/datasciencevision.com' target='_blank'>
            View source
          </a>
        </small>
      </footer>
    );
  }
}

export default Footer;
