'use strict';

import {Router} from 'express';
import * as controller from './user.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();
//
//router.get('/', auth.hasRole('admin'), controller.index);
//router.delete('/:id', auth.hasRole('admin'), controller.destroy);
//router.get('/me', auth.isAuthenticated(), controller.me);
//router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
//router.get('/:id', auth.isAuthenticated(), controller.show);//MEI TOU XIANG.
//router.post('/', controller.create);


router.get('/', controller.index);
router.delete('/:id', controller.destroy);
router.get('/me',  controller.me);
router.put('/:id/password',  controller.changePassword);
router.get('/:id',  controller.show);//MEI TOU XIANG.
router.post('/', controller.create);

module.exports = router;


//USER ID,
