const express = require('express');
const { UserController } = require('../../controllers');
const { AuthMiddlewares } = require('../../middlewares');

const router = express.Router();

router.get('/:id', UserController.getUser);

router.post('/signup', AuthMiddlewares.validateAuthRequest,
                       UserController.createUser);

router.post('/signin',
                AuthMiddlewares.validateAuthRequest,
                UserController.signinWithRole('user'));

router.post('/signin/owner',
                AuthMiddlewares.validateAuthRequest,
                UserController.signinWithRole('owner'));

router.post('/signin/admin',
                AuthMiddlewares.validateAuthRequest,
                UserController.signinWithRole('admin'));


module.exports = router;    