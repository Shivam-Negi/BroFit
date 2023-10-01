const express = require('express');
const {WorkoutController} = require('../../controllers');
const router = express.Router();

// api/v1/workout/:target?tags=chest-triceps-beginner.....   GET
router.get('/:target', WorkoutController.getWorkouts);
router.post('/', WorkoutController.createWorkout);
router.delete('/:id', WorkoutController.deleteWorkout);
router.patch('/:id', WorkoutController.updateWorkout);

module.exports = router;