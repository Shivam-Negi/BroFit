const {StatusCodes} = require('http-status-codes');
const { GymService } = require('../services');
const { successResponse, errorResponse } = require('../utils/common');


async function createGym(req, res) {
    try {
        const gym = await GymService.createGym(req.body);
        successResponse.data = gym;
        return res.status(StatusCodes.CREATED).json(successResponse);
        
    } catch (error) {
        errorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
}

async function getGyms(req, res) {
    try {
        const gyms = await GymService.getGyms();
        successResponse.data = gyms;
        return res.status(StatusCodes.OK).json(successResponse);
        
    } catch (error) {
        errorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
}

async function getGym(req, res) {
    try {
        const gym = await GymService.getGym(req.params.id);
        successResponse.data = gym;
        return res.status(StatusCodes.OK).json(successResponse);
        
    } catch (error) {
        errorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);   
    }
}

async function getGymGraph(req, res) {
    try {
        const gym = await GymService.getGymGraph(req.params.id);
        successResponse.data = gym;
        return res.status(StatusCodes.OK).json(successResponse);
        
    } catch (error) {
        errorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);   
    }
}

async function getGymMems(req, res) {
    try {
        const gym = await GymService.getGymMems(req.params.id);
        successResponse.data = gym;
        return res.status(StatusCodes.OK).json(successResponse);
        
    } catch (error) {
        errorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);   
    }
}

async function updateGym(req, res) {
    try {
        const gym = await GymService.updateGym(req.params.id, req.body);
        successResponse.data = gym;
        return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
        errorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
        
    }
}
async function deleteGym(req, res) {
    try {
        const gym = await GymService.deleteGym(req.params.id);
        successResponse.data = gym;
        return res.status(StatusCodes.OK).json(successResponse);
        
    } catch (error) {
        errorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse)
        
    }
}

module.exports = {
    createGym,
    getGyms,
    getGym,
    getGymGraph,
    updateGym,
    deleteGym,
    getGymMems
}