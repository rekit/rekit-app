import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  PLUGIN_MANAGER_ENABLE_PLUGIN_BEGIN,
  PLUGIN_MANAGER_ENABLE_PLUGIN_SUCCESS,
  PLUGIN_MANAGER_ENABLE_PLUGIN_FAILURE,
  PLUGIN_MANAGER_ENABLE_PLUGIN_DISMISS_ERROR,
} from '../../../../src/features/plugin-manager/redux/constants';

import {
  enablePlugin,
  dismissEnablePluginError,
  reducer,
} from '../../../../src/features/plugin-manager/redux/enablePlugin';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('plugin-manager/redux/enablePlugin', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when enablePlugin succeeds', () => {
    const store = mockStore({});

    return store.dispatch(enablePlugin())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PLUGIN_MANAGER_ENABLE_PLUGIN_BEGIN);
        expect(actions[1]).toHaveProperty('type', PLUGIN_MANAGER_ENABLE_PLUGIN_SUCCESS);
      });
  });

  it('dispatches failure action when enablePlugin fails', () => {
    const store = mockStore({});

    return store.dispatch(enablePlugin({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PLUGIN_MANAGER_ENABLE_PLUGIN_BEGIN);
        expect(actions[1]).toHaveProperty('type', PLUGIN_MANAGER_ENABLE_PLUGIN_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissEnablePluginError', () => {
    const expectedAction = {
      type: PLUGIN_MANAGER_ENABLE_PLUGIN_DISMISS_ERROR,
    };
    expect(dismissEnablePluginError()).toEqual(expectedAction);
  });

  it('handles action type PLUGIN_MANAGER_ENABLE_PLUGIN_BEGIN correctly', () => {
    const prevState = { enablePluginPending: false };
    const state = reducer(
      prevState,
      { type: PLUGIN_MANAGER_ENABLE_PLUGIN_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.enablePluginPending).toBe(true);
  });

  it('handles action type PLUGIN_MANAGER_ENABLE_PLUGIN_SUCCESS correctly', () => {
    const prevState = { enablePluginPending: true };
    const state = reducer(
      prevState,
      { type: PLUGIN_MANAGER_ENABLE_PLUGIN_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.enablePluginPending).toBe(false);
  });

  it('handles action type PLUGIN_MANAGER_ENABLE_PLUGIN_FAILURE correctly', () => {
    const prevState = { enablePluginPending: true };
    const state = reducer(
      prevState,
      { type: PLUGIN_MANAGER_ENABLE_PLUGIN_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.enablePluginPending).toBe(false);
    expect(state.enablePluginError).toEqual(expect.anything());
  });

  it('handles action type PLUGIN_MANAGER_ENABLE_PLUGIN_DISMISS_ERROR correctly', () => {
    const prevState = { enablePluginError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: PLUGIN_MANAGER_ENABLE_PLUGIN_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.enablePluginError).toBe(null);
  });
});

