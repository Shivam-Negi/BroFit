const express = require('express');
const { UserController } = require('../../controllers');
const { AuthMiddlewares } = require('../../middlewares');

const router = express.Router();

router.get('/:id', UserController.getUser);

router.get('/:reg/:gym', UserController.getUserInfo);

router.post('/signup', AuthMiddlewares.validateAuthRequest,
                       AuthMiddlewares.checkOwner,
                       UserController.createUser);

router.post('/signin',
                AuthMiddlewares.validateAuthRequest,
                // AuthMiddlewares.verifyRole('user'),
                UserController.signin);

// router.post('/signin/owner',
//                 AuthMiddlewares.validateAuthRequest,
//                 AuthMiddlewares.verifyRole('owner'),
//                 UserController.signin);

// router.post('/signin/admin',
//                 AuthMiddlewares.validateAuthRequest,
//                 AuthMiddlewares.verifyRole('admin'),
//                 UserController.signin);

router.delete('/:id',UserController.deleteUser);

router.patch('/:id', UserController.addRoleToUser);

router.patch('/reg/:id', UserController.updateUserReg);

module.exports = router;    