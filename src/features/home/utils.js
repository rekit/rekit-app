import store from '../../common/store';
import history from '../../common/history';
import { openProject as openProjectAction } from './redux/actions';
import { Modal } from 'antd';

function openProject(dir) {
  if (dir) {
    openProjectByDir(dir);
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

function openProjectByDir(prjDir) {
  const studioById = store.getState().home.studioById;

  if (studioById[prjDir]) {
    // already opened
    history.push(`/rekit-studio/${studioById[prjDir].port}`);
    window.bridge.promiseIpc.send('/open-studio', prjDir);
    return;
  }
  store
    .getStore()
    .dispatch(openProjectAction(prjDir))
    .then(studio => {
      history.push(`/rekit-studio/${studio.port}`);
      window.bridge.promiseIpc.send('/open-studio', prjDir);
    })
    .catch(e => {
      Modal.error({
        title: 'Failed to open project.',
        content: `Failed to start Rekit Studio for: ${prjDir}`,
      });
    });
}

window.bridge.ipcRenderer.on('open-project', (evt, dir) => openProject(dir));

export default {
  openProject,
};
