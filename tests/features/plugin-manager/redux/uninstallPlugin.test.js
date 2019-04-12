import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  PLUGIN_MANAGER_UNINSTALL_PLUGIN_BEGIN,
  PLUGIN_MANAGER_UNINSTALL_PLUGIN_SUCCESS,
  PLUGIN_MANAGER_UNINSTALL_PLUGIN_FAILURE,
  PLUGIN_MANAGER_UNINSTALL_PLUGIN_DISMISS_ERROR,
} from '../../../../src/features/plugin-manager/redux/constants';

import {
  uninstallPlugin,
  dismissUninstallPluginError,
  reducer,
} from '../../../../src/features/plugin-manager/redux/uninstallPlugin';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('plugin-manager/redux/uninstallPlugin', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when uninstallPlugin succeeds', () => {
    const store = mockStore({});

    return store.dispatch(uninstallPlugin())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PLUGIN_MANAGER_UNINSTALL_PLUGIN_BEGIN);
        expect(actions[1]).toHaveProperty('type', PLUGIN_MANAGER_UNINSTALL_PLUGIN_SUCCESS);
      });
  });

  it('dispatches failure action when uninstallPlugin fails', () => {
    const store = mockStore({});

    return store.dispatch(uninstallPlugin({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PLUGIN_MANAGER_UNINSTALL_PLUGIN_BEGIN);
        expect(actions[1]).toHaveProperty('type', PLUGIN_MANAGER_UNINSTALL_PLUGIN_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissUninstallPluginError', () => {
    const expectedAction = {
      type: PLUGIN_MANAGER_UNINSTALL_PLUGIN_DISMISS_ERROR,
    };
    expect(dismissUninstallPluginError()).toEqual(expectedAction);
  });

  it('handles action type PLUGIN_MANAGER_UNINSTALL_PLUGIN_BEGIN correctly', () => {
    const prevState = { uninstallPluginPending: false };
    const state = reducer(
      prevState,
      { type: PLUGIN_MANAGER_UNINSTALL_PLUGIN_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.uninstallPluginPending).toBe(true);
  });

  it('handles action type PLUGIN_MANAGER_UNINSTALL_PLUGIN_SUCCESS correctly', () => {
    const prevState = { uninstallPluginPending: true };
    const state = reducer(
      prevState,
      { type: PLUGIN_MANAGER_UNINSTALL_PLUGIN_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.uninstallPluginPending).toBe(false);
  });

  it('handles action type PLUGIN_MANAGER_UNINSTALL_PLUGIN_FAILURE correctly', () => {
    const prevState = { uninstallPluginPending: true };
    const state = reducer(
      prevState,
      { type: PLUGIN_MANAGER_UNINSTALL_PLUGIN_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.uninstallPluginPending).toBe(false);
    expect(state.uninstallPluginError).toEqual(expect.anything());
  });

  it('handles action type PLUGIN_MANAGER_UNINSTALL_PLUGIN_DISMISS_ERROR correctly', () => {
    const prevState = { uninstallPluginError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: PLUGIN_MANAGER_UNINSTALL_PLUGIN_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.uninstallPluginError).toBe(null);
  });
});

