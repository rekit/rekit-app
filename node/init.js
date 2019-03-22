// Initializing Rekit environment if not set up.
// 1. Copying built in plugins to ~/.rekit/plugins folder.
// NOTE: this may not needeed since rekit-react plugin is packaged in rekit-studio

const os = require('os');
const fs = require('fs-extra');
const path = require('path');
const log = require('./log');

const systemPluginDir = path.join(os.homedir(), '.rekit/plugins');
fs.ensureDirSync(systemPluginDir);

const builtInPlugins = [];

// Use read and write to copy files to avoid permission issue, don't know why
function copy(src, dest) {
  if (fs.statSync(src).isFile()) {
    fs.writeFileSync(dest, fs.readFileSync(src));
  } else if (fs.statSync(src).isDirectory()) {
    fs.ensureDirSync(dest);
    fs.readdirSync(src).forEach(fileOrFolderName => {
      copy(path.join(src, fileOrFolderName), path.join(dest, fileOrFolderName));
    });
  }
}

builtInPlugins.forEach(name => {
  if (1 || !fs.existsSync(path.join(systemPluginDir, name))) {
    // Always replace built-in plugins when started for beta release.
    log.info('Initializing built in plugin: ', name);
    const src = path.join(__dirname, '../build/plugins', name);
    if (fs.existsSync(src)) {
      const dest = path.join(systemPluginDir, name);
      copy(src, dest);
    } else {
      log.error('Built in plugin not found: ', name, src);
    }
  } else {
    log.info('Initial plugin exists: ', name);
  }
});
