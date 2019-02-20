import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Alert, Spin, Button } from 'antd';
import { fetchAppTypes } from './redux/actions';

export class AppTypeSelect extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: null,
  };

  componentDidMount() {
    this.props.actions.fetchAppTypes();
  }

  renderLoading() {
    return (
      <div className="loading">
        <Spin /> Loading supported project types...
      </div>
    );
  }

  renderError() {
    return (
      <div>
        <Alert
          message="Failed to fetch application types"
          description="There seems to be network issues, please check and try again."
          type="error"
          showIcon
        />
        <Button
          type="primary"
          onClick={this.props.actions.fetchAppTypes}
          style={{ marginTop: '20px' }}
        >
          Try again.
        </Button>
      </div>
    );
  }

  renderContent() {
    const { appTypes } = this.props;
    return (
      <React.Fragment>
        <h2>Which type of the project to create?</h2>
        <div
          className="icon-block-container"
          style={{ marginBottom: this.props.value ? '110px' : '0px' }}
        >
          {appTypes.map(appType => (
            <div
              title={appType.name}
              key={appType.key}
              className={'icon-block' + (appType.key === this.props.value ? ' selected' : '')}
              onClick={() => this.props.onChange(appType.key)}
            >
              <img src={appType.logo} alt="" />
              <label>{appType.name}</label>
            </div>
          ))}
        </div>
        {this.props.value && (
          <div className="description">
            {_.find(appTypes, { key: this.props.value }).description}
          </div>
        )}
      </React.Fragment>
    );
  }

  render() {
    const { appTypes, fetchAppTypesError } = this.props;
    return (
      <div className="new-project-app-type-select">
        {fetchAppTypesError && this.renderError()}
        {!fetchAppTypesError && !appTypes && this.renderLoading()}
        {!fetchAppTypesError && appTypes && this.renderContent()}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    appTypes: state.newProject.appTypes,
    fetchAppTypesError: state.newProject.fetchAppTypesError,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchAppTypes }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppTypeSelect);
