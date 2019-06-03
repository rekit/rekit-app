import React from 'react';
import { shallow } from 'enzyme';
import { InstallButton } from '../../../src/features/plugin-manager/PluginButton';

describe('plugin-manager/InstallButton', () => {
  it('renders node with correct class name', () => {
    const props = {
      pluginManager: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <InstallButton {...props} />
    );

    expect(
      renderedComponent.find('.plugin-manager-plugin-button').length
    ).toBe(1);
  });
});
