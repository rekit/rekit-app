import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import { FormBuilder, FolderPicker } from '../common';

export class NewProjectForm extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    appType: PropTypes.object.isRequired,
  };

  getMeta() {
    const { appType } = this.props;
    const values = this.props.values || {};
    const meta = {
      elements: [
        
        {
          key: 'name',
          label: 'Project Name',
          required: true,
        },
        {
          key: 'location',
          label: 'Location',
          required: true,
          widget: FolderPicker,
        },
      ],
    };
    if (appType.args) {
      meta.elements.push(...appType.args);
    }
    meta.elements.forEach(ele => {
      if (ele.key in values) ele.initialValue = values[ele.key];
    });

    return meta;
  }

  doSubmit = () => {
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        this.props.onSubmit(values);
      }
    });
  };

  render() {
    return (
      <div className="new-project-new-project-form">
        <Form onSubmit={this.handleSubmit}>
          <FormBuilder meta={this.getMeta()} form={this.props.form} />
        </Form>
      </div>
    );
  }
}

export default Form.create()(NewProjectForm);
