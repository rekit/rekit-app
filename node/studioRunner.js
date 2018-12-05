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
log.transports.file.file = '/Users/pwang7/Library/Logs/Rekit/' + 'log.txt';
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
function startStudio(prjDir) {
  if (studioMap[prjDir]) {
    return Promise.resolve(studioMap[prjDir]);
  }
  return new Promise((resolve, reject) => {
    getPort().then(port => {
      port = String(port);
      try {
        // start({ projectRoot: prjDir, port }).then(app => {
        //   studioMap[prjDir] = {
        //     name: require(`${prjDir}/package.json`).name,
        //     process: app,
        //     port,
        //     prjDir,
        //     started: true,
        //   };
        //   resolve({ port, prjDir });
        //   utils.notifyMainStateChange();
        // });

        const child = taskRunner.runTask(`${nodeBin} ${studioBin} -d ${prjDir} -p ${port}`, prjDir);

        // const child = taskRunner.runTask(
        //   `${process.execPath} ${studioBin} -d ${prjDir} -p ${port}`,
        //   prjDir,
        // );
        // console.log('node path: ', process.execPath);
        // const child = fork(studioBin, ['-d', prjDir, '-p', port]);
        child.on('message', msg => {
          if (msg === 'rekit-studio-started') {
            studioMap[prjDir].started = true;
            utils.notifyMainStateChange();
          }
        });
        child.on('exit', msg => {
          console.log('process exit', msg);
          delete studioMap[prjDir];
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

// startStudio('/Users/pwang7/workspace/rekit-studio');

module.exports = {
  startStudio,
  stopStudio,
  getRunningStudios,
};
