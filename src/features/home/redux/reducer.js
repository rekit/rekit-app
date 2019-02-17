import initialState from './initialState';
import { reducer as openProjectReducer } from './openProject';
import { reducer as closeProjectReducer } from './closeProject';
import { reducer as getInitialStateReducer } from './getInitialState';
import { reducer as getMainStateReducer } from './getMainState';
import { reducer as showNewProjectDialogReducer } from './showNewProjectDialog';
import { reducer as hideNewProjectDialogReducer } from './hideNewProjectDialog';

const reducers = [
  openProjectReducer,
  closeProjectReducer,
  getInitialStateReducer,
  getMainStateReducer,
  showNewProjectDialogReducer,
  hideNewProjectDialogReducer,
];

export default function reducer(state = initialState, action) {
  let newState = state;
  switch (action.type) {
    // Handle cross-topic actions here
    case 'CREATE_APP_STATUS':
      break;
    case 'CREATE_APP_SUCCESS':
      break;
    case 'CREATE_APP_FAILURE':
      break;
    default:
      newState = state;
      break;
  }
  /* istanbul ignore next */
  return reducers.reduce((s, r) => r(s, action), newState);
}
