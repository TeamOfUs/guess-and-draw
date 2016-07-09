'use strict';

import User from './user.model';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';

/**
 * 验证错误
 * @param res
 * @param statusCode 状态码 默认 422
 * @returns {Function}
 */
function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  };
}
/**
 * 处理错误
 * @param res
 * @param statusCode 状态码 默认 500
 * @returns {Function}
 */
function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

/**
 * 得到用户列表
 * 权限: 'admin'
 * @param req
 * @param res
 * @param next
 * @returns {Promise.<TResult>|Promise}
 */
export function index(req, res, next) {
  return User.find({}, '-salt -password').exec()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
}

/**
 * 创建新用户
 * @param req
 * @param res
 * @param next
 */
export function create(req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save()
    .then(function(user) {
      var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      res.json({ token });
    })
    .catch(validationError(res));
}

/**
 * 查询单个用户
 * @param req
 * @param res
 * @param next
 * @returns {Promise.<TResult>|Promise}
 */
export function show(req, res, next) {
  var userId = req.params.id;

  return User.findById(userId).exec()
    .then(user => {
      if (!user) {
        return res.status(404).end();
      }
      res.json(user.profile);
    })
    .catch(err => next(err));
}

/**
 * 删除用户
 * 权限: 'admin'
 * @param req
 * @param res
 * @param next
 * @returns {Promise.<TResult>|Promise}
 */
export function destroy(req, res, next) {
  return User.findByIdAndRemove(req.params.id).exec()
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
}

/**
 * 更改密码
 * @param req
 * @param res
 * @param next
 * @returns {Promise.<TResult>}
 */
export function changePassword(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  return User.findById(userId).exec()
    .then(user => {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}

/**
 * 取得个人信息
 * @param req
 * @param res
 * @param next
 * @returns {Promise.<TResult>|Promise}
 */
export function me(req, res, next) {
  var userId = req.user._id;

  return User.findOne({ _id: userId }, '-salt -password').exec()
    .then(user => {
      if (!user) {
        return res.status(401).end();
      }
      res.json(user);
    })
    .catch(err => next(err));
}
