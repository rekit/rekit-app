const getPort = require('get-port');
const taskRunner = require('./taskRunner');
const utils = require('./utils');

const studioBin = require.resolve('rekit-studio/bin/index.js');

const studioMap = {};

function startStudio(prjDir) {
  if (studioMap[prjDir]) {
    return Promise.resolve(studioMap[prjDir]);
  }
  return new Promise((resolve, reject) => {
    getPort().then(port => {
      const child = taskRunner.runTask(`node ${studioBin} -d ${prjDir} -p ${port}`, prjDir);
      child.on('message', msg => {
        // if (msg === 'rekit-studio-started') resolve({ port, prjDir });
        studioMap[prjDir].started = true;
        utils.notifyMainStateChange();
      });
      child.on('exit', () => {
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
    });
  });
}

function stopStudio(prjDir) {
  taskRunner.stopTask(prjDir);
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
