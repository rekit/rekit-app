import React from 'react';
import { shallow } from 'enzyme';
import { FolderPicker } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<FolderPicker />);
  expect(renderedComponent.find('.common-folder-picker').length).toBe(1);
});
