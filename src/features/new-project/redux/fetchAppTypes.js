import axios from 'axios';
import {
  NEW_PROJECT_FETCH_APP_TYPES_BEGIN,
  NEW_PROJECT_FETCH_APP_TYPES_SUCCESS,
  NEW_PROJECT_FETCH_APP_TYPES_FAILURE,
  NEW_PROJECT_FETCH_APP_TYPES_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function fetchAppTypes(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: NEW_PROJECT_FETCH_APP_TYPES_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const doRequest = axios.get('https://raw.githubusercontent.com/supnate/rekit-registry/master/appTypes.json');
      doRequest.then(
        (res) => {
          const json = res.data;
          const appTypes = Object.keys(json).map(key => ({
            ...json[key],
            key,
            logo: `https://raw.githubusercontent.com/supnate/rekit-registry/master/logos/${key}.png`
          }))
          dispatch({
            type: NEW_PROJECT_FETCH_APP_TYPES_SUCCESS,
            data: appTypes,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: NEW_PROJECT_FETCH_APP_TYPES_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissFetchAppTypesError() {
  return {
    type: NEW_PROJECT_FETCH_APP_TYPES_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case NEW_PROJECT_FETCH_APP_TYPES_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchAppTypesPending: true,
        fetchAppTypesError: null,
      };

    case NEW_PROJECT_FETCH_APP_TYPES_SUCCESS:
      // The request is success
      return {
        ...state,
        fetchAppTypesPending: false,
        fetchAppTypesError: null,
        appTypes: action.data,
      };

    case NEW_PROJECT_FETCH_APP_TYPES_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchAppTypesPending: false,
        fetchAppTypesError: action.data.error,
      };

    case NEW_PROJECT_FETCH_APP_TYPES_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchAppTypesError: null,
      };

    default:
      return state;
  }
}