import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { WebView } from '../common';
import rekitLogo from '../../images/rekit-logo.svg';

export class RekitStudioPage extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    studios: PropTypes.array.isRequired,
    studioById: PropTypes.object.isRequired,
  };

  state = {
    loaded: {},
  };

  handleWebViewOnload = (prjDir) => {
    console.log('studio on load: ', prjDir);
    setTimeout(() =>this.setState({
      loaded: {
        ...this.state.loaded,
        [prjDir]: true,
      }
    }), 800);

  };

  renderLoadingStatus() {
    return (
      <div className="loading-status">
        <div className="center-block">
          <img src={rekitLogo} alt="rekit-logo" />
          <p>Launching the project...</p>
        </div>
      </div>
    );
  }

  renderWebView = id => {
    const studio = this.props.studioById[id];
    const { port } = this.props.match.params;
    return studio.started ? (
      <WebView
        key={studio.port}
        src={`http://localhost:${studio.port}`}
        visible={String(studio.port) === port}
        onload={() => this.handleWebViewOnload(studio.prjDir)}
      />
    ) : null;
  };

  renderWebViews() {
    return <div className="wv-container">{this.props.studios.map(this.renderWebView)}</div>;
  }

  render() {
    const { port } = this.props.match.params;
    const currentStudio = _.find(Object.values(this.props.studioById), {
      port: parseInt(port, 10),
    });
    return (
      <div className="home-rekit-studio-page">
        {this.renderWebViews()}
        {(!currentStudio.started || !this.state.loaded[currentStudio.prjDir]) && this.renderLoadingStatus()}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
    studios: state.home.studios,
    studioById: state.home.studioById,
  };
}

/* istanbul ignore next */
// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators({ ...actions }, dispatch),
//   };
// }

export default connect(
  mapStateToProps,
  // mapDispatchToProps,
)(RekitStudioPage);
