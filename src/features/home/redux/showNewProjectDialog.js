// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_SHOW_NEW_PROJECT_DIALOG,
} from './constants';

export function showNewProjectDialog() {
  return {
    type: HOME_SHOW_NEW_PROJECT_DIALOG,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_SHOW_NEW_PROJECT_DIALOG:
      return {
        ...state,
        newProjectDialogVisible: true,
      };

    default:
      return state;
  }
}
