const express = require('express');
const {RoutineController} = require("../../controllers");
const router = express.Router();


router.post('/:id', RoutineController.createRoutine);

router.patch('/:id', RoutineController.pushWorkout);

module.exports = router;