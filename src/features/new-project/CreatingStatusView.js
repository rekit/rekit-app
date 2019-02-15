import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import * as actions from './redux/actions';

export class CreatingStatusView extends Component {
  static propTypes = {
    newProject: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="new-project-creating-status-view">
        <Spin /> Creating the project...
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    newProject: state.newProject,
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
)(CreatingStatusView);
