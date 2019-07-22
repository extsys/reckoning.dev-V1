import ImageGallery from 'react-image-gallery';
import React, { Component } from 'react';

export default class GnomeGallery extends Component {
  render() {
    const images = [
      {
        original:
          'https://res.cloudinary.com/sadanandsingh/image/upload/v1546230616/gnome/activities_fsd0wm.png'
      },
      {
        original:
          'https://res.cloudinary.com/sadanandsingh/image/upload/v1546230615/gnome/chrome_jx6pit.png'
      },
      {
        original:
          'https://res.cloudinary.com/sadanandsingh/image/upload/v1546230615/gnome/searchApps_y1tgmu.png'
      },
      {
        original:
          'https://res.cloudinary.com/sadanandsingh/image/upload/v1546230613/gnome/terminal_g3jr6j.png'
      },
      {
        original:
          'https://res.cloudinary.com/sadanandsingh/image/upload/v1546230614/gnome/gnomeTweaks_p0fkkv.png'
      },
      {
        original:
          'https://res.cloudinary.com/sadanandsingh/image/upload/v1546230615/gnome/vscode_fcsbl4.png'
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
