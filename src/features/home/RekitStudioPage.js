import React, { Component } from 'react';
import { WebView } from '../common';

export default class RekitStudioPage extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="home-rekit-studio-page">
        <div className="wv-container">
          <WebView src="http://localhost:6902" />
        </div>
      </div>
    );
  }
}
