import React from 'react';
import ImageWithZoom from 'react-medium-image-zoom';

function handleImageZoomBackground(background: string) {
  const images = Array.from(document.getElementsByClassName('Image__Zoom'));

  images.map(img => {
    if (img.previousElementSibling && img.previousElementSibling.tagName === 'DIV') {
      img.previousElementSibling.style.background = background;
    }
  });
}

const ImageZoom: React.FC<{}> = props => {
  const image = {
    ...props,
    className: 'Image__Zoom'
  };

  return (
    <ImageWithZoom
      image={image}
      zoomImage={image}
      onZoom={() => handleImageZoomBackground('white')}
      defaultStyles={{
        zoomImage: {
          borderRadius: '5px'
        }
      }}
    />
  );
};

export default ImageZoom;
