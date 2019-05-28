import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Row, Col, Button } from 'antd';
import { PluginList, PluginHeader } from './';
import history from '../../common/history';

export class MainPage extends Component {
  static propTypes = {
    pluginManager: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="plugin-manager-main-page">
        <div className="main-area">
          <div className="plugin-manager-header">
            <Button icon="close" onClick={() => history.go(-1)} shape="circle" />
          </div>
          <Row gutter={0}>
            <Col span={8}>
              <h2>Plugins</h2>
              <PluginList type="installed" />
            </Col>
            <Col span={16} className="plugin-intro">
              <PluginHeader />
              <p>This is plugin description</p>
            </Col>
          </Row>
        </div>
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
