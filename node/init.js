// Initializing Rekit environment if not set up.
// 1. Copying built in plugins to ~/.rekit/plugins folder.

const os = require('os');
const fs = require('fs-extra');
const path = require('path');
const log = require('./log');

const systemPluginDir = path.join(os.homedir(), '.rekit/plugins');
fs.ensureDirSync(systemPluginDir);

['rekit-react', 'ebay-node'].forEach(name => {
  if (!fs.existsSync(path.join(systemPluginDir, name))) {
    log.info('Initializing built in plugin: ', name);
    const src = path.join(__dirname, '../build/plugins', name);
    if (fs.existsSync(src)) {
      const dest = path.join(systemPluginDir, name);
      fs.copySync(src, dest);
    } else {
      log.error('Built in plugin not found: ', name, src);
    }
  } else {
    log.info('Initial plugin exists: ', name);
  }
});
