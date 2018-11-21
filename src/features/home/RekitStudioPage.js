import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { WebView } from '../common';

export class RekitStudioPage extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    studios: PropTypes.array.isRequired,
    studioById: PropTypes.object.isRequired,
  };

  renderWebView = id => {
    const studio = this.props.studioById[id];
    const { port } = this.props.match.params;
    return (
      <WebView
        key={studio.port}
        src={`http://localhost:${studio.port}`}
        visible={String(studio.port) === port}
      />
    );
  };

  renderWebViews() {
    return <div className="wv-container">{this.props.studios.map(this.renderWebView)}</div>;
  }

  render() {
    return <div className="home-rekit-studio-page">{this.renderWebViews()}</div>;
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
