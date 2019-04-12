import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  PLUGIN_MANAGER_FETCH_PLUGINS_BEGIN,
  PLUGIN_MANAGER_FETCH_PLUGINS_SUCCESS,
  PLUGIN_MANAGER_FETCH_PLUGINS_FAILURE,
  PLUGIN_MANAGER_FETCH_PLUGINS_DISMISS_ERROR,
} from '../../../../src/features/plugin-manager/redux/constants';

import {
  fetchPlugins,
  dismissFetchPluginsError,
  reducer,
} from '../../../../src/features/plugin-manager/redux/fetchPlugins';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('plugin-manager/redux/fetchPlugins', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchPlugins succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchPlugins())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PLUGIN_MANAGER_FETCH_PLUGINS_BEGIN);
        expect(actions[1]).toHaveProperty('type', PLUGIN_MANAGER_FETCH_PLUGINS_SUCCESS);
      });
  });

  it('dispatches failure action when fetchPlugins fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchPlugins({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PLUGIN_MANAGER_FETCH_PLUGINS_BEGIN);
        expect(actions[1]).toHaveProperty('type', PLUGIN_MANAGER_FETCH_PLUGINS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchPluginsError', () => {
    const expectedAction = {
      type: PLUGIN_MANAGER_FETCH_PLUGINS_DISMISS_ERROR,
    };
    expect(dismissFetchPluginsError()).toEqual(expectedAction);
  });

  it('handles action type PLUGIN_MANAGER_FETCH_PLUGINS_BEGIN correctly', () => {
    const prevState = { fetchPluginsPending: false };
    const state = reducer(
      prevState,
      { type: PLUGIN_MANAGER_FETCH_PLUGINS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchPluginsPending).toBe(true);
  });

  it('handles action type PLUGIN_MANAGER_FETCH_PLUGINS_SUCCESS correctly', () => {
    const prevState = { fetchPluginsPending: true };
    const state = reducer(
      prevState,
      { type: PLUGIN_MANAGER_FETCH_PLUGINS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchPluginsPending).toBe(false);
  });

  it('handles action type PLUGIN_MANAGER_FETCH_PLUGINS_FAILURE correctly', () => {
    const prevState = { fetchPluginsPending: true };
    const state = reducer(
      prevState,
      { type: PLUGIN_MANAGER_FETCH_PLUGINS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchPluginsPending).toBe(false);
    expect(state.fetchPluginsError).toEqual(expect.anything());
  });

  it('handles action type PLUGIN_MANAGER_FETCH_PLUGINS_DISMISS_ERROR correctly', () => {
    const prevState = { fetchPluginsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: PLUGIN_MANAGER_FETCH_PLUGINS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchPluginsError).toBe(null);
  });
});

