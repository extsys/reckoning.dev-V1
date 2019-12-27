import React, { Component, createRef } from 'react';
import './style.css';
import { IoLogoTwitter, IoLogoLinkedin } from 'react-icons/io';

class HighlightShare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopover: false,
      x: 0,
      y: 0,
      selectedText: '',
      twitter: '',
      linkedin: ''
    };

    this.highlight = createRef();
  }

  componentDidMount() {
    window.addEventListener('mouseup', this.onMouseUp);
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.onMouseUp);
  }

  hidePopover = () => {
    this.setState({ showPopover: false });
  };

  onMouseUp = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    if (!selectedText) {
      this.hidePopover();
      return;
    }

    const selectionRange = selection.getRangeAt(0);

    const startNode = selectionRange.startContainer.parentNode;
    const endNode = selectionRange.endContainer.parentNode;

    const highlightable = this.highlight.current;
    const highlightableRegion = highlightable.querySelector('.h-popable');

    if (highlightableRegion) {
      if (!highlightableRegion.contains(startNode) || !highlightableRegion.contains(endNode)) {
        this.hidePopover();
        return;
      }
    } else if (!highlightable.contains(startNode) || !highlightable.contains(endNode)) {
      this.hidePopover();
      return;
    }

    if (!startNode.isSameNode(endNode)) {
      this.hidePopover();
      return;
    }

    const { x, y, width } = selectionRange.getBoundingClientRect();
    if (!width) {
      this.hidePopover();
      return;
    }

    this.setState({
      x: x + width / 2,
      y: y + window.scrollY - 10,
      selectedText: selectedText,
      showPopover: true,
      twitter:
        'https://twitter.com/intent/tweet?text=' +
        selectedText.slice(0, 200) +
        '&url=' +
        encodeURI(window.location.href),
      linkedin:
        'http://www.linkedin.com/shareArticle?mini=true&url=' + encodeURI(window.location.href)
    });

    const { onHighlightShare = () => {} } = this.props;
    onHighlightShare(selectedText);
  };

  render() {
    const { showPopover, x, y, selectedText, twitter, linkedin } = this.state;
    const { children, popoverItems } = this.props;
    const itemClass = 'h-popover-item';

    return (
      <div ref={this.highlight}>
        {showPopover && (
          <div
            className='h-popover'
            style={{ left: `${x}px`, top: `${y}px` }}
            role='presentation'
            onMouseDown={e => e.preventDefault()}
          >
            {popoverItems ? (
              popoverItems(itemClass)
            ) : (
              <React.Fragment>
                <span className={itemClass} onClick={() => ''}>
                  Share {'    '}
                </span>
                <a
                  target='_blank'
                  className={itemClass}
                  href={twitter}
                  onclick="var width  = 575,
                  height = 280,
                  left   = ($(window).width()  - width)  / 2,
                  top    = ($(window).height() - height) / 2,
                  url    = this.href,
                  opts   = 'status=1' +
                       ',width='  + width  +
                       ',height=' + height +
                       ',top='    + top    +
                       ',left='   + left;

                window.open(url, 'twitter', opts);"
                >
                  <IoLogoTwitter />
                </a>
                <a
                  target='_blank'
                  className={itemClass}
                  href={linkedin}
                  onclick="var width  = 575,
                  height = 280,
                  left   = ($(window).width()  - width)  / 2,
                  top    = ($(window).height() - height) / 2,
                  url    = this.href,
                  opts   = 'status=1' +
                       ',width='  + width  +
                       ',height=' + height +
                       ',top='    + top    +
                       ',left='   + left;

                window.open(url, 'linkedin', opts);"
                >
                  <IoLogoLinkedin />
                </a>
              </React.Fragment>
            )}
          </div>
        )}
        {children}
      </div>
    );
  }
}

HighlightShare.defaultProps = {
  onHighlightComment: null,
  onExitHighlight: null,
  popoverItems: null,
  children: null
};

export default HighlightShare;
