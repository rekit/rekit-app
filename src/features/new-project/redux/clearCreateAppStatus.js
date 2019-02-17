// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  NEW_PROJECT_CLEAR_CREATE_APP_STATUS,
} from './constants';

export function clearCreateAppStatus() {
  return {
    type: NEW_PROJECT_CLEAR_CREATE_APP_STATUS,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case NEW_PROJECT_CLEAR_CREATE_APP_STATUS:
      return {
        ...state,
        createAppStatus: [],
        createAppPending: false,
        createAppError: null,
      };

    default:
      return state;
  }
}
