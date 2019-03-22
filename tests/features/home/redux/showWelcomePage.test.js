import {
  HOME_SHOW_WELCOME_PAGE,
} from '../../../../src/features/home/redux/constants';

import {
  showWelcomePage,
  reducer,
} from '../../../../src/features/home/redux/showWelcomePage';

describe('home/redux/showWelcomePage', () => {
  it('returns correct action by showWelcomePage', () => {
    expect(showWelcomePage()).toHaveProperty('type', HOME_SHOW_WELCOME_PAGE);
  });

  it('handles action type HOME_SHOW_WELCOME_PAGE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_SHOW_WELCOME_PAGE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
