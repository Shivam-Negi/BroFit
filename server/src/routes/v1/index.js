const express = require('express');
const router = express.Router();
const gymRouter = require('./gym-routes');
const userRouter = require('./user-routes');
const planRouter = require('./plan-routes');


router.use('/gym', gymRouter);
router.use('/user', userRouter);
router.use('/plan', planRouter);


module.exports = router;