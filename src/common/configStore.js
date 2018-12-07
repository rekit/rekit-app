import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'
import history from './history'
import createRootReducer from './rootReducer'

// NOTE: Do not change middleares delaration pattern since rekit plugins may register middlewares to it.
const middlewares = [
  thunk,
  routerMiddleware(history),
]

let devToolsExtension = f => f

/* istanbul ignore if  */
if (process.env.NODE_ENV === 'development') {
  const { createLogger } = require('redux-logger')

  const logger = createLogger({ collapsed: true })
  middlewares.push(logger)

  if (window.devToolsExtension) {
    devToolsExtension = window.devToolsExtension()
  }
}

export default function configureStore(initialState) {
  const store = createStore(createRootReducer(history), initialState, compose(
    applyMiddleware(...middlewares),
    devToolsExtension
  ))

  /* istanbul ignore if  */
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer').default // eslint-disable-line
      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
