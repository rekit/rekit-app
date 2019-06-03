import React, { Component } from 'react';
const defaultPluginLogo = require('../../images/plugin-logo.png');

export default class PluginIcon extends Component {
  static propTypes = {};
  
  render() {
    const { item } = this.props;
    return (
      <img
        alt=""
        className="plugin-logo"
        src={
          item.logo
            ? `file://${item.logo}`
            : `https://rekit.github.io/plugin-registry/logos/${item.name}.png`
        }
        onError={evt => {
          evt.target.src = defaultPluginLogo;
        }}
      />
    );
  }
}
