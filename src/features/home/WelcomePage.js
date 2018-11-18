import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Icon } from 'antd';
import rekitLogo from '../../images/rekit-logo.svg';
import * as actions from './redux/actions';

export class WelcomePage extends Component {
  static propTypes = {};

  renderWelcomArea() {
    return (
      <div className="welcome-area">
        <img src={rekitLogo} className="rekit-logo" alt="logo" />
        <h1>Welcome to Rekit</h1>
        <p>Version: 3.0</p>
        <div className="row-button">
          <Icon type="file" />
          <p>Create a new project</p>
        </div>
        <div className="row-button">
          <Icon type="file" />
          <p>Open an existing project</p>
        </div>
        <div className="row-button">
          <Icon type="file" />
          <p>Learn Rekit...</p>
        </div>
      </div>
    );
  }

  renderRecent() {
    return (
      <div className="recent-projects">
        <h2>Recent Projects</h2>
        <ul>
          <li className="row-button row-button-large">
            <Icon type="file" />
            <h4>Rekit App</h4>
            <p>/pwang7/workspace/rekit-app</p>
          </li>
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div className="home-welcome-page">
        <div className="main-area">
          <Row>
            <Col span={12}>{this.renderWelcomArea()}</Col>
            <Col span={12}>{this.renderRecent()}</Col>
          </Row>
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
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
)(WelcomePage);
