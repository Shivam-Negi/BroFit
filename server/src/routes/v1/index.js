const express = require('express');
const router = express.Router();
const gymRouter = require('./gym-routes');
const userRouter = require('./user-routes');
const gymOwnerRouter = require('./gymOwner-routes');
const userProfileRouter = require('./gymOwner-routes');
const planRouter = require('./plan-routes');
const authRouter = require('./authRoutes');

router.use('/gym', gymRouter);
router.use('/gymOwner', gymOwnerRouter);
router.use('/user', userRouter);
router.use('/userprofile', userProfileRouter);
router.use('/plan', planRouter);
router.use('/', authRouter);

module.exports = router;
