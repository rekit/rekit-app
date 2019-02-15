import React from 'react';
import { shallow } from 'enzyme';
import { AppTypeSelect } from '../../../src/features/new-project/AppTypeSelect';

describe('new-project/AppTypeSelect', () => {
  it('renders node with correct class name', () => {
    const props = {
      newProject: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <AppTypeSelect {...props} />
    );

    expect(
      renderedComponent.find('.new-project-app-type-select').length
    ).toBe(1);
  });
});
