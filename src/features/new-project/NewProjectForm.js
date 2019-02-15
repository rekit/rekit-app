import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, Modal, Icon, Form, Spin, Button } from 'antd';
import { FormBuilder } from '../common';

export class NewProjectForm extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
  };

  getMeta() {
    const values = this.props.values || {};
    const meta = {
      elements: [
        {
          key: 'name',
          label: 'Project Name',
          required: true,
        },
        {
          key: 'css',
          label: 'CSS Transpiler',
          widget: 'radio-group',
          required: true,
          options: [['less', 'Less'], ['scss', 'Sass']],
          initialValue: 'less',
        },
      ],
    };
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