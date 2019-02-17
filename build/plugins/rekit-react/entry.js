// This file is for UI build
import { hot } from 'react-hot-loader';
import * as ui from './ui';
import route from './route';
import reducer from './redux/reducer';

console.log('rekit react plugin');
const toExport = {
  ...ui,
  route,
  reducer,
  name: 'rekit-react',
};

// // hot(toExport);

window.__REKIT_PLUGINS.push(toExport);
