import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Button, Modal, message } from 'antd';
import { hideNewProjectDialog } from '../home/redux/actions';
import { createApp } from './redux/actions';
import { NewProjectForm, AppTypeSelect, CreatingStatusView } from './';
import utils from '../home/utils';

export class NewProjectDialog extends Component {
  static propTypes = {
    appTypes: PropTypes.array,
    actions: PropTypes.object.isRequired,
  };

  state = {
    appType: null,
    values: null,
    step: 0, // 0: select app type 1: fill creation form 3: creation status
  };

  handleSelectAppType = key => {
    this.setState({
      appType: key,
      values: key !== this.state.appType ? null : this.state.values,
    });
  };

  handleOk = () => {
    switch (this.state.step) {
      case 0:
        if (this.state.appType) {
          this.setState({ step: 1 });
        } else {
          message.warn('Please select type of the project to create.');
        }
        break;
      case 1:
        this.creationForm.doSubmit();
        break;
      default:
        break;
    }
  };

  handleCancel = () => {
    this.props.actions.hideNewProjectDialog();
  };

  handleBack = () => {
    this.setState({ step: this.state.step - 1 });
  };

  handleOpen = () => {
    this.props.actions.hideNewProjectDialog();
    utils.openProject(this.state.prjDir);
  };

  handleClose = () => {
    this.props.actions.hideNewProjectDialog();
  };

  handleCreationSubmit = values => {
    console.log('creation values: ', values);
    this.setState({ values, step: 2, prjDir: values.location + '/' + values.name });
    const appType = this.state.appType;
    this.props.actions.createApp({ type: appType, ...values });
  };

  renderFooter() {
    const { step } = this.state;
    const { createAppError, createAppPending } = this.props;
    const creationDone = step === 2 && !createAppError && !createAppPending;
    return [
      !creationDone &&
        step > 0 && (
          <Button key="back" className="btn-back" onClick={this.handleBack}>
            Back
          </Button>
        ),
      !creationDone && (
        <Button key="cancel" className="btn-cancel" onClick={this.handleCancel}>
          Cancel
        </Button>
      ),
      !creationDone &&
        !createAppError && (
          <Button
            key="ok"
            type="primary"
            className="btn-ok"
            onClick={this.handleOk}
            loading={step === 2}
            disabled={step === 2}
          >
            {{ 0: 'Next', 1: 'Create', 2: 'Creating' }[step]}
          </Button>
        ),
      creationDone && <Button onClick={this.handleClose}>Close</Button>,
      creationDone && (
        <Button type="primary" onClick={this.handleOpen}>
          Open
        </Button>
      ),
    ];
  }

  render() {
    const { step } = this.state;
    return (
      <Modal
        visible
        title="Create a new project"
        onCancel={this.props.actions.hideNewProjectDialog}
        onOk={this.handleOk}
        className="new-project-new-project-dialog"
        maskClosable={false}
        width="800px"
        okText="Next"
        footer={this.renderFooter()}
      >
        {step === 0 && (
          <AppTypeSelect value={this.state.appType} onChange={this.handleSelectAppType} />
        )}
        {step === 1 && (
          <NewProjectForm
            values={this.state.values}
            appType={_.find(this.props.appTypes, { id: this.state.appType })}
            wrappedComponentRef={f => (this.creationForm = f)}
            onSubmit={this.handleCreationSubmit}
          />
        )}
        {step === 2 && <CreatingStatusView />}
      </Modal>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    createAppPending: state.newProject.createAppPending,
    createAppError: state.newProject.createAppError,
    appTypes: state.newProject.appTypes,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ hideNewProjectDialog, createApp }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewProjectDialog);
