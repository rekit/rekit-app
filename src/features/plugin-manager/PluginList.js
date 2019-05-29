/* eslint jsx-a11y/alt-text:0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Icon, Row, Col, Button } from 'antd';
import { fetchPlugins } from './redux/actions';

const defaultPluginLogo = require('../../images/plugin-logo.png');
export class PluginList extends Component {
  static propTypes = {
    pluginManager: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.actions.fetchPlugins();
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
            <Button size="small">Install</Button>
          </Col>
        </Row>
      </li>
    );
  };

  renderLoading() {
    return <div className="plugin-manager-plugin-list plugins-loading">Loading...</div>;
  }

  render() {
    // const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    const items = this.props.pluginManager.plugins;
    if (!items) return this.renderLoading();
    return (
      <div className="plugin-manager-plugin-list">
        <ul>{items.map(this.renderItem)}</ul>
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
    actions: bindActionCreators({ fetchPlugins }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PluginList);
