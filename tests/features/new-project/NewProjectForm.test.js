import React from 'react';
import { shallow } from 'enzyme';
import { NewProjectForm } from '../../../src/features/new-project';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<NewProjectForm />);
  expect(renderedComponent.find('.new-project-new-project-form').length).toBe(1);
});
