import React from 'react';
import { shallow } from 'enzyme';
import { CreatingStatusView } from '../../../src/features/new-project/CreatingStatusView';

describe('new-project/CreatingStatusView', () => {
  it('renders node with correct class name', () => {
    const props = {
      newProject: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <CreatingStatusView {...props} />
    );

    expect(
      renderedComponent.find('.new-project-creating-status-view').length
    ).toBe(1);
  });
});
