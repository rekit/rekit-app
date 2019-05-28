import React, { Component } from 'react';
import { Button, Row, Col, Icon } from 'antd';

export default class PluginHeader extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="plugin-manager-plugin-header">
        <Icon type="star" theme="twoTone" />
        <label className="name">Plugin Name</label>
        <label className="version">2.3.4</label>
        <p>This is an one line description description description</p>
        <Row className="footer">
          <Col span={16}>
            <label className="author">Nate Wang</label>
          </Col>
          <Col span={8} style={{ textAlign: 'right' }}>
            <Button size="small">Install</Button>
          </Col>
        </Row>
      </div>
    );
  }
}
