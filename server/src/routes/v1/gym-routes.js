const express = require('express');
const { GymController } = require('../../controllers');
const router = express.Router();

router.post('/', GymController.createGym);

module.exports = router;