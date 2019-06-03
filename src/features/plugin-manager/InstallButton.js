import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Icon, Menu, Dropdown, Button, Modal } from 'antd';
import classnames from 'classnames';
import * as actions from './redux/actions';

export class InstallButton extends Component {
  static propTypes = {
    pluginManager: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };
  handleInstall(item) {
    this.props.actions
      .installPlugin(item.name)
      .then()
      .catch(err => {
        Modal.error({
          title: 'Failed',
          content: 'Failed to install plugin: ' + item.name,
        });
      });
  }
  handleUninstall(item) {
    this.props.actions
      .uninstallPlugin(item.name)
      .then()
      .catch(err => {
        Modal.error({
          title: 'Failed',
          content: 'Failed to uninstall plugin: ' + item.name,
        });
      });
  }
  handleMenuClick(evt, item) {
    switch (evt.key) {
      case 'update':
        this.handleInstall(item);
        break;
      case 'uninstall':
        Modal.confirm({
          title: 'Are you sure to uninstall this plugin ?',
          onOk: () => {
            this.props.actions.uninstallPlugin(item.name);
          },
        });

        break;
      default:
        break;
    }
  }
  render() {
    const { installing, uninstalling, item } = this.props;
    if (installing[item.name]) {
      return (
        <span className="plugin-manager-install-button status-installing">
          <Icon type="loading-3-quarters" spin />
          Installing...
        </span>
      );
    }
    if (uninstalling[item.name]) {
      return (
        <span className="plugin-manager-install-button status-uninstalling">
          <Icon type="loading-3-quarters" spin />
          Removing...
        </span>
      );
    }
    if (item.__notInstalled)
      return (
        <span className="plugin-manager-install-button" onClick={evt => evt.stopPropagation()}>
          <Button size="small" onClick={() => this.handleInstall(item)}>
            Install
          </Button>
        </span>
      );
    if (!item.latestVersion || item.latestVersion.versoin !== item.version) {
      // Todo: get latest version from npm
      const needUpdate = false && item.latestVersion && item.latestVersion.versoin !== item.version;
      const menu = (
        <Menu onClick={evt => this.handleMenuClick(evt, item)}>
          {needUpdate && <Menu.Item key="update">Update</Menu.Item>}
          <Menu.Item key="uninstall">Remove</Menu.Item>
        </Menu>
      );
      return (
        <span className="plugin-manager-install-button" onClick={evt => evt.stopPropagation()}>
          <Dropdown overlay={menu}>
            <Button
              size="small"
              className={classnames('btn-installed', { 'btn-to-update': needUpdate })}
            >
              {needUpdate ? 'Update' : 'Installed'} <Icon type="down" />
            </Button>
          </Dropdown>
        </span>
      );
    }
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  const { installing, uninstalling } = state.pluginManager;
  return {
    installing,
    uninstalling,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InstallButton);
