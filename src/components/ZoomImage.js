import React from 'react';
import ImageZoom from 'react-medium-image-zoom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledFigcaption = styled.figcaption`
  align-items: center;
  text-align: center;
  line-height: 1.4;
  font-weight: 500;
  margin-left: auto;
  margin-right: auto;
  display: block;
  font-family: medium-content-sans-serif-font, 'Lucida Grande', 'Lucida Sans Unicode',
    'Lucida Sans', Geneva, Arial, sans-serif;
  font-size: 14px;
  margin-top: 1px;
  margin-bottom: 20px;
`;
const Styles = {
  display: 'block',
  'margin-left': 'auto',
  'margin-right': 'auto',
  width: 50,
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#555050',
    opacity: 0.3
  }
};

export default class ZoomImage extends React.Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    caption: PropTypes.string
  };

  render() {
    return (
      <figure>
        <ImageZoom
          image={{
            src: this.props.src,
            alt: this.props.alt
          }}
          zoomImage={{
            src: this.props.src,
            alt: this.props.alt
          }}
          defaultStyles={Styles}
        />

        {this.props.caption && <StyledFigcaption>{this.props.caption}</StyledFigcaption>}
      </figure>
    );
  }
}
