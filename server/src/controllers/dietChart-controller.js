const { DietChartService } = require('../services');
const { StatusCodes } = require('http-status-codes');
const { successResponse, errorResponse } = require('../utils/common');


async function createDietChart(req, res) {
    try {
        const dietChart = await DietChartService.createDietChart(req.params.id, req.body);
        successResponse.data = dietChart
        return res.status(StatusCodes.CREATED).json(successResponse);
    } catch (error) {
        errorResponse = error;
        return res.status(error.statusCode).json(errorResponse);    
    }
}

async function updateDietChart(req, res) {
    try {
        const dietChart = await DietChartService.updateDietChart(req.params.id, req.body);
        successResponse.data = dietChart;
        return res.status(StatusCodes.OK).json(successResponse); 
    } catch (error) {
        errorResponse = error;
        return res.status(error.statusCode).json(errorResponse);    
    }
}

async function deleteDietChart(req, res) {
    try {
        const dietChart = await DietChartService.updateDietChart(req.params.id);
        successResponse.data = dietChart;
        return res.status(StatusCodes.OK).json(successResponse);    
    } catch (error) {
        errorResponse = error;
        return res.status(error.statusCode).json(errorResponse);     
    }
}

async function getAllDietChartForGym(req, res) {
    try {
        const dietChart = await DietChartService.updateDietChart(req.params.id);
        successResponse.data = dietChart;
        return res.status(StatusCodes.OK).json(successResponse);    
    } catch (error) {
        errorResponse = error;
        return res.status(error.statusCode).json(errorResponse);    
    }
}
async function getDietChartByUserId(req, res) {
    try {
        const dietChart = await DietChartService.getDietChartByUserId(req.params.id);
        successResponse.data = dietChart;
        return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
        errorResponse = error;
        return res.status(error.statusCode).json(errorResponse); 
    }
}

module.exports = {
    createDietChart,
    updateDietChart,
    deleteDietChart,
    getAllDietChartForGym,
    getDietChartByUserId,
}