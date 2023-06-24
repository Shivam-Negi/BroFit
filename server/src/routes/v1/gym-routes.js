const express = require('express');
const { GymService } = require('../../services');
const router = express.Router();

router.post('/', GymService.createGym);

module.exports = router;