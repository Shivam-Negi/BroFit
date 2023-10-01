const { StatusCodes } = require('http-status-codes');
const { WorkoutRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error')

const workoutRepository = new WorkoutRepository();

async function createWorkout(data) {
    try {
        const workout = await workoutRepository.create(data);
        return workout;
        
    } catch (error) {
        throw new AppError(error, StatusCodes.INTERNAL_SERVER_ERROR);       
    }
}

async function getWorkouts(query) {
    try {
        let exerciseTags = [];
        if(query.tags) {
            exerciseTags = query.tags.split('-');
        }
        const workouts = await workoutRepository.getWorkouts(exerciseTags);
        return workouts;
        
    } catch (error) {
        throw new AppError(error, StatusCodes.INTERNAL_SERVER_ERROR);       
    }
}

async function getWorkout(params) {
    try {
        const workout = await workoutRepository.getWorkout(params);
        return workout;
    } catch (error) {
        throw new AppError('Cannot get the specified  workout', StatusCodes.INTERNAL_SERVER_ERROR);  
    }
}

async function updateWorkout(id, data) {
    try {
        const workout = await workoutRepository.update(id, data);
        return workout;
    } catch (error) {
        throw new AppError('Cannot update the specified  workout', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function deleteWorkout(id) {
    try {
        const response = await workoutRepository.destroy(id);
        return response;
    } catch (error) {
        throw new AppError('Cannot delete workout from the database', StatusCodes.INTERNAL_SERVER_ERROR); 
    }
}

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    updateWorkout,
    deleteWorkout,
}