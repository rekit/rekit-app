const { ipcRenderer, shell, remote } = require('electron');
const fs = require('fs');
const path = require('path');
const ua = require('./ua');

window.bridge = {
  ipcRenderer,
  isWin: process.platform === 'win32',
  shell,
  remote,
  fs,
  path,
  ua,
  openUrl(url) {
    shell.openExternal(url);
  }
};
