const { ipcMain, BrowserWindow } = require('electron');
const promiseIpc = require('electron-promise-ipc');
const _ = require('lodash');
const rekitCore = require('rekit-core');
const utils = require('./utils');
const studioRunner = require('./studioRunner');
const taskRunner = require('./taskRunner');
const store = require('./store');
const ua = require('./ua');

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

promiseIpc.on('/start-studio', args => {
  ua.event('rekit-app', 'start-studio').send();
  if (args.restart) {
    taskRunner.stopTask(args.prjDir);
  }
  return studioRunner.startStudio(args.prjDir, args.restart);
});

promiseIpc.on('/get-main-state', prjDir => {
  const studios = studioRunner.getRunningStudios();
  return {
    studios: studios.map(s => _.pick(s, ['name', 'port', 'prjDir', 'started', 'error'])),
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

promiseIpc.on('/close-project', prjDir => {
  ua.event('rekit-app', 'close-project').send();
  // switch to a tab
  return studioRunner.stopStudio(prjDir).then(() => {
    utils.notifyMainStateChange();
  });
});

promiseIpc.on('/create-app', options => {
  ua.event('rekit-app', 'create-app').send();
  rekitCore.core
    .create({
      ...options,
      status: (code, msg) => {
        console.log(code, msg);
        BrowserWindow.getFocusedWindow().webContents.send('redux-action', {
          type: 'CREATE_APP_STATUS',
          data: {
            code,
            msg,
          },
        });
      },
    })
    .then(() => {
      BrowserWindow.getFocusedWindow().webContents.send('redux-action', {
        type: 'CREATE_APP_SUCCESS',
      });
    })
    .catch(err => {
      BrowserWindow.getFocusedWindow().webContents.send('redux-action', {
        type: 'CREATE_APP_FAILURE',
        data: err,
      });
    });
});
