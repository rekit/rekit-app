import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Button, Modal, message } from 'antd';
import { hideNewProjectDialog } from '../home/redux/actions';
import { NewProjectForm, AppTypeSelect, CreatingStatusView } from './';

export class NewProjectDialog extends Component {
  static propTypes = {
    appTypes: PropTypes.array,
    actions: PropTypes.object.isRequired,
  };

  state = {
    selected: null,
    appTypes: null,
    values: null,
    step: 0, // 0: select app type 1: fill creation form 3: creation status
  };

  handleSelectAppType = key => {
    this.setState({
      selected: key,
      values: key !== this.state.selected ? null : this.state.values,
    });
  };

  handleOk = () => {
    switch (this.state.step) {
      case 0:
        if (this.state.selected) {
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

  handleBack = () => {
    this.setState({ step: this.state.step - 1 });
  };

  handleCreationSubmit = values => {
    console.log('creation values: ', values);
    this.setState({ values, step: 2 });
    const appType = this.state.selected;
    this.props.action.createApp(appType, values);
  };

  renderFooter() {
    const { step } = this.state;
    return [
      step > 0 && (
        <Button key="back" className="btn-back" onClick={this.handleBack}>
          Back
        </Button>
      ),
      <Button key="cancel" className="btn-cancel" onClick={this.handleCancel}>
        Cancel
      </Button>,
      <Button
        key="ok"
        type="primary"
        className="btn-ok"
        onClick={this.handleOk}
        loading={step === 2}
        disabled={step === 2}
      >
        {{ 0: 'Next', 1: 'Create', 2: 'Creating' }[step]}
      </Button>,
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
          <AppTypeSelect value={this.state.selected} onChange={this.handleSelectAppType} />
        )}
        {step === 1 && (
          <NewProjectForm
            values={this.state.values}
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
    // appTypes: state.newProject.appTypes,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ hideNewProjectDialog }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewProjectDialog);
