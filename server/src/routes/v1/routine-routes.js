const express = require('express');
const {RoutineController} = require("../../controllers");
const router = express.Router();


router.post('/:id', RoutineController.createRoutine);
router.get('/name/:visibility/:id', RoutineController.getRoutinesNames);
router.get('/content/:id/:day', RoutineController.getRoutineDayContent);
router.patch('/:id', RoutineController.pushWorkout);
router.delete('/:id', RoutineController.deleteRoutine);

module.exports = router;