const express = require('express');
const { UserController } = require('../../controllers');
const { AuthMiddlewares } = require('../../middlewares');
const router = express.Router();

router.get('/:id', UserController.getUser);

router.post('/signup', AuthMiddlewares.validateAuthRequest,
                       UserController.createUser);

router.post('/signin',
                AuthMiddlewares.validateAuthRequest,
                UserController.signin);

module.exports = router;    