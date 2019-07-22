import ImageGallery from 'react-image-gallery';
import React, { Component } from 'react';

export default class ArchGnomeGallery extends Component {
  render() {
    const images = [
      {
        original:
          'https://res.cloudinary.com/sadanandsingh/image/upload/v1544988349/images/gnome3/SystemInfo.png'
      },
      {
        original:
          'https://res.cloudinary.com/sadanandsingh/image/upload/v1544988350/images/gnome3/workspaces.png'
      },
      {
        original:
          'https://res.cloudinary.com/sadanandsingh/image/upload/v1544988349/images/gnome3/ApplicationMenu.png'
      },
      {
        original:
          'https://res.cloudinary.com/sadanandsingh/image/upload/v1544988350/images/gnome3/workspaces.png'
      },
      {
        original:
          'https://res.cloudinary.com/sadanandsingh/image/upload/v1544988349/images/gnome3/Apps.png'
      },
      {
        original:
          'https://res.cloudinary.com/sadanandsingh/image/upload/v1544988350/images/gnome3/pcloud.png'
      },
      {
        original:
          'https://res.cloudinary.com/sadanandsingh/image/upload/v1544988348/images/gnome3/editors.png'
      }
    ];

    return (
      <ImageGallery
        items={images}
        showBullets={true}
        slideOnThumbnailOver={true}
        lazyLoad={true}
        showIndex={true}
      />
    );
  }
}
