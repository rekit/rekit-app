import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Icon } from 'antd';

export default class FolderPicker extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    value: '',
    onChange() {},
  };

  handleBrowse = () => {
    window.bridge.remote.dialog.showOpenDialog(
      {
        title: 'Select a folder',
        filters: [],
        properties: ['openDirectory'],
      },
      folders => {
        if (!folders) return; // canceled
        this.props.onChange(folders[0]);
      },
    );
  };

  render() {
    const addonAfter = (
      <Icon type="folder-open" onClick={this.handleBrowse} style={{ cursor: 'pointer' }} />
    );
  
    return (
      <Input
        value={this.props.value}
        className="common-folder-picker"
        addonAfter={addonAfter}
        onChange={evt => this.props.onChange(evt.target.value)}
      />
    );
  }
}
