const getPort = require('get-port');
const { fork } = require('child_process');
const path = require('path');
const { app } = require('electron');
const log = require('electron-log');
const { fixPathForAsarUnpack } = require('electron-util');
const taskRunner = require('./taskRunner');
const utils = require('./utils');

// require('fsevents');
console.log('process: ', process.versions);
console.log('process.execPath: ', process.execPath);
const studioMap = {};

log.transports.console.level = 'verbose';
log.transports.file.level = 'verbose';
// log.transports.file.file = '/Users/pwang7/Library/Logs/Rekit/' + 'log.txt';
// const start = require('rekit-studio/lib/start');
console.log('app path: ', app.getAppPath());
// const nodeBin = fixPathForAsarUnpack(path.join(app.getAppPath(), 'node_modules/node/bin/node'));
const nodeBin = fixPathForAsarUnpack(path.join(app.getAppPath(), 'node_modules/node/bin/node'));
// const studioBin = path.join(app.getAppPath(), 'node/studio.js');
// const studioBin = fixPathForAsarUnpack(
//   path.join(app.getAppPath(), 'node-app/nms/rekit-studio/bin/index.js'),
// );
const studioBin = fixPathForAsarUnpack(require.resolve('rekit-studio/bin/index.js'));

log.error('node bin: ', nodeBin);
log.error('studio bin: ', studioBin);
function startStudio(prjDir, restart) {
  if (studioMap[prjDir] && !restart) {
    console.log('already started', prjDir);
    return Promise.resolve(studioMap[prjDir]);
  }
  log.info('starting rekit studio');
  // if restart, keep the port
  const defaultPort = studioMap[prjDir] ? parseInt(studioMap[prjDir].port, 10) : null;
  log.info('default port: ', defaultPort);
  if (studioMap[prjDir] && studioMap[prjDir].process) {
    studioMap[prjDir].process.removeAllListeners('exit');
  }
  return new Promise((resolve, reject) => {
    getPort({ port: defaultPort }).then(port => {
      port = String(port);
      try {
        const child = taskRunner.runTask(`${nodeBin} ${studioBin} -d ${prjDir} -p ${port}`, prjDir);

        child.on('message', msg => {
          if (msg.type === 'rekit-studio-started') {
            studioMap[prjDir].started = true;
            utils.notifyMainStateChange();
          }
          if (msg.type === 'rekit-studio-error') {
            console.error('studio error: ', msg.error);
            studioMap[prjDir].started = false;
            studioMap[prjDir].error = msg.error;
            utils.notifyMainStateChange();
          }
        });
        child.on('exit', msg => {
          console.log('child on exit: ', msg);
          if (studioMap[prjDir]) {
            if (!studioMap[prjDir].error) {
              studioMap[prjDir].error =
                'Rekit Studio tenimated unexpectly, please try to restart it.';
            }
            studioMap[prjDir].started = false;
          }
          utils.notifyMainStateChange();
        });

        studioMap[prjDir] = {
          name: require(`${prjDir}/package.json`).name,
          process: child,
          port,
          prjDir,
        };
        log.info('rekit studio started ', prjDir);
        resolve({ port, prjDir });
      } catch (err) {
        log.error('failed to start rekit studio: ', err);

        reject(new Error({ err }));
      }
    });
  });
}

function stopStudio(prjDir) {
  taskRunner.stopTask(prjDir);
  delete studioMap[prjDir];
  return Promise.resolve();
}

function getRunningStudios() {
  return Object.values(studioMap);
}

module.exports = {
  startStudio,
  stopStudio,
  getRunningStudios,
};
