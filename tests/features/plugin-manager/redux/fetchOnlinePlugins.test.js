import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  PLUGIN_MANAGER_FETCH_ONLINE_PLUGINS_BEGIN,
  PLUGIN_MANAGER_FETCH_ONLINE_PLUGINS_SUCCESS,
  PLUGIN_MANAGER_FETCH_ONLINE_PLUGINS_FAILURE,
  PLUGIN_MANAGER_FETCH_ONLINE_PLUGINS_DISMISS_ERROR,
} from '../../../../src/features/plugin-manager/redux/constants';

import {
  fetchOnlinePlugins,
  dismissFetchOnlinePluginsError,
  reducer,
} from '../../../../src/features/plugin-manager/redux/fetchOnlinePlugins';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('plugin-manager/redux/fetchOnlinePlugins', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchOnlinePlugins succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchOnlinePlugins())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PLUGIN_MANAGER_FETCH_ONLINE_PLUGINS_BEGIN);
        expect(actions[1]).toHaveProperty('type', PLUGIN_MANAGER_FETCH_ONLINE_PLUGINS_SUCCESS);
      });
  });

  it('dispatches failure action when fetchOnlinePlugins fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchOnlinePlugins({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PLUGIN_MANAGER_FETCH_ONLINE_PLUGINS_BEGIN);
        expect(actions[1]).toHaveProperty('type', PLUGIN_MANAGER_FETCH_ONLINE_PLUGINS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchOnlinePluginsError', () => {
    const expectedAction = {
      type: PLUGIN_MANAGER_FETCH_ONLINE_PLUGINS_DISMISS_ERROR,
    };
    expect(dismissFetchOnlinePluginsError()).toEqual(expectedAction);
  });

  it('handles action type PLUGIN_MANAGER_FETCH_ONLINE_PLUGINS_BEGIN correctly', () => {
    const prevState = { fetchOnlinePluginsPending: false };
    const state = reducer(
      prevState,
      { type: PLUGIN_MANAGER_FETCH_ONLINE_PLUGINS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchOnlinePluginsPending).toBe(true);
  });

  it('handles action type PLUGIN_MANAGER_FETCH_ONLINE_PLUGINS_SUCCESS correctly', () => {
    const prevState = { fetchOnlinePluginsPending: true };
    const state = reducer(
      prevState,
      { type: PLUGIN_MANAGER_FETCH_ONLINE_PLUGINS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchOnlinePluginsPending).toBe(false);
  });

  it('handles action type PLUGIN_MANAGER_FETCH_ONLINE_PLUGINS_FAILURE correctly', () => {
    const prevState = { fetchOnlinePluginsPending: true };
    const state = reducer(
      prevState,
      { type: PLUGIN_MANAGER_FETCH_ONLINE_PLUGINS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchOnlinePluginsPending).toBe(false);
    expect(state.fetchOnlinePluginsError).toEqual(expect.anything());
  });

  it('handles action type PLUGIN_MANAGER_FETCH_ONLINE_PLUGINS_DISMISS_ERROR correctly', () => {
    const prevState = { fetchOnlinePluginsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: PLUGIN_MANAGER_FETCH_ONLINE_PLUGINS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchOnlinePluginsError).toBe(null);
  });
});

