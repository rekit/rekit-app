import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { PluginHeader } from './';

export class PluginDetail extends Component {
  static propTypes = {
    pluginManager: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    name: PropTypes.string,
  };
  renderNotFound() {
    return <div className="plugin-manager-plugin-detail">Plugin not found: {this.props.name}.</div>;
  }
  renderNotSelected() {
    return <div className="plugin-manager-plugin-detail">No plugin selected.</div>;
  }
  render() {
    const { name, plugins, onlinePlugins } = this.props;
    if (!name) return this.renderNotSelected();
    const allPlugins = [...plugins, ...onlinePlugins];
    const found = _.find(allPlugins, { name });
    if (!found) return this.renderNotFound();
    return (
      <div className="plugin-manager-plugin-detail">
        <PluginHeader item={found} />
        {name}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    onlinePlugins: state.pluginManager.onlinePlugins,
    plugins: state.pluginManager.plugins,
    pluginManager: state.pluginManager,
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
)(PluginDetail);
