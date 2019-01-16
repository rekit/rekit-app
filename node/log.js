const log = require('electron-log');
// Config electron log
log.transports.console.level = 'info';
log.transports.file.level = 'info';
log.info('electron log set up.');

module.exports = log;