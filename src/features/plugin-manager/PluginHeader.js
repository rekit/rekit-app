import React, { Component } from 'react';
import { Button, Row, Col, Icon } from 'antd';
import PropTypes from 'prop-types';
import { PluginIcon } from './';

export default class PluginHeader extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  render() {
    const { item } = this.props;
    return (
      <div className="plugin-manager-plugin-header">
        <PluginIcon item={item} />
        <label className="name">{item.name}</label>
        <label className="version">{item.version}</label>
        <p>{item.description}</p>
        <Row className="footer">
          <Col span={16}>
            <label className="author">{item.author}</label>
          </Col>
          <Col span={8} style={{ textAlign: 'right' }}>
            <Button size="small">Install</Button>
          </Col>
        </Row>
      </div>
    );
  }
}
