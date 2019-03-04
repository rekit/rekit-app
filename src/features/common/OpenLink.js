import React, { Component } from 'react';

export default class OpenLink extends Component {
  handleClick = evt => {
    evt.preventDefault();
    evt.stopPropagation();
    window.bridge.shell.openExternal(this.props.href);
  };

  render() {
    return (
      <a target="_blank" onClick={this.handleClick} {...this.props}>
        {this.props.children}
      </a>
    );
  }
}
