import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Icon } from 'antd';
import rekitLogo from '../../images/rekit-logo.svg';
import * as actions from './redux/actions';
import utils from './utils';
import { RecentProjects } from './';
import history from '../../common/history';
import { ReactComponent as DiscordIcon } from '../../images/discord.svg';

export class WelcomePage extends Component {

  handleCreateNewProject = () => {
    utils.showNewProjectDialog();
  };

  handleOpenProject = () => {
    utils.openProject();
  };

  handleLearnRekit = () => {
    window.bridge.shell.openExternal('http://rekit.org');
  }

  handleManagePlugins = () => {
    history.push('/plugins');
  }

  renderWelcomArea() {
    return (
      <div className="welcome-area">
        <img src={rekitLogo} className="rekit-logo" alt="logo" />
        <h1>Welcome to Rekit</h1>
        <p>Version: {this.props.version}</p>
        <div className="row-button" onClick={this.handleCreateNewProject}>
          <Icon type="file" />
          <p>Create a new project</p>
        </div>
        <div className="row-button" onClick={this.handleOpenProject}>
          <Icon type="folder-open" />
          <p>Open an existing project</p>
        </div>
        <div className="row-button" onClick={this.handleManagePlugins}>
          <Icon type="appstore" />
          <p>Manage plugins</p>
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
          <div className="footer">
            <label><Icon type="question-circle" /> Documentation</label>
            <label><Icon type="github" /> Github</label>
            <a href="https://discord.gg/Prn8vdY" target="_blank"><Icon component={DiscordIcon} /> Discussion</a>
            <label><Icon type="twitter" /> Twitter</label>
          </div>
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    version: state.home.version,
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
