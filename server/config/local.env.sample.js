'use strict';

// env.js 为环境变量配置文件，用来设置 api keys, secrets, 等
// 此文件不应该被 Git 追踪
//
// 你需要在你部署的服务器上设置这些值

module.exports = {
  DOMAIN:           'http://localhost:9000',
  SESSION_SECRET:   'secret',

  GOOGLE_ID:        'app-id',
  GOOGLE_SECRET:    'secret',

  // 使用 visionmedia/debug 控制模块 debug 等级
  DEBUG: ''
};
