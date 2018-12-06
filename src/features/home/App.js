import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TitleBar, DialogPlace } from './';
import { getMainState } from './redux/actions';

/*
  This is the root component of your app. Here you define the overall layout
  and the container of the react router.
  You should adjust it according to the requirement of your app.
*/
export class App extends Component {
  static propTypes = {
    children: PropTypes.node,
    actions: PropTypes.object.isRequired,
    initializing: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    children: '',
  };

  componentDidMount() {
    this.props.actions.getMainState();
    window.bridge.ipcRenderer.on('state-changed', () => {
      this.props.actions.getMainState();
    });
  }

  render() {
    return (
      <div className="home-app">
        <TitleBar />
        <div className="page-container">{this.props.initializing ? 'Loading...' : this.props.children}</div>
        <DialogPlace />
      </div>
    );
  }
}


/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    initializing: state.home.initializing,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ getMainState }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);