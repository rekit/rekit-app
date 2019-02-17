import {
  NEW_PROJECT_CLEAR_CREATE_APP_STATUS,
} from '../../../../src/features/new-project/redux/constants';

import {
  clearCreateAppStatus,
  reducer,
} from '../../../../src/features/new-project/redux/clearCreateAppStatus';

describe('new-project/redux/clearCreateAppStatus', () => {
  it('returns correct action by clearCreateAppStatus', () => {
    expect(clearCreateAppStatus()).toHaveProperty('type', NEW_PROJECT_CLEAR_CREATE_APP_STATUS);
  });

  it('handles action type NEW_PROJECT_CLEAR_CREATE_APP_STATUS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: NEW_PROJECT_CLEAR_CREATE_APP_STATUS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
