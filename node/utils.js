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
    console.log('notify main state change');
    const win = BrowserWindow.getFocusedWindow();
    if (win) {
      console.log('state -changed');
      win.webContents.send('state-changed');
    } else {
      console.log('no window found', win);
    }
  },
};
