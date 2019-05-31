import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  PLUGIN_MANAGER_FETCH_INSTALLED_PLUGINS_BEGIN,
  PLUGIN_MANAGER_FETCH_INSTALLED_PLUGINS_SUCCESS,
  PLUGIN_MANAGER_FETCH_INSTALLED_PLUGINS_FAILURE,
  PLUGIN_MANAGER_FETCH_INSTALLED_PLUGINS_DISMISS_ERROR,
} from '../../../../src/features/plugin-manager/redux/constants';

import {
  fetchInstalledPlugins,
  dismissFetchInstalledPluginsError,
  reducer,
} from '../../../../src/features/plugin-manager/redux/fetchInstalledPlugins';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('plugin-manager/redux/fetchInstalledPlugins', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchInstalledPlugins succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchInstalledPlugins())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PLUGIN_MANAGER_FETCH_INSTALLED_PLUGINS_BEGIN);
        expect(actions[1]).toHaveProperty('type', PLUGIN_MANAGER_FETCH_INSTALLED_PLUGINS_SUCCESS);
      });
  });

  it('dispatches failure action when fetchInstalledPlugins fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchInstalledPlugins({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PLUGIN_MANAGER_FETCH_INSTALLED_PLUGINS_BEGIN);
        expect(actions[1]).toHaveProperty('type', PLUGIN_MANAGER_FETCH_INSTALLED_PLUGINS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchInstalledPluginsError', () => {
    const expectedAction = {
      type: PLUGIN_MANAGER_FETCH_INSTALLED_PLUGINS_DISMISS_ERROR,
    };
    expect(dismissFetchInstalledPluginsError()).toEqual(expectedAction);
  });

  it('handles action type PLUGIN_MANAGER_FETCH_INSTALLED_PLUGINS_BEGIN correctly', () => {
    const prevState = { fetchInstalledPluginsPending: false };
    const state = reducer(
      prevState,
      { type: PLUGIN_MANAGER_FETCH_INSTALLED_PLUGINS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchInstalledPluginsPending).toBe(true);
  });

  it('handles action type PLUGIN_MANAGER_FETCH_INSTALLED_PLUGINS_SUCCESS correctly', () => {
    const prevState = { fetchInstalledPluginsPending: true };
    const state = reducer(
      prevState,
      { type: PLUGIN_MANAGER_FETCH_INSTALLED_PLUGINS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchInstalledPluginsPending).toBe(false);
  });

  it('handles action type PLUGIN_MANAGER_FETCH_INSTALLED_PLUGINS_FAILURE correctly', () => {
    const prevState = { fetchInstalledPluginsPending: true };
    const state = reducer(
      prevState,
      { type: PLUGIN_MANAGER_FETCH_INSTALLED_PLUGINS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchInstalledPluginsPending).toBe(false);
    expect(state.fetchInstalledPluginsError).toEqual(expect.anything());
  });

  it('handles action type PLUGIN_MANAGER_FETCH_INSTALLED_PLUGINS_DISMISS_ERROR correctly', () => {
    const prevState = { fetchInstalledPluginsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: PLUGIN_MANAGER_FETCH_INSTALLED_PLUGINS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchInstalledPluginsError).toBe(null);
  });
});

