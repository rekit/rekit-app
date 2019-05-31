/* eslint jsx-a11y/alt-text:0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Button, Modal, Menu, Dropdown } from 'antd';
import { fetchPlugins, fetchOnlinePlugins } from './redux/actions';

const defaultPluginLogo = require('../../images/plugin-logo.png');
export class PluginList extends Component {
  static propTypes = {
    pluginManager: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.actions.fetchPlugins();
    this.props.actions.fetchOnlinePlugins();
  }

  getPlugins() {
    const { plugins, onlinePlugins } = this.props.pluginManager;
    const merged = [...plugins].filter(p => !!p.version);
    const byName = merged.reduce((p, c) => {
      p[c.name] = c;
      return p;
    }, {});
    onlinePlugins.forEach(p => {
      if (byName[p.name]) {
        //installed
        byName[p.name].latestVersion = p;
      } else {
        p.__notInstalled = true;
        merged.push(p);
      }
    });
    return merged;
  }

  handleInstall(item) {
    this.props.action
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
    this.props.action
      .uninstall(item.name)
      .then()
      .catch(err => {
        Modal.error({
          title: 'Failed',
          content: 'Failed to remove plugin: ' + item.name,
        });
      });
  }

  renderItem = item => {
    return (
      <li>
        <img
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
        <label className="name">{item.name}</label>
        <label className="version">{item.version || ''}</label>
        <p>{item.description || 'No description.'}</p>
        <Row className="footer">
          <Col span={16}>
            <label className="author">{item.author}</label>
          </Col>
          <Col span={8} style={{ textAlign: 'right' }}>
            {this.renderInstallButton(item)}
          </Col>
        </Row>
      </li>
    );
  };

  renderInstallButton(item) {
    if (item.__notInstalled) return <Button size="small" onClick={() => this.handleInstall(item)}>Install</Button>;
    if (!item.latestVersion || item.latestVersion.versoin !== item.version) {
      return (
        <Button size="small" className="btn-installed">
          Installed
        </Button>
      );
    }
  }

  renderLoading() {
    return <div className="plugin-manager-plugin-list plugins-loading">Loading...</div>;
  }

  render() {
    return (
      <div className="plugin-manager-plugin-list">
        <ul>{this.getPlugins().map(this.renderItem)}</ul>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    pluginManager: state.pluginManager,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchPlugins, fetchOnlinePlugins }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PluginList);
