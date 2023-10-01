const {StatusCodes} = require("http-status-codes");
const {RoutineService} = require('../services');
const { successResponse, errorResponse } = require('../utils/common');



async function createRoutine(req, res) {
    try {
        const routine = await RoutineService.createRoutine(req.params.id, req.body);
        successResponse.data = routine;
        return res.status(StatusCodes.CREATED).json(successResponse);
        
    } catch (error) {
        errorResponse.error = error;
        return res.status(error.statusCode).json(errorResponse);
    }
}

async function pushWorkout(req, res) {
    try {
        const routine = await RoutineService.pushWorkout(req.params.id, req.body);
        successResponse.data = routine;
        return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
        errorResponse.error = error;
        return res.status(error.statusCode).json(errorResponse);        
    }
}

async function getRoutinesNames(req, res) {
    try {
        const routinesNames = await RoutineService.getRoutinesNames(req.params);
        successResponse.data = routinesNames;
        return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
        errorResponse.error = error;
        return res.status(error.statusCode).json(errorResponse);
    }
}

async function getRoutineDayContent(req, res) {
    try {
        const routineContent = await RoutineService.getRoutineDayContent(req.params.id, req.params.day);
        successResponse.data = routineContent;
        return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
        errorResponse.error = error;
        return res.status(error.statusCode).json(errorResponse);        
    }
}
module.exports = {
    createRoutine,
    getRoutinesNames,
    getRoutineDayContent,
    pushWorkout,
};