import React from 'react';
import { shallow } from 'enzyme';
import { OpenLink } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<OpenLink />);
  expect(renderedComponent.find('.common-open-link').length).toBe(1);
});
