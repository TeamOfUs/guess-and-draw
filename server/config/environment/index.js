'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error('你必须设置 ' + name + ' 环境变量！');
  }
  return process.env[name];
}

// 所有配置将会继承这些选项
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // 根路径
  root: path.normalize(__dirname + '/../../..'),

  // 端口
  port: process.env.PORT || 3000,

  // IP
  ip: process.env.IP || '0.0.0.0',

  // 是否使用简单数据填充 DB
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'llissery-secret'
  },

  // MongoDB 连接选项
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

  google: {
    clientID:     process.env.GOOGLE_ID || 'id',
    clientSecret: process.env.GOOGLE_SECRET || 'secret',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/google/callback'
  }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./shared'),
  require('./' + process.env.NODE_ENV + '.js') || {});
