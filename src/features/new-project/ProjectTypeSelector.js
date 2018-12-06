import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class ProjectTypeSelector extends Component {
  static propTypes = {
    newProject: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="new-project-project-type-selector">
        Page Content: new-project/ProjectTypeSelector
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
)(ProjectTypeSelector);
