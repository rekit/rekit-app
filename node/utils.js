const { BrowserWindow } = require('electron');
const logger = require('./logger');

function toggleWindowMaximize() {
  const win = BrowserWindow.getFocusedWindow();
  if (!win) return;
  if (win.isMaximized()) win.unmaximize();
  else win.maximize();
}

module.exports = {
  toggleWindowMaximize,
  notifyMainStateChange() {
    const win = BrowserWindow.getAllWindows()[0];
    if (win) {
      logger.info('Focused window found.');
      win.webContents.send('state-changed');
    } else {
      logger.warn('No window found when notifiyMainStateChange in utils.js, retry in 2 seconds...');
      if (!this.pending)
        this.pending = setTimeout(() => {
          delete this.pending;
          this.notifyMainStateChange();
        }, 2000);
    }
  },
};
