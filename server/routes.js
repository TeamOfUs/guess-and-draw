/**
 * 路由
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // 下面插入路由
  app.use('/api/users', require('./api/user'));

  app.use('/api/entrys', require('./api/entry'));

  app.use('/auth', require('./auth').default);

  app.route('/room/:roomid')
      .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/views/index.html'));
    });

  app.route('/login')
      .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/views/login.html'));
  });
  // 未定义的资源或 API 路由返回 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);

  // 其它路由重定向到 index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/views/index.html'));
    });
}
