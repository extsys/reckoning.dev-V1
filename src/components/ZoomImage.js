import React from 'react';
import ImageZoom from 'react-medium-image-zoom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledFigcaption = styled.figcaption`
  text-align: right;
  font-size: 0.8em;
  padding 0.25em 0;
  // text-transform: uppercase;
  color: #999;
  display: block;
  margin-left: auto;
  margin-right: auto;
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
