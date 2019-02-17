import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Alert, Spin, Timeline, Icon } from 'antd';
import { clearCreateAppStatus } from './redux/actions';

export class CreatingStatusView extends Component {
  static propTypes = {
    createAppStatus: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentWillUnmount() {
    this.props.actions.clearCreateAppStatus();
  }

  renderSuccess() {
    return (
      <Alert
        message="Create App Sccuess!"
        description={
          <div>
            <p>Congratulations! You app has been created successfully. Next:</p>
            <ol>
              <li>Open project with Rekit Studio by click open button below.</li>
              <li>Go to termianl to install dependencies using Yarn or Npm.</li>
              <li>Run 'start' script in Scripts tab to start the development server.</li>
            </ol>
            <p>Enjoy!</p>
          </div>
        }
        type="success"
        showIcon
      />
    );
  }
  renderError(err) {
    return <Alert
        message="Failed to create the application"
        description={
          <div>
            <p>{String(err)}</p>
          </div>
        }
        type="error"
        showIcon
      />
  }

  renderCreating() {
    const { createAppStatus } = this.props;
    const len = createAppStatus.length; //CREATION_SUCCESS
    return (
      <React.Fragment>
        <span style={{ fontWeight: 'bold', marginLeft: '10px' }}>Creating the project...</span>
        <Timeline>
          {createAppStatus.map((status, i) => (
            <Timeline.Item
              key={status.code}
              dot={
                i < len - 1 ? (
                  <Icon type="check-circle" style={{ color: 'green' }} />
                ) : (
                  <Icon type="loading-3-quarters" spin />
                )
              }
            >
              {status.msg}
            </Timeline.Item>
          ))}
        </Timeline>
      </React.Fragment>
    );
  }

  render() {
    const { createAppPending, createAppError } = this.props;
    return (
      <div className="new-project-creating-status-view">
        {createAppPending && this.renderCreating()}
        {createAppError && this.renderError(createAppError)}
        {!createAppError && !createAppPending && this.renderSuccess()}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    createAppStatus: state.newProject.createAppStatus,
    createAppPending: state.newProject.createAppPending,
    createAppError: state.newProject.createAppError,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ clearCreateAppStatus }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreatingStatusView);
