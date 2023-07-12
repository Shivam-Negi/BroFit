const express = require('express');
const { UserController } = require('../../controllers');
const { AuthMiddlewares } = require('../../middlewares');

const router = express.Router();

router.get('/:id', UserController.getUser);

router.get('/', UserController.getUserInfo);

router.post('/signup', AuthMiddlewares.validateAuthRequest,
                       UserController.createUser);

router.post('/signin',
                AuthMiddlewares.validateAuthRequest,
                AuthMiddlewares.verifyRole('user'),
                UserController.signin);

router.post('/signin/owner',
                AuthMiddlewares.validateAuthRequest,
                AuthMiddlewares.verifyRole('owner'),
                UserController.signin);

router.post('/signin/admin',
                AuthMiddlewares.validateAuthRequest,
                AuthMiddlewares.verifyRole('admin'),
                UserController.signin);

router.delete('/:id',UserController.deleteUser);


module.exports = router;    