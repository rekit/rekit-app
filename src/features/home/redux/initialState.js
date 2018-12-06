const initialState = {
  openProjectPending: false,
  openProjectError: null,
  createProjectPending: false,
  createProjectError: null,
  closeProjectPending: false,
  closeProjectError: null,

  studios: [],
  studioById: {},
  getInitialStatePending: false,
  getInitialStateError: null,

  initializing: true,
  getMainStatePending: false,
  getMainStateError: null,

  newProjectDialogVisible: false,
};

export default initialState;
