import React from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const ImageZoom: React.FC<{}> = props => {
  const image = {
    ...props,
    className: 'Image__Zoom'
  };

  return (
    <Zoom zoomMargin={40}>
      <img alt={image.alt} src={image.src} width={image.width} />
    </Zoom>
  );
};

export default ImageZoom;
