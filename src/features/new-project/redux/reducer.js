// This is the root reducer of the feature. It is used for:
//   1. Load reducers from each action in the feature and process them one by one.
//      Note that this part of code is mainly maintained by Rekit, you usually don't need to edit them.
//   2. Write cross-topic reducers. If a reducer is not bound to some specific action.
//      Then it could be written here.
// Learn more from the introduction of this approach:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da.

import initialState from './initialState';
import { reducer as fetchAppTypesReducer } from './fetchAppTypes';
import { reducer as createAppReducer } from './createApp';
import { reducer as clearCreateAppStatusReducer } from './clearCreateAppStatus';

const reducers = [
  fetchAppTypesReducer,
  createAppReducer,
  clearCreateAppStatusReducer,
];

export default function reducer(state = initialState, action) {
  let newState = state;
  switch (action.type) {
    // Handle cross-topic actions here
    case 'CREATE_APP_STATUS':
      newState = {
        ...state,
        createAppStatus: [...state.createAppStatus, action.data],
      };
      break;
    case 'CREATE_APP_SUCCESS':
      newState = {
        ...state,
        createAppStatus: [],
        createAppPending: false,
      };
      break;
    case 'CREATE_APP_FAILURE':
      newState = {
        ...state,
        createAppStatus: [],
        createAppPending: false,
        createAppError: action.data,
      };
      break;
    default:
      newState = state;
      break;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}
