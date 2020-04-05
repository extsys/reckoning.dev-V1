import React from 'react';
import Zoom from 'react-medium-image-zoom';
import '../styles/components/zoom.css';

const ImageZoom: React.FC<{}> = (props) => {
  const image = {
    ...props,
    className: 'Image__Zoom',
    display: 'block',
    margin: '0 auto',
    width: '100%',
  };

  return (
    <Zoom zoomMargin={40}>
      <img className={image.className} src={image.src} alt={image.alt} style={image.style} />
    </Zoom>
  );
};

export default ImageZoom;
