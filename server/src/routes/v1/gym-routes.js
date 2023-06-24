const express = require('express');
const { GymController } = require('../../controllers');
const router = express.Router();

router.get('/', GymController.getGyms);
router.post('/', GymController.createGym);

module.exports = router;