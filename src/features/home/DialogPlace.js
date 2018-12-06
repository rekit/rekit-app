import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NewProjectDialog } from './';

export class DialogPlace extends Component {
  static propTypes = {
    newProjectDialogVisible: PropTypes.bool.isRequired,

  };

  render() {
    return (
      <React.Fragment>
        {this.props.newProjectDialogVisible && <NewProjectDialog />}
      </React.Fragment>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    newProjectDialogVisible: state.home.newProjectDialogVisible,
  };
}

export default connect(
  mapStateToProps,
)(DialogPlace);
