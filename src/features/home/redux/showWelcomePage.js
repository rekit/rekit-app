// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_SHOW_WELCOME_PAGE,
} from './constants';

export function showWelcomePage() {
  return {
    type: HOME_SHOW_WELCOME_PAGE,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_SHOW_WELCOME_PAGE:
      return {
        ...state,
        welcomePageVisible: true,
      };

    default:
      return state;
  }
}
