const { app, Menu, BrowserWindow } = require('electron');
const store = require('./store');
const ua = require('./ua');

function getRecentMenuItems() {
  const recent = store.get('recentProjects') || [];
  if (recent.length > 10) recent.length = 10;
  return recent.map(dir => {
    return {
      label: dir,
      click() {
        BrowserWindow.getFocusedWindow().webContents.send('open-project', dir);
      },
    };
  });
}

store.onDidChange('recentProjects', () => {
  try {
    Menu.getApplicationMenu().clear();
    Menu.getApplicationMenu().destroy();
  } catch (e) {}
  createMenu();
});

function createMenu() {
  const template = [
    {
      label: 'Rekit',
      submenu: [
        { label: 'About Rekit', selector: 'orderFrontStandardAboutPanel:' },
        { type: 'separator' },
        {
          label: 'Quit Rekit',
          accelerator: 'Command+Q',
          click: function() {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Project',
      submenu: [
        {
          label: 'New Project',
          accelerator: 'CmdOrCtrl+N',
          click() {
            ua.event('rekit-app', 'menu:new-project').send();
            BrowserWindow.getFocusedWindow().webContents.send('new-project');
          },
        },
        {
          label: 'Open...',
          accelerator: 'CmdOrCtrl+O',
          click() {
            ua.event('rekit-app', 'menu:open-project').send();
            BrowserWindow.getFocusedWindow().webContents.send('open-project');
          },
        },
        {
          label: 'Open Recent',
          accelerator: 'CmdOrCtrl+O',
          submenu: getRecentMenuItems(),
        },
        {
          label: 'Reload Project',
          click() {
            ua.event('rekit-app', 'menu:reload-project').send();
            BrowserWindow.getFocusedWindow().webContents.send('restart-project');
          },
        },
        {
          label: 'Close Project',
          click() {
            ua.event('rekit-app', 'menu:close-project').send();
            BrowserWindow.getFocusedWindow().webContents.send('close-project');
          },
        },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },

        {
          label: 'Welcome Page',
          click() {
            ua.event('rekit-app', 'menu:welcome-page').send();
            BrowserWindow.getFocusedWindow().webContents.send('show-welcome');
          },
        },
        {
          label: 'Plugins',
          click() {
            ua.event('rekit-app', 'menu:plugins').send();
            BrowserWindow.getFocusedWindow().webContents.send('show-plugins');
          },
        },

        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
        { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
        { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' },
      ],
    },
    {
      label: 'Help',
      submenu: [{ label: 'Helper' }],
    },
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

module.exports = {
  createMenu,
};
