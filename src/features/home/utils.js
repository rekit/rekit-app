import store from '../../common/store';
import history from '../../common/history';
import {
  openProject as openProjectAction,
  showNewProjectDialog as showNewProjectDialogAction,
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
        title: 'Failed to open project.',
        content: `Failed to start Rekit Studio for: ${prjDir} ${e.stack}`,
      });
    });
}

function showNewProjectDialog() {
  store.getStore().dispatch(showNewProjectDialogAction());
}

window.bridge.ipcRenderer.on('open-project', (evt, dir) => openProject(dir));

export default {
  openProject,
  showNewProjectDialog,
};
