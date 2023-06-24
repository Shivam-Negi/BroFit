const express = require('express');
const router = express.Router();
const gymRouter = require('./gym-routes');


router.use('/gym', gymRouter);


module.exports = router;