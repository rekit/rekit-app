import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import homeReducer from '../features/home/redux/reducer'
import commonReducer from '../features/common/redux/reducer'
import examplesReducer from '../features/examples/redux/reducer'
import newProjectReducer from '../features/new-project/redux/reducer'

// NOTE 1: DO NOT CHANGE the 'reducerMap' name and the declaration pattern.
// This is used for Rekit cmds to register new features, remove features, etc.
// NOTE 2: always use the camel case of the feature folder name as the store branch name
// So that it's easy for others to understand it and Rekit could manage them.

const reducerMap = {
  home: homeReducer,
  common: commonReducer,
  examples: examplesReducer,
  newProject: newProjectReducer,
}

export default (history) => combineReducers({
  router: connectRouter(history),
  ...reducerMap
})
