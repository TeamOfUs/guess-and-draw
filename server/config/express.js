/**
 * Express 配置
 */

'use strict';

import express from 'express';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import compression from 'compression';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import errorHandler from 'errorhandler';
import path from 'path';
import config from './environment';
import passport from 'passport';

export default function(app) {
  var env = app.get('env');

  //开发或测试环境
  if (env === 'development' || env === 'test') {
    app.use(express.static(path.join(config.root, '.tmp')));
  }

  //生产环境
  if (env === 'production') {
    //使用 serve-favicon 中间件 https://www.npmjs.com/package/serve-favicon
    app.use(favicon(path.join(config.root, 'client', 'favicon.ico')));
  }

  //设置 app 路径
  app.set('appPath', path.join(config.root, 'client'));

  //提供静态文件服务
  app.use(express.static(app.get('appPath')));

  //使用 morgan 中间件 HTTP request logger https://www.npmjs.com/package/morgan
  app.use(morgan('dev'));

  //views 相关设置
  app.set('views', config.root + '/server/views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');

  //使用 compression 中间件 压缩 https://www.npmjs.com/package/compression
  app.use(compression());

  //使用 body-parser 中间件
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(passport.initialize());


  if ('development' === env) {
    app.use(require('connect-livereload')({
      ignore: [
        /^\/api\/(.*)/,
        /\.js(\?.*)?$/, /\.css(\?.*)?$/, /\.svg(\?.*)?$/, /\.ico(\?.*)?$/, /\.woff(\?.*)?$/,
        /\.png(\?.*)?$/, /\.jpg(\?.*)?$/, /\.jpeg(\?.*)?$/, /\.gif(\?.*)?$/, /\.pdf(\?.*)?$/
      ]
    }));
  }

  if ('development' === env || 'test' === env) {
    app.use(errorHandler()); // Error handler 必须放在最后
  }
}
