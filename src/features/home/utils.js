import React from 'react';
import store from '../../common/store';
import history from '../../common/history';
import {
  openProject as openProjectAction,
  showNewProjectDialog as showNewProjectDialogAction,
  showWelcomePage as showWelcomePageAction,
} from './redux/actions';
import { Modal } from 'antd';

function openProject(dir, restart) {
  if (dir) {
    openProjectByDir(dir, restart);
    return;
  }
  window.bridge.remote.dialog.showOpenDialog(
    {
      title: 'Open a project',
      filters: [],
      properties: ['openDirectory'],
    },
    folders => {
      if (!folders) return; // canceled
      openProjectByDir(folders[0]);
    },
  );
}

function openProjectByDir(prjDir, restart) {
  const studioById = store.getState().home.studioById;
  console.log('open restart: ', restart);
  if (studioById[prjDir] && !restart) {
    // already opened
    history.push(`/rekit-studio/${studioById[prjDir].port}`);
    window.bridge.promiseIpc.send('/open-studio', prjDir);
    return;
  }
  store
    .getStore()
    .dispatch(openProjectAction({ prjDir, restart }))
    .then(studio => {
      history.push(`/rekit-studio/${studio.port}`);
      window.bridge.promiseIpc.send('/open-studio', prjDir);
    })
    .catch(e => {
      console.log('Failed to open project');
      console.log(e);
      Modal.error({
        title: 'Failed to Open Project.',
        content: (
          <div>
            {e.message && <div style={{ color: 'red' }}>{e.message}</div>}
          </div>
        ),
      });
    });
}

function showNewProjectDialog() {
  store.getStore().dispatch(showNewProjectDialogAction());
}

function showWelcomePage() {
  history.push('/');
  // store.getStore().dispatch(showWelcomePageAction());

}

function showPluginsPage() {
  history.push('/plugins');
}

window.bridge.ipcRenderer.on('open-project', (evt, dir) => openProject(dir));
window.bridge.ipcRenderer.on('redux-action', (evt, action) => store.getStore().dispatch(action));
window.bridge.ipcRenderer.on('new-project', evt => showNewProjectDialog());
window.bridge.ipcRenderer.on('show-welcome', evt => showWelcomePage());
window.bridge.ipcRenderer.on('show-plugins', evt => showPluginsPage());
export default {
  openProject,
  showNewProjectDialog,
};
