const express = require('express');
const { GymController } = require('../../controllers');
const router = express.Router();

router.get('/', GymController.getGyms);
router.post('/', GymController.createGym);
router.get('/:id', GymController.getGym);
router.get('/graph/:id', GymController.getGymGraph);
router.get('/mems/:id', GymController.getGymMems);
router.patch('/:id', GymController.updateGym);
router.delete('/:id', GymController.deleteGym);

module.exports = router;