const { BrowserWindow } = require('electron');

function toggleWindowMaximize() {
  const win = BrowserWindow.getFocusedWindow();
  if (!win) return;
  if (win.isMaximized()) win.unmaximize();
  else win.maximize();
}

module.exports = {
  toggleWindowMaximize,
  notifyMainStateChange() {
    const win = BrowserWindow.getFocusedWindow();
    if (win) {
      win.webContents.send('state-changed');
    } else {
      console.log('no window found', win);
    }
  },
};
