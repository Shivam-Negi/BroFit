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

module.exports = {
    createRoutine,
    pushWorkout,
};