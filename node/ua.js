const store = require('./store');
const uuidv4 = require('uuid/v4');
const log = require('./log');
const analytics = require('universal-analytics');

let uuid = store.get('uuid');
if (!uuid) {
  uuid = uuidv4();
  log.info('uuid created: ', uuid);
  store.set('uuid', uuid);
} else {
  log.info('uuid exists: ', uuid);
}

const ua = analytics('UA-132547525-1', uuid, { http: true });
ua.set('uid', uuid);
ua.set('source', 'rekit-app');

ua.screenview('start-page', 'rekit-app', '3.0.0', err => {
  if (err) {
    log.warn('ga screenview start-page failed');
    log.warn(err);
  }
}).send();
module.exports = ua;
