import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class NewProjectDialog extends Component {
  static propTypes = {
    newProject: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="new-project-new-project-dialog">
        Page Content: new-project/NewProjectDialog
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
)(NewProjectDialog);
