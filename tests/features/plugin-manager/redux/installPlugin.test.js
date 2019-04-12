import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  PLUGIN_MANAGER_INSTALL_PLUGIN_BEGIN,
  PLUGIN_MANAGER_INSTALL_PLUGIN_SUCCESS,
  PLUGIN_MANAGER_INSTALL_PLUGIN_FAILURE,
  PLUGIN_MANAGER_INSTALL_PLUGIN_DISMISS_ERROR,
} from '../../../../src/features/plugin-manager/redux/constants';

import {
  installPlugin,
  dismissInstallPluginError,
  reducer,
} from '../../../../src/features/plugin-manager/redux/installPlugin';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('plugin-manager/redux/installPlugin', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when installPlugin succeeds', () => {
    const store = mockStore({});

    return store.dispatch(installPlugin())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PLUGIN_MANAGER_INSTALL_PLUGIN_BEGIN);
        expect(actions[1]).toHaveProperty('type', PLUGIN_MANAGER_INSTALL_PLUGIN_SUCCESS);
      });
  });

  it('dispatches failure action when installPlugin fails', () => {
    const store = mockStore({});

    return store.dispatch(installPlugin({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PLUGIN_MANAGER_INSTALL_PLUGIN_BEGIN);
        expect(actions[1]).toHaveProperty('type', PLUGIN_MANAGER_INSTALL_PLUGIN_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissInstallPluginError', () => {
    const expectedAction = {
      type: PLUGIN_MANAGER_INSTALL_PLUGIN_DISMISS_ERROR,
    };
    expect(dismissInstallPluginError()).toEqual(expectedAction);
  });

  it('handles action type PLUGIN_MANAGER_INSTALL_PLUGIN_BEGIN correctly', () => {
    const prevState = { installPluginPending: false };
    const state = reducer(
      prevState,
      { type: PLUGIN_MANAGER_INSTALL_PLUGIN_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.installPluginPending).toBe(true);
  });

  it('handles action type PLUGIN_MANAGER_INSTALL_PLUGIN_SUCCESS correctly', () => {
    const prevState = { installPluginPending: true };
    const state = reducer(
      prevState,
      { type: PLUGIN_MANAGER_INSTALL_PLUGIN_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.installPluginPending).toBe(false);
  });

  it('handles action type PLUGIN_MANAGER_INSTALL_PLUGIN_FAILURE correctly', () => {
    const prevState = { installPluginPending: true };
    const state = reducer(
      prevState,
      { type: PLUGIN_MANAGER_INSTALL_PLUGIN_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.installPluginPending).toBe(false);
    expect(state.installPluginError).toEqual(expect.anything());
  });

  it('handles action type PLUGIN_MANAGER_INSTALL_PLUGIN_DISMISS_ERROR correctly', () => {
    const prevState = { installPluginError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: PLUGIN_MANAGER_INSTALL_PLUGIN_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.installPluginError).toBe(null);
  });
});

