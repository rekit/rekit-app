import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Icon } from 'antd';
import history from '../../common/history';
import rekitLogo from '../../images/rekit-logo.svg';
import * as actions from './redux/actions';
import utils from './utils';

export class WelcomePage extends Component {
  static propTypes = {
    recentProjects: PropTypes.array.isRequired,
  };

  handleCreateNewProject = () => {
    history.push('/rekit-studio');
  };

  handleOpenProject = (dir) => {
    utils.openProject(dir);
  };

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

  renderRecent() {
    const { recentProjects } = this.props;
    return (
      <div className="recent-projects">
        <h2>Recent Projects</h2>
        <ul>
          {recentProjects.map(dir => (
            <li
              key={dir}
              className="row-button row-button-large"
              title={dir}
              onClick={() => this.handleOpenProject(dir)}
            >
              <Icon type="file" />
              <h4>{dir.split('/').pop()}</h4>
              <p>{dir}</p>
            </li>
          ))}
          {recentProjects.length === 0 && <li className="no-recent">No recent projects.</li>}
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
    recentProjects: state.home.recentProjects,
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
