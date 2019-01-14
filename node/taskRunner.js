// Run a task
const path = require('path');
const { app } = require('electron');
const { exec, spawn } = require('child_process');
const log = require('electron-log');
const { fixPathForAsarUnpack } = require('electron-util');
const terminate = require('terminate');

const isWin = process.platform === 'win32';

const processes = {};

function getEnvPath() {
  // let envPath = config.get('envPath');
  // if (envPath) {
  //   if (isWin) {
  //     envPath = ';' + envPath;
  //   } else {
  //     envPath = ':/usr/local/bin:/usr/local/sbin:/usr/local/share/npm/bin:/usr/local/share/node/bin:' + envPath;
  //   }
  // } else {
  //   envPath = ':/usr/local/bin:/usr/local/sbin:/usr/local/share/npm/bin:/usr/local/share/node/bin';
  // }
  const envPath =
    ':/usr/local/bin:/usr/local/sbin:/usr/local/share/npm/bin:/usr/local/share/node/bin';
  return `:${envPath}:${fixPathForAsarUnpack(
    path.join(app.getAppPath(), 'node_modules/node/bin'),
  )}:${fixPathForAsarUnpack(path.join(app.getAppPath(), 'node_modules/npm/bin'))}`;
}

function runTask(cmd, cwd) {
  const arr = cmd.split(/ +/g);
  const name = arr.shift();
  const child = spawn(name, arr, {
    cwd,
    stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
    versions: '3.1',
    // env: {
    //   NODE_PATH: `${process.env.NODE_PATH}:${fixPathForAsarUnpack(
    //     path.join(app.getAppPath(), 'node-app/nms'),
    //   )}`,
    // },
    // env: { ELECTRON_RUN_AS_NODE: '0' },
    env: Object.assign({}, process.env, { PATH: `${process.env.PATH}${getEnvPath()}` }),
  });
  child.on('exit', () => {
    delete processes[cwd];
  });
  processes[cwd] = child;
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
  return child;
}

function stopTask(id) {
  const child = processes[id];
  log.info('Stopping task: ', id);
  if (!child) return Promise.resolve();
  return new Promise((resolve, reject) => {
    terminate(child.pid, err => {
      if (err) {
        log.error('Failed to stop task: ', id, err);
        reject(err);
      } else {
        log.info('Task stopped: ', id);
        resolve();
      }
    });
    delete processes[id];
  });
}

function stopAllTasks() {
  if (Object.keys(processes).length === 0) return new Promise(resolve => setTimeout(resolve, 100));
  return Promise.all(Object.values(Object.keys(processes)).map(stopTask));
}

module.exports = {
  runTask,
  stopTask,
  stopAllTasks,
};
