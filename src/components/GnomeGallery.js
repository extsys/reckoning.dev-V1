import React from 'react';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';

const photos = [
  {
    src:
      'https://res.cloudinary.com/sadanandsingh/image/upload/v1546230616/gnome/activities_fsd0wm.png',
    width: 4,
    height: 3
  },
  {
    src:
      'https://res.cloudinary.com/sadanandsingh/image/upload/v1546230615/gnome/chrome_jx6pit.png',
    width: 4,
    height: 3
  },
  {
    src:
      'https://res.cloudinary.com/sadanandsingh/image/upload/v1546230615/gnome/searchApps_y1tgmu.png',
    width: 4,
    height: 3
  },
  {
    src:
      'https://res.cloudinary.com/sadanandsingh/image/upload/v1546230613/gnome/terminal_g3jr6j.png',
    width: 4,
    height: 3
  },
  {
    src:
      'https://res.cloudinary.com/sadanandsingh/image/upload/v1546230614/gnome/gnomeTweaks_p0fkkv.png',
    width: 4,
    height: 3
  },
  {
    src:
      'https://res.cloudinary.com/sadanandsingh/image/upload/v1546230615/gnome/vscode_fcsbl4.png',
    width: 4,
    height: 3
  }
];

class GnomeGallery extends React.Component {
  constructor() {
    super();
    this.state = { currentImage: 0 };
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }
  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true
    });
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false
    });
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1
    });
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1
    });
  }
  render() {
    return (
      <div>
        <Gallery
          photos={photos}
          direction={'column'}
          columns={3}
          margin={3}
          onClick={this.openLightbox}
        />
        <Lightbox
          images={photos}
          onClose={this.closeLightbox}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}
        />
      </div>
    );
  }
}

export default GnomeGallery;
