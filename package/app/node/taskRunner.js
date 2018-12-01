// Run a task
// const { app, ipcMain } = require('electron');
const { exec, spawn } = require('child_process');

const isWin = process.platform === 'win32';

const processes = {};
function runTask(cmd, cwd) {
  const arr = cmd.split(/ +/g);
  console.log(arr, cwd);
  const name = arr.shift();
  console.log(name, arr);
  const child = spawn(name, arr, {
    cwd,
    stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
  })
  processes[cwd] = child;
  child.stdout.pipe(process.stdout);
  return child;
}

function stopTask(id) {
  const child = typeof id === 'string' ? processes[id] : id;
  if (!child) return;
  try {
    if (isWin) {
      exec('taskkill /pid ' + child.pid + ' /T /F');
    } else {
      child.destroy();
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