import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Row, Col } from 'antd';
import { PluginList } from './';

export class MainPage extends Component {
  static propTypes = {
    pluginManager: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="plugin-manager-main-page">
        <Row gutter={20}>
          <Col span={12}>
            <h1>Installed Plugins <span className="plugin-count">(12)</span></h1>
            <PluginList type="installed"/>
          </Col>
          <Col span={12}>
            <h1>Available Plugins <span className="plugin-count">(87)</span></h1>
            <PluginList  type="available"/>
          </Col>
        </Row>
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
)(MainPage);
