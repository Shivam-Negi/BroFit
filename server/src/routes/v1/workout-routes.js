const express = require('express');
const {WorkoutController} = require('../../controllers');
const router = express.Router();

// api/v1/workout/:name will get exercise with the specified name
router.get('/:name', WorkoutController.getWorkout);
// api/v1/workout/?tags=chest-triceps-beginner.....   GET
router.get('/', WorkoutController.getWorkouts);
router.post('/', WorkoutController.createWorkout);
router.delete('/:id', WorkoutController.deleteWorkout);
router.patch('/:id', WorkoutController.updateWorkout);

module.exports = router;