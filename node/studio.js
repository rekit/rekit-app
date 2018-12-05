const path = require('path');

const PATH_APP_NODE_MODULES = path.join(__dirname, '../node-app/nms');
require('module').globalPaths.push(PATH_APP_NODE_MODULES);
module.paths.push(PATH_APP_NODE_MODULES);
console.log(PATH_APP_NODE_MODULES);
require('rekit-studio/lib/start')({
  projectRoot: '/Users/pwang7/workspace/rekit-studio',
  port: '9001',
});
