import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Icon, Row, Col, Button } from 'antd';
import * as actions from './redux/actions';

export class PluginList extends Component {
  static propTypes = {
    pluginManager: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  renderItem = item => {
    return (
      <li>
        <Icon type="star" theme="twoTone" />
        <label className="name">{item} Plugin Name</label>
        <label className="version">2.3.4</label>
        <p>This is an one line description description description</p>
        <Row className="footer">
          <Col span={16}><label className="author">Nate Wang</label></Col>
          <Col span={8} style={{ textAlign: 'right' }}>
            <Button size="small">Install</Button>
          </Col>
        </Row>
      </li>
    );
  };

  render() {
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
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
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PluginList);
