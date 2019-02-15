import React from 'react';
import { shallow } from 'enzyme';
import { FormBuilder } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<FormBuilder />);
  expect(renderedComponent.find('.common-form-builder-js').length).toBe(1);
});
