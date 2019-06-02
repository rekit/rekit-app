import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class PluginButton extends Component {
  static propTypes = {
    pluginManager: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="plugin-manager-plugin-button">
        Page Content: plugin-manager/PluginButton
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    pluginManager: state.pluginManager,
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
)(PluginButton);
