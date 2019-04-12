import React from 'react';
import { shallow } from 'enzyme';
import { MainPage } from '../../../src/features/plugin-manager/MainPage';

describe('plugin-manager/MainPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      pluginManager: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <MainPage {...props} />
    );

    expect(
      renderedComponent.find('.plugin-manager-main-page').length
    ).toBe(1);
  });
});
