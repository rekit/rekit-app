const fs = require('fs-extra');
const path = require('path');
const srcDir = path.join(__dirname, '../../rekit-studio/src/features');
const destDir = path.join(__dirname, '../build/plugins');
fs.ensureDirSync(destDir);
['rekit-react'].forEach(plugin => {
  fs.copySync(path.join(srcDir, plugin), path.join(destDir, plugin));
});
