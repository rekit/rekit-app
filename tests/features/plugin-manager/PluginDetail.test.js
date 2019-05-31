import React from 'react';
import { shallow } from 'enzyme';
import { PluginDetail } from '../../../src/features/plugin-manager/PluginDetail';

describe('plugin-manager/PluginDetail', () => {
  it('renders node with correct class name', () => {
    const props = {
      pluginManager: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <PluginDetail {...props} />
    );

    expect(
      renderedComponent.find('.plugin-manager-plugin-detail').length
    ).toBe(1);
  });
});
