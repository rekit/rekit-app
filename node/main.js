const electron = require('electron');

// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const log = require('./log');
const menu = require('./menu');

const path = require('path');
const taskRunner = require('./taskRunner');
const init = require('./init');
require('./ua');

require('./mainService');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  const isDev = process.env.NODE_ENV === 'development';

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    titleBarStyle: 'hidden',
    backgroundColor: '#1e1e1e',
    // transparent: true,
    // frame: false,
  });
  mainWindow.ELECTRON_DISABLE_SECURITY_WARNINGS = true;
  // and load the index.html of the app.
  // mainWindow.loadURL(
  //   url.format({
  //     pathname: path.join(__dirname, 'index.html'),
  //     protocol: 'file:',
  //     slashes: true,
  //   }),
  // );

  console.log('isdev: ', process.env.NODE_ENV, isDev);

  if (isDev) {
    mainWindow.loadURL('http://localhost:6093/');
  } else {
    mainWindow.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();

  // if (0 && !isDev) {
  // Create the Application's main menu
  menu.createMenu(mainWindow, app);
  // }
});

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

let waitStopping = true;
app.on('will-quit', evt => {
  log.info('app will quit');
  if (waitStopping) {
    evt.preventDefault();
    taskRunner
      .stopAllTasks()
      .then(() => {
        log.info('All tasks stopped.');
        waitStopping = false;
        app.quit();
      })
      .catch(err => {
        log.error('Stop tasks failed.');
        log.error(err);
        waitStopping = false;
        app.quit();
      });
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
