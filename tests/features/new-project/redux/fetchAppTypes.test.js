import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  NEW_PROJECT_FETCH_APP_TYPES_BEGIN,
  NEW_PROJECT_FETCH_APP_TYPES_SUCCESS,
  NEW_PROJECT_FETCH_APP_TYPES_FAILURE,
  NEW_PROJECT_FETCH_APP_TYPES_DISMISS_ERROR,
} from '../../../../src/features/new-project/redux/constants';

import {
  fetchAppTypes,
  dismissFetchAppTypesError,
  reducer,
} from '../../../../src/features/new-project/redux/fetchAppTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('new-project/redux/fetchAppTypes', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchAppTypes succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchAppTypes())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', NEW_PROJECT_FETCH_APP_TYPES_BEGIN);
        expect(actions[1]).toHaveProperty('type', NEW_PROJECT_FETCH_APP_TYPES_SUCCESS);
      });
  });

  it('dispatches failure action when fetchAppTypes fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchAppTypes({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', NEW_PROJECT_FETCH_APP_TYPES_BEGIN);
        expect(actions[1]).toHaveProperty('type', NEW_PROJECT_FETCH_APP_TYPES_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchAppTypesError', () => {
    const expectedAction = {
      type: NEW_PROJECT_FETCH_APP_TYPES_DISMISS_ERROR,
    };
    expect(dismissFetchAppTypesError()).toEqual(expectedAction);
  });

  it('handles action type NEW_PROJECT_FETCH_APP_TYPES_BEGIN correctly', () => {
    const prevState = { fetchAppTypesPending: false };
    const state = reducer(
      prevState,
      { type: NEW_PROJECT_FETCH_APP_TYPES_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchAppTypesPending).toBe(true);
  });

  it('handles action type NEW_PROJECT_FETCH_APP_TYPES_SUCCESS correctly', () => {
    const prevState = { fetchAppTypesPending: true };
    const state = reducer(
      prevState,
      { type: NEW_PROJECT_FETCH_APP_TYPES_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchAppTypesPending).toBe(false);
  });

  it('handles action type NEW_PROJECT_FETCH_APP_TYPES_FAILURE correctly', () => {
    const prevState = { fetchAppTypesPending: true };
    const state = reducer(
      prevState,
      { type: NEW_PROJECT_FETCH_APP_TYPES_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchAppTypesPending).toBe(false);
    expect(state.fetchAppTypesError).toEqual(expect.anything());
  });

  it('handles action type NEW_PROJECT_FETCH_APP_TYPES_DISMISS_ERROR correctly', () => {
    const prevState = { fetchAppTypesError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: NEW_PROJECT_FETCH_APP_TYPES_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchAppTypesError).toBe(null);
  });
});

