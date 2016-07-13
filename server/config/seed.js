/**
 * 在服务启动时使用样本数据填充 DB
 * 如需关闭，config/environment/index.js 文件中配置  `seedDB: false`
 */

'use strict';
import Entry from '../api/entry/entry.model';
import User from '../api/user/user.model';

Entry.find({}).remove()
  .then(() => {
    Entry.create({
      name: '词条1',
      prompt: ['提示1','提示2','提示3'],
      category: '类别1'
    }, {
      name: '2',
      prompt: ['1','2','3'],
      category: '2'
    }, {
      name: '3',
      prompt: ['1','2','3'],
      category: '3'
    }, {
      name: '4',
      prompt: ['1','2','3'],
      category: '4'
    }, {
      name: '5',
      prompt: ['1','2','3'],
      category: '5'
    }, {
      name: '6',
      prompt: ['1','2','3'],
      category: '6'
    })
      .then(() => {
        console.log('词条填充完成 (⊙o⊙)');
      });
  });

User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      name: '李愿愿',
      email: 'llissery@gmail.com',
      password: 'password'
    }, {
      provider: 'local',
      name: '陈旭礼',
      email: 'cxl@gmail.com',
      password: 'password'
    }, {
      provider: 'local',
      name: '徐再贤',
      email: 'xzx@gmail.com',
      password: 'password'
    }, {
      provider: 'local',
      name: '陈武亮',
      email: 'cwl@gmail.com',
      password: 'password'
    }, {
      provider: 'local',
      name: '王晓斌',
      email: 'wxb@gmail.com',
      password: 'password'
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
