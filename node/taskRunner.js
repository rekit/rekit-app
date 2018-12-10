// Run a task
const path = require('path');
const { app } = require('electron');
const { exec, spawn } = require('child_process');
const { fixPathForAsarUnpack } = require('electron-util');

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
console.log('node_path:', process.env.NODE_PATH);
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
  const child = typeof id === 'string' ? processes[id] : id;
  if (!child) return;
  try {
    if (isWin) {
      exec('taskkill /pid ' + child.pid + ' /T /F');
    } else {
      child.kill();
    }
  } catch (e) {
    console.log('failed to kill the process: ', e);
  }
  delete processes[id];
}

function stopAllTasks(id) {
  Object.values(processes).forEach(stopTask);
}

module.exports = {
  runTask,
  stopTask,
  stopAllTasks,
};
