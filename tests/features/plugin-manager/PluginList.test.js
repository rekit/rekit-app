import React from 'react';
import { shallow } from 'enzyme';
import { PluginList } from '../../../src/features/plugin-manager/PluginList';

describe('plugin-manager/PluginList', () => {
  it('renders node with correct class name', () => {
    const props = {
      pluginManager: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <PluginList {...props} />
    );

    expect(
      renderedComponent.find('.plugin-manager-plugin-list').length
    ).toBe(1);
  });
});
