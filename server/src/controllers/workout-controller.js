const {StatusCodes} = require('http-status-codes');
const { WorkoutService } = require('../services');
const { successResponse, errorResponse } = require('../utils/common');

async function createWorkout(req, res) {
    try {
        const workout = await WorkoutService.createWorkout(req.body);
        successResponse.data = workout;
        return res.status(StatusCodes.CREATED).json(successResponse);
    } catch (error) {
        errorResponse.error = error;
        return res.status(error.statusCode).json(errorResponse);
    }
}

async function getWorkouts(req, res) {
    try {
        const workouts = await WorkoutService.getWorkouts(req.query);
        successResponse.data = workouts;
        return res
                .status(StatusCodes.CREATED)
                .json(successResponse);
    } catch (error) {
        errorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(errorResponse);
    }
}

async function getWorkout(req, res) {
    try {
        const workouts = await WorkoutService.getWorkout(req.params.name);
        successResponse.data = workouts;
        return res
                .status(StatusCodes.CREATED)
                .json(successResponse);
    } catch (error) {
        errorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(errorResponse);
    }
}

async function updateWorkout(req, res) {
    try {
        const workout = await WorkoutService.updateWorkout(req.params.id, req.body);
        successResponse.data = workout;
        return res
                .status(StatusCodes.CREATED)
                .json(successResponse);
    } catch (error) {
        errorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(errorResponse);
    }
}

async function deleteWorkout(req, res) {
    try {
        const response = await WorkoutService.deleteWorkout(req.params.id);
        successResponse.data = response;
        return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
        errorResponse.error = error;
        return res.status(error.statusCode).json(errorResponse);
    }
}

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    updateWorkout,
    deleteWorkout,
}