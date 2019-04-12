import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Icon } from 'antd';
import utils from './utils';

export class RecentProjects extends Component {
  static propTypes = {
    recentProjects: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
  };

  handleOpenProject = (dir) => {
    utils.openProject(dir);
  };

  render() {
    const { recentProjects } = this.props;
    return (
      <div className="home-recent-projects">
        <h2>Recent Projects</h2>
        <ul>
          {recentProjects.map(prj => (
            <li
              key={prj.path}
              className="row-button row-button-large"
              title={prj.path}
              onClick={() => this.handleOpenProject(prj.path)}
            >
              {prj.logo ? <img className="icon" src={prj.logo} alt="logo" /> : <Icon type="folder" />}
              <h4>{prj.path.split('/').pop()}</h4>
              <p>{prj.path}</p>
            </li>
          ))}
          {recentProjects.length === 0 && <li className="no-recent">No recent projects.</li>}
        </ul>
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
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentProjects);
