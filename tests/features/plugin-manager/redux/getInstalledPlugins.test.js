import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  PLUGIN_MANAGER_GET_INSTALLED_PLUGINS_BEGIN,
  PLUGIN_MANAGER_GET_INSTALLED_PLUGINS_SUCCESS,
  PLUGIN_MANAGER_GET_INSTALLED_PLUGINS_FAILURE,
  PLUGIN_MANAGER_GET_INSTALLED_PLUGINS_DISMISS_ERROR,
} from '../../../../src/features/plugin-manager/redux/constants';

import {
  getInstalledPlugins,
  dismissGetInstalledPluginsError,
  reducer,
} from '../../../../src/features/plugin-manager/redux/getInstalledPlugins';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('plugin-manager/redux/getInstalledPlugins', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getInstalledPlugins succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getInstalledPlugins())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PLUGIN_MANAGER_GET_INSTALLED_PLUGINS_BEGIN);
        expect(actions[1]).toHaveProperty('type', PLUGIN_MANAGER_GET_INSTALLED_PLUGINS_SUCCESS);
      });
  });

  it('dispatches failure action when getInstalledPlugins fails', () => {
    const store = mockStore({});

    return store.dispatch(getInstalledPlugins({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PLUGIN_MANAGER_GET_INSTALLED_PLUGINS_BEGIN);
        expect(actions[1]).toHaveProperty('type', PLUGIN_MANAGER_GET_INSTALLED_PLUGINS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetInstalledPluginsError', () => {
    const expectedAction = {
      type: PLUGIN_MANAGER_GET_INSTALLED_PLUGINS_DISMISS_ERROR,
    };
    expect(dismissGetInstalledPluginsError()).toEqual(expectedAction);
  });

  it('handles action type PLUGIN_MANAGER_GET_INSTALLED_PLUGINS_BEGIN correctly', () => {
    const prevState = { getInstalledPluginsPending: false };
    const state = reducer(
      prevState,
      { type: PLUGIN_MANAGER_GET_INSTALLED_PLUGINS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getInstalledPluginsPending).toBe(true);
  });

  it('handles action type PLUGIN_MANAGER_GET_INSTALLED_PLUGINS_SUCCESS correctly', () => {
    const prevState = { getInstalledPluginsPending: true };
    const state = reducer(
      prevState,
      { type: PLUGIN_MANAGER_GET_INSTALLED_PLUGINS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getInstalledPluginsPending).toBe(false);
  });

  it('handles action type PLUGIN_MANAGER_GET_INSTALLED_PLUGINS_FAILURE correctly', () => {
    const prevState = { getInstalledPluginsPending: true };
    const state = reducer(
      prevState,
      { type: PLUGIN_MANAGER_GET_INSTALLED_PLUGINS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getInstalledPluginsPending).toBe(false);
    expect(state.getInstalledPluginsError).toEqual(expect.anything());
  });

  it('handles action type PLUGIN_MANAGER_GET_INSTALLED_PLUGINS_DISMISS_ERROR correctly', () => {
    const prevState = { getInstalledPluginsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: PLUGIN_MANAGER_GET_INSTALLED_PLUGINS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getInstalledPluginsError).toBe(null);
  });
});

