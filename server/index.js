/**
 * 应用入口
 */

'use strict';

// 设置默认的 node 环境为 development
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
  // 触发 babel-register 钩子
  require('babel-register');
}

// 导出应用程序
exports = module.exports = require('./app');
