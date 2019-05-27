import React from 'react';
import ImageZoom from 'react-medium-image-zoom';
import styled from 'styled-components';

const StyledFigcaption = styled.figcaption`
  text-align: right;
  font-size: 0.8em;
  padding 0.25em 0;
  // text-transform: uppercase;
  color: #999;
`;
const Styles = {
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

const ZoomImage = ({ src, zoomSrc, alt, caption }) => {
  return (
    <figure>
      <ImageZoom
        image={{
          src: src,
          alt: alt || caption
        }}
        zoomImage={{
          src: zoomSrc || src,
          alt: alt || caption
        }}
        defaultStyles={Styles}
      />

      {caption && <StyledFigcaption>{caption}</StyledFigcaption>}
    </figure>
  );
};

export default ZoomImage;
