/**
 * GET     /api/entry              ->  index
 * POST    /api/entry              ->  create
 * GET     /api/entry/:id          ->  show
 * PUT     /api/entry/:id          ->  update
 * DELETE  /api/entry/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Entry from './entry.model';

/**
 * 响应结果
 * @param res
 * @param statusCode 状态码 默认 200
 * @returns {Function}
 */
function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

/**
 * 保存更新
 * @param updates
 * @returns {Function}
 */
function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

/**
 * 删除词条
 * @param res
 * @returns {Function}
 */
function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

/**
 * 处理的词条未找到
 * @param res
 * @returns {Function}
 */
function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

/**
 * 处理出现错误
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
 * 取得 Entry 列表
  */
export function index(req, res) {
  return Entry.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * 取得单个词条
 */
export function show(req, res) {
  return Entry.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * 创建词条
 * @param req
 * @param res
 * @returns {Promise.<T>|Promise}
 */
export function create(req, res) {
  return Entry.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

/**
 * 更新词条
 * @param req
 * @param res
 * @returns {Promise.<TResult>|Promise}
 */
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Entry.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * 删除词条
 * @param req
 * @param res
 * @returns {Promise.<TResult>|Promise}
 */
export function destroy(req, res) {
  return Entry.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
