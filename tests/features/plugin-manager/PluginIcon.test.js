import React from 'react';
import { shallow } from 'enzyme';
import { PluginIcon } from '../../../src/features/plugin-manager';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<PluginIcon />);
  expect(renderedComponent.find('.plugin-manager-plugin-icon').length).toBe(1);
});
