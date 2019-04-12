import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  PLUGIN_MANAGER_DISABLE_PLUGIN_BEGIN,
  PLUGIN_MANAGER_DISABLE_PLUGIN_SUCCESS,
  PLUGIN_MANAGER_DISABLE_PLUGIN_FAILURE,
  PLUGIN_MANAGER_DISABLE_PLUGIN_DISMISS_ERROR,
} from '../../../../src/features/plugin-manager/redux/constants';

import {
  disablePlugin,
  dismissDisablePluginError,
  reducer,
} from '../../../../src/features/plugin-manager/redux/disablePlugin';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('plugin-manager/redux/disablePlugin', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when disablePlugin succeeds', () => {
    const store = mockStore({});

    return store.dispatch(disablePlugin())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PLUGIN_MANAGER_DISABLE_PLUGIN_BEGIN);
        expect(actions[1]).toHaveProperty('type', PLUGIN_MANAGER_DISABLE_PLUGIN_SUCCESS);
      });
  });

  it('dispatches failure action when disablePlugin fails', () => {
    const store = mockStore({});

    return store.dispatch(disablePlugin({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PLUGIN_MANAGER_DISABLE_PLUGIN_BEGIN);
        expect(actions[1]).toHaveProperty('type', PLUGIN_MANAGER_DISABLE_PLUGIN_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissDisablePluginError', () => {
    const expectedAction = {
      type: PLUGIN_MANAGER_DISABLE_PLUGIN_DISMISS_ERROR,
    };
    expect(dismissDisablePluginError()).toEqual(expectedAction);
  });

  it('handles action type PLUGIN_MANAGER_DISABLE_PLUGIN_BEGIN correctly', () => {
    const prevState = { disablePluginPending: false };
    const state = reducer(
      prevState,
      { type: PLUGIN_MANAGER_DISABLE_PLUGIN_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.disablePluginPending).toBe(true);
  });

  it('handles action type PLUGIN_MANAGER_DISABLE_PLUGIN_SUCCESS correctly', () => {
    const prevState = { disablePluginPending: true };
    const state = reducer(
      prevState,
      { type: PLUGIN_MANAGER_DISABLE_PLUGIN_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.disablePluginPending).toBe(false);
  });

  it('handles action type PLUGIN_MANAGER_DISABLE_PLUGIN_FAILURE correctly', () => {
    const prevState = { disablePluginPending: true };
    const state = reducer(
      prevState,
      { type: PLUGIN_MANAGER_DISABLE_PLUGIN_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.disablePluginPending).toBe(false);
    expect(state.disablePluginError).toEqual(expect.anything());
  });

  it('handles action type PLUGIN_MANAGER_DISABLE_PLUGIN_DISMISS_ERROR correctly', () => {
    const prevState = { disablePluginError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: PLUGIN_MANAGER_DISABLE_PLUGIN_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.disablePluginError).toBe(null);
  });
});

