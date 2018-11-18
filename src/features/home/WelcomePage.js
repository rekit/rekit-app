import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Icon } from 'antd';
import history from '../../common/history';
import rekitLogo from '../../images/rekit-logo.svg';
import * as actions from './redux/actions';

export class WelcomePage extends Component {
  static propTypes = {};

  handleCreateNewProject = () => {
    history.push('/rekit-studio');
  }

  renderWelcomArea() {
    return (
      <div className="welcome-area">
        <img src={rekitLogo} className="rekit-logo" alt="logo" />
        <h1>Welcome to Rekit</h1>
        <p>Version: 3.0</p>
        <div className="row-button" onClick={this.handleCreateNewProject}>
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
          {[1, 2, 3, 4,6,7,8,9].map(() => (
            <li className="row-button row-button-large" title={"file path"}>
              <Icon type="file" />
              <h4>Rekit App</h4>
              <p>/pwang7/workspace/rekit-app</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div className="home-welcome-page">
        <div className="main-area">
          <Row>
            <Col span={13}>{this.renderWelcomArea()}</Col>
            <Col span={11}>{this.renderRecent()}</Col>
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
