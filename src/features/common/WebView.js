import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class WebView extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    onload: PropTypes.func,
  };

  static defaultProps = {
    onload() {},
  };
  componentDidMount() {
    const wv = document.createElement('webview');
    this.node.appendChild(wv);
    wv.src = this.props.src;
    // wv.onload = this.props.onload;
    wv.addEventListener('did-finish-load', this.props.onload);
  }

  assignRef = node => {
    this.node = node;
  };

  render() {
    return (
      <div
        className="common-web-view"
        ref={this.assignRef}
        style={{ visibility: this.props.visible ? 'visible' : 'hidden' }}
      />
    );
  }
}
