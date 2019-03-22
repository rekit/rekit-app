import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Icon } from 'antd';
import rekitLogo from '../../images/rekit-logo.svg';
import * as actions from './redux/actions';
import utils from './utils';
import { RecentProjects } from './';

export class WelcomePage extends Component {

  handleCreateNewProject = () => {
    utils.showNewProjectDialog();
  };

  handleOpenProject = (dir) => {
    utils.openProject(dir);
  };

  renderWelcomArea() {
    return (
      <div className="welcome-area">
        <img src={rekitLogo} className="rekit-logo" alt="logo" />
        <h1>Welcome to Rekit</h1>
        <p>Version: 3.0</p>
        <div className="row-button" onClick={this.handleCreateNewProject}>
          <Icon type="file" />
          <p>Create a new project</p>
        </div>
        <div className="row-button" onClick={() => this.handleOpenProject()}>
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

  render() {
    return (
      <div className="home-welcome-page">
        <div className="main-area">
          <Row>
            <Col span={13}>{this.renderWelcomArea()}</Col>
            <Col span={11}><RecentProjects /></Col>
          </Row>
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    
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
