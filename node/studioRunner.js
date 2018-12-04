const getPort = require('get-port');
const { fork } = require('child_process');
const path = require('path');
const { app } = require('electron');
const taskRunner = require('./taskRunner');
const utils = require('./utils');
// require('fsevents');
const studioBin = require.resolve('rekit-studio/bin/index.js');
console.log('process: ', process.versions);
console.log('process.execPath: ', process.execPath);
const studioMap = {};
console.log('rekit studio: ', require.resolve('rekit-studio/lib/start'));
// const start = require('rekit-studio/lib/start');
console.log('app path: ', app.getAppPath());
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
        const nodeBin = path.join(app.getAppPath(), 'node-app/node_modules/node/bin/node');
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
        resolve({ port, prjDir });
      } catch (err) {
        console.log('failed to start rekit studio: ', err);
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
