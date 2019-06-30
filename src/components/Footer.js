import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className='footer container'>
        <small>
          Copyright &copy; {new Date().getFullYear()} {}
          Sadanand singh / {}
          <a href='https://github.com/sadanand-singh/datasciencevision.com' target='_blank'>
            View source
          </a>
        </small>
      </footer>
    );
  }
}

export default Footer;
