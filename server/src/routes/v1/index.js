const express = require('express');
const router = express.Router();
const gymRouter = require('./gym-routes');
const userRouter = require('./user-routes');


router.use('/gym', gymRouter);
router.use('/user', userRouter);


module.exports = router;