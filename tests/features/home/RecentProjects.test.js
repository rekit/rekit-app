import React from 'react';
import { shallow } from 'enzyme';
import { RecentProjects } from '../../../src/features/home/RecentProjects';

describe('home/RecentProjects', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <RecentProjects {...props} />
    );

    expect(
      renderedComponent.find('.home-recent-projects').length
    ).toBe(1);
  });
});
