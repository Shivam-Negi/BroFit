const { StatusCodes } = require('http-status-codes');
const plan = require('../models/gym');
const { PlanRepository } = require('../repositories');
const planRepository = new PlanRepository();
const AppError = require('../utils/errors/app-error')


async function createPlan(data) {
    try {
        const plan = await planRepository.create(data);
        return plan;
        
    } catch (error) {
        // console.log(error);
        throw new AppError('', StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}

async function getPlans() {
    try {
        const plans = await planRepository.getAll();
        return plans;
    } catch (error) {
        // console.log(error);
        throw new AppError('', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getPlan(id) {
    try {
        const plan = await planRepository.get(id);
        return plan;
        
    } catch (error) {
        // console.log(error);
        throw new AppError('', StatusCodes.INTERNAL_SERVER_ERROR);   
    }
}

async function updatePlan(id, data) {
    try {
        const plan = await planRepository.update(id, data);
        return plan;
        
    } catch (error) {
        // console.log(error);
        throw new AppError('', StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}
async function deletePlan(id){
    try {
        const plan = await planRepository.destroy(id);
        return plan;

    } catch (error) {
        // console.log(error);
        throw new AppError('', StatusCodes.INTERNAL_SERVER_ERROR);   
    }
}

module.exports = {
    createPlan,
    getPlan,
    getPlans,
    deletePlan,
    updatePlan
}


