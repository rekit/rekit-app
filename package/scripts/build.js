const fs = require('fs-extra');
const paths = require('../config/paths');

const buildStatic = require('./buildStatic');

console.log('Building static assets...');
// buildStatic().then(() => {
//   console.log('Build static assets done.');

//   // Copy node files
//   console.log('Copy node files');

//   // Process index.html
// });

function buildElectron() {
  fs.removeSync(paths.resolveApp('app/node'));
  fs.copySync(paths.resolveApp('node'), paths.resolveApp('app/node'), {
    dereference: true,
  });
}

buildElectron();