/**
 * 在服务启动时使用样本数据填充 DB
 * 如需关闭，config/environment/index.js 文件中配置  `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';

Thing.find({}).remove()
  .then(() => {
    Thing.create({
      name: '1',
      info: '1'
    }, {
      name: '2',
      info: '2'
    }, {
      name: '3',
      info: '3'
    }, {
      name: '4',
      info: '4'
    }, {
      name: '5',
      info: '5'
    }, {
      name: '6',
      info: '6'
    });
  });

User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      name: 'llissery',
      email: 'llissery@gmail.com',
      password: 'llissery'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('用户填充完成 O(∩_∩)O~');
    });
  });
