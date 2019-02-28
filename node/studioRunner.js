const getPort = require('get-port');
const path = require('path');
const { app } = require('electron');
const log = require('electron-log');
const { fixPathForAsarUnpack } = require('electron-util');
const taskRunner = require('./taskRunner');
const utils = require('./utils');

const studioMap = {};

const nodeBin = fixPathForAsarUnpack(path.join(app.getAppPath(), 'node_modules/node/bin/node'));
const studioBin = fixPathForAsarUnpack(require.resolve('rekit-studio/bin/index.js'));
log.info('Node bin: ', nodeBin);
log.info('Studio bin: ', studioBin);
let stopping = {}; // This is used for avoid catching 'exit' event while manually stopping
function startStudio(prjDir, restart) {
  delete stopping[prjDir];
  if (studioMap[prjDir] && !restart) {
    log.info('already started', prjDir);
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
            log.error('studio error: ', msg.error);
            studioMap[prjDir].started = false;
            studioMap[prjDir].error = msg.error;
            utils.notifyMainStateChange();
          }
        });
        child.on('exit', msg => {
          if (stopping[prjDir]) {
            return;
          }
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
  stopping[prjDir] = true;
  return taskRunner.stopTask(prjDir).then(() => {
    delete studioMap[prjDir];
  });
}

function getRunningStudios() {
  return Object.values(studioMap);
}

module.exports = {
  startStudio,
  stopStudio,
  getRunningStudios,
};
