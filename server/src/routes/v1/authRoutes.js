/* const express = require('express');
const router = express.Router();
const cors = require('cors');
const { authController } = require('../../controllers/index.js');

router.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);

module.exports = router;
 */