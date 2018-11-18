import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class WebView extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
  };

  componentDidMount() {
    const wv = document.createElement('webview');
    this.node.appendChild(wv);
    wv.src = this.props.src;
  }

  assignRef = node => {
    this.node = node;
  };

  render() {
    return (
      <div className="common-web-view" ref={this.assignRef}>
        
      </div>
    );
  }
}
