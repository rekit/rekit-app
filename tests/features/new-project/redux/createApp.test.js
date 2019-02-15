import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  NEW_PROJECT_CREATE_APP_BEGIN,
  NEW_PROJECT_CREATE_APP_SUCCESS,
  NEW_PROJECT_CREATE_APP_FAILURE,
  NEW_PROJECT_CREATE_APP_DISMISS_ERROR,
} from '../../../../src/features/new-project/redux/constants';

import {
  createApp,
  dismissCreateAppError,
  reducer,
} from '../../../../src/features/new-project/redux/createApp';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('new-project/redux/createApp', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when createApp succeeds', () => {
    const store = mockStore({});

    return store.dispatch(createApp())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', NEW_PROJECT_CREATE_APP_BEGIN);
        expect(actions[1]).toHaveProperty('type', NEW_PROJECT_CREATE_APP_SUCCESS);
      });
  });

  it('dispatches failure action when createApp fails', () => {
    const store = mockStore({});

    return store.dispatch(createApp({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', NEW_PROJECT_CREATE_APP_BEGIN);
        expect(actions[1]).toHaveProperty('type', NEW_PROJECT_CREATE_APP_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissCreateAppError', () => {
    const expectedAction = {
      type: NEW_PROJECT_CREATE_APP_DISMISS_ERROR,
    };
    expect(dismissCreateAppError()).toEqual(expectedAction);
  });

  it('handles action type NEW_PROJECT_CREATE_APP_BEGIN correctly', () => {
    const prevState = { createAppPending: false };
    const state = reducer(
      prevState,
      { type: NEW_PROJECT_CREATE_APP_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.createAppPending).toBe(true);
  });

  it('handles action type NEW_PROJECT_CREATE_APP_SUCCESS correctly', () => {
    const prevState = { createAppPending: true };
    const state = reducer(
      prevState,
      { type: NEW_PROJECT_CREATE_APP_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.createAppPending).toBe(false);
  });

  it('handles action type NEW_PROJECT_CREATE_APP_FAILURE correctly', () => {
    const prevState = { createAppPending: true };
    const state = reducer(
      prevState,
      { type: NEW_PROJECT_CREATE_APP_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.createAppPending).toBe(false);
    expect(state.createAppError).toEqual(expect.anything());
  });

  it('handles action type NEW_PROJECT_CREATE_APP_DISMISS_ERROR correctly', () => {
    const prevState = { createAppError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: NEW_PROJECT_CREATE_APP_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.createAppError).toBe(null);
  });
});

