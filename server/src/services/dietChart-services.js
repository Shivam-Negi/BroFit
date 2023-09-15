const {StatusCodes} = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const { DietChartRepository } = require('../repositories');

const dietChartRepository = new DietChartRepository();


async function createDietChart(id, data) {
    try {
        const dietChart = await dietChartRepository.create({
            gymId : data.gymId,
            userId : id,
            dietPlanName : data.dietPlanName,
            dietPlanDescription : data.dietPlanDescription,

        });
        return dietChart;
    } catch (error) {
        throw new AppError('Something went wrong while creating dietChart', StatusCodes.INTERNAL_SERVER_ERROR);   
    }
}

async function updateDietChart(id, data) {
    try {
        const dietChart = await dietChartRepository.update(id, data);
        return dietChart;
    } catch (error) {
        throw new AppError('Something went wrong while updating dietChart', StatusCodes.INTERNAL_SERVER_ERROR);     
    }
}

async function deleteDietChart(id) {
    try {
        const dietChart = await dietChartRepository.destroy(id);
        return dietChart;
    } catch (error) {
        throw new AppError('Something went wrong while deleting dietChart', StatusCodes.INTERNAL_SERVER_ERROR);   
    }
}

async function getDietChartByGymId(id) {
    try {
        const dietCharts = await dietChartRepository.getDietChartsByGymId(id);
        return dietCharts;

    } catch (error) {
        throw new AppError('Something went wrong while fetching the dietChart', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getDietChartByUserId(id) {
    try {
        const dietChart = await dietChartRepository.getDietChartByUserId(id);
        return dietChart;
    } catch (error) {
        throw new AppError('Something went wrong while fetching the dietChart', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createDietChart,
    updateDietChart,
    deleteDietChart,
    getDietChartByGymId,
    getDietChartByUserId,
}


