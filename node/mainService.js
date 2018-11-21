const { ipcMain, BrowserWindow } = require('electron');
const promiseIpc = require('electron-promise-ipc');
const _ = require('lodash');
const utils = require('./utils');
const studioRunnder = require('./studioRunner');
const store = require('./store');

ipcMain.on('call-window-method', (evt, method) => {
  console.log('method');
  switch (method) {
    case 'toggle-maximize':
      utils.toggleWindowMaximize();
      break;
    default:
      break;
  }
});

promiseIpc.on('/start-studio', prjDir => {
  return studioRunnder.startStudio(prjDir);
});

promiseIpc.on('/get-main-state', prjDir => {
  const studios = studioRunnder.getRunningStudios();
  return {
    studios: studios.map(s => _.pick(s, ['name', 'port', 'prjDir', 'started'])),
    recentProjects: store.get('recentProjects') || [],
  };
});

promiseIpc.on('/open-studio', prjDir => {
  // switch to a tab
  const recent = store.get('recentProjects') || [];
  _.pull(recent, prjDir);
  recent.unshift(prjDir);
  if (recent.length > 50) recent.length = 50;
  store.set('recentProjects', recent);
  utils.notifyMainStateChange();
  return true;
});
