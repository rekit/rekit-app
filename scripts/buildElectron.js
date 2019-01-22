// Copy files before build electron app
const path = require('path');
const fs = require('fs-extra');

const buildDir = path.join(__dirname, '../build');
console.log('copy files');
['rekit-react', 'ebay-node'].forEach(name => {
  fs.copySync(
    path.join(__dirname, '../../rekit-plugin-boilerplate/src/features', name),
    path.join(buildDir, 'plugins', name),
  );
});
