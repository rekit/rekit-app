import React from 'react';
import { shallow } from 'enzyme';
import { PluginButton } from '../../../src/features/plugin-manager/PluginButton';

describe('plugin-manager/PluginButton', () => {
  it('renders node with correct class name', () => {
    const props = {
      pluginManager: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <PluginButton {...props} />
    );

    expect(
      renderedComponent.find('.plugin-manager-plugin-button').length
    ).toBe(1);
  });
});
