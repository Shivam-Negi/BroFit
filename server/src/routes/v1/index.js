const express = require('express');
const router = express.Router();
const gymRouter = require('./gym-routes');
const userRouter = require('./user-routes');
const gymOwnerRouter = require('./gymOwner-routes');
const userProfileRouter = require('./gymOwner-routes');


router.use('/gym', gymRouter);
router.use('/gymOwner', gymOwnerRouter);
router.use('/user', userRouter);
router.use('/userprofile', userProfileRouter);

module.exports = router;