import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

export default class PageNotFound extends PureComponent {
  render() {
    return (
      <div className="common-page-not-found">
        Ops, page not found.
        <p>
          <Link to="/">Back to welcome page.</Link>
        </p>
      </div>
    );
  }
}
