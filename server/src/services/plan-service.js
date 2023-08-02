const { StatusCodes } = require('http-status-codes');
const plan = require('../models/gym');
const { PlanRepository, GymRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error')

const planRepository = new PlanRepository();
const gymRepository = new GymRepository();

async function createPlan(data) {
    try {
        const gym = await gymRepository.findGym(data.gymId);
        if(!gym) {
            throw 'No gym exists for this gym id.';
        }
        const plan = await planRepository.create(data);
        gym.plans.push(plan);
        await gym.save();
        return plan;
        
    } catch (error) {
        //  console.log(error);
        // if(error instanceof AppError) throw error;
        throw new AppError(error, StatusCodes.INTERNAL_SERVER_ERROR);       
    }
}

async function getPlans(gymId) {
    try {
        const plans = await planRepository.getPlansOfGym(gymId);
        return plans;
    } catch (error) {
        // console.log(error);
        if(error instanceof AppError) throw error;
        throw new AppError('Something went wrong cannot fetch the gym plans', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getPlan(id) {
    try {
        const plan = await planRepository.get(id);
        if(!plan) {
            throw new AppError('no plan found for this id', StatusCodes.BAD_REQUEST);
        }
        return plan;
        
    } catch (error) {
        // console.log(error);
        if(error instanceof AppError) throw error;
        throw new AppError('Something went wrong canont fetch the gym plan', StatusCodes.INTERNAL_SERVER_ERROR);   
    }
}

async function updatePlan(id, data) {
    try {
        const plan = await planRepository.update(id, data);
        return plan;
        
    } catch (error) {
        // console.log(error);
        throw new AppError('Something went wrong while updating the plan', StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}
async function deletePlan(id){
    try {
        const plan = await planRepository.destroy(id);
        if(!plan) {
            throw new AppError('no such plan exist for the given id', StatusCodes.BAD_REQUEST);
        }
        const gym = await gymRepository.deletePlansFromeGymByGymId(plan.gymId, plan._id);
        if(!gym.acknowledged) {
            throw new AppError('unable to remove plans from gym', StatusCodes.BAD_REQUEST);
        }
        return plan;
    } catch (error) {
        // console.log(error);
        if(error instanceof AppError) throw error;
        throw new AppError('Something went wrong while deleting the plan', StatusCodes.INTERNAL_SERVER_ERROR);   
    }
}

module.exports = {
    createPlan,
    getPlan,
    getPlans,
    deletePlan,
    updatePlan
}


