const { dialog, app } = require('electron');
const { autoUpdater } = require('electron-updater');
const logger = require('./logger');
autoUpdater.logger = logger;

module.exports = {
  checkUpdate() {
    autoUpdater.checkForUpdatesAndNotify();
  },
  handleCheckMenuClick(menuItem) {
    menuItem.enabled = false;
    // menuItem.label = 'Checking for Updates...';
    autoUpdater.checkForUpdatesAndNotify().then(
      (args) => {
        const updateInfo = (args && args.updateInfo) || null;
        logger.info('update info:', updateInfo);
        menuItem.enabled = true;
        if (updateInfo && updateInfo.version !== app.getVersion()) {
          dialog.showMessageBox({
            type: 'info',
            title: 'Found Updates',
            message: "Found updates, downloading behind and will notify you when it's ready.",
          });
        } else {
          dialog.showMessageBox({
            type: 'info',
            title: 'Up to date',
            message: 'There are currently no updates available.',
          });
        }
      },
      err => {
        logger.warn('Failed to check update.');
        dialog.showMessageBox({
          title: 'Error',
          message: 'Failed to check update.',
        });
        menuItem.enabled = true;
      },
    );
  },
};
