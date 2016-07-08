/**
 * 应用
 */

'use strict';

import express from 'express';
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');
import config from './config/environment';
import http from 'http';

// 连接 MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB 连接错误：' + err);
  process.exit(-1);
});

// 使用样本数据填充 DB
if (config.seedDB) { require('./config/seed'); }

// 启动 server
var app = express();
var server = http.createServer(app);
// var socketio = require('socket.io')(server, {
//   serveClient: config.env !== 'production',
//   path: '/socket.io-client'
// });
// require('./config/socketio').default(socketio);
require('./config/express').default(app);
require('./routes').default(app);

// 运行服务端
function startServer() {
  app.guessAndDraw = server.listen(config.port, config.ip, function() {
    console.log('Express 正在监听 %s : %d, ，当前模式为 %s', config.ip, config.port, app.get('env'));
  });
}

setImmediate(startServer);

exports = module.exports = app;
