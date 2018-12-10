const { app, Menu, BrowserWindow } = require('electron');
const store = require('./store');

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
        { label: 'New Project', accelerator: 'CmdOrCtrl+N' },
        {
          label: 'Open...',
          accelerator: 'CmdOrCtrl+O',
          click() {
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
            BrowserWindow.getFocusedWindow().webContents.send('restart-project');
          },
        },
        {
          label: 'Close Project',
          click() {
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
        { label: 'Show welcome page' },

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
