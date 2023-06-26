const { StatusCodes } = require('http-status-codes');
const { PlanService } = require('../services');
const { successResponse, errorResponse } = require('../utils/common');


async function createPlan(req, res) {
    try {
        const plan = await PlanService.createPlan(req.body);
        successResponse.data = plan;
        return res.status(StatusCodes.CREATED).json(successResponse);
        
    } catch (error) {
        errorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
}

async function getPlans(req, res) {
    try {
        const plans = await PlanService.getPlans();
        successResponse.data = plans;
        return res.status(StatusCodes.OK).json(successResponse);
        
    } catch (error) {
        errorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
}

async function getPlan(req, res) {
    try {
        const plan = await PlanService.getPlan(req.params.id);
        successResponse.data = plan;
        return res.status(StatusCodes.OK).json(successResponse);
        
    } catch (error) {
        errorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);   
    }
}
async function updatePlan(req, res) {
    try {
        const plan = await PlanService.updatePlan(req.params.id, req.body);
        successResponse.data = plan;
        return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
        errorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
        
    }
}
async function deletePlan(req, res) {
    try {
        const plan = await PlanService.deletePlan(req.params.id);
        successResponse.data = plan;
        return res.status(StatusCodes.OK).json(successResponse);
        
    } catch (error) {
        errorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse)
        
    }
}

module.exports = {
    createPlan,
    getPlan,
    getPlans,
    updatePlan,
    deletePlan
}