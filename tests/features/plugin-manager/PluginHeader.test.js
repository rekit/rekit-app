import React from 'react';
import { shallow } from 'enzyme';
import { PluginHeader } from '../../../src/features/plugin-manager';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<PluginHeader />);
  expect(renderedComponent.find('.plugin-manager-plugin-header').length).toBe(1);
});
