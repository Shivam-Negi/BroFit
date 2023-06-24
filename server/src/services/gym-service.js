const { StatusCodes } = require('http-status-codes');
const gym = require('../models/gym');
const {GymRepository} = require('../repositories');
const gymRepository = new GymRepository();
const AppError = require('../utils/errors/app-error')


async function createGym(data) {
    try {
        const gym = await gymRepository.create(data);
        return gym;
        
    } catch (error) {
        // console.log(error);
        throw new AppError('', StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}

async function getGyms() {
    try {
        const gyms = await gymRepository.getAll();
        return gyms;
    } catch (error) {
        // console.log(error);
        throw new AppError('', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getGym(id) {
    try {
        const gym = await gymRepository.get(id);
        return gym;
        
    } catch (error) {
        // console.log(error);
        throw new AppError('', StatusCodes.INTERNAL_SERVER_ERROR);   
    }
}

async function updateGym(id, data) {
    try {
        const gym = await gymRepository.update(id, data);
        return gym;
        
    } catch (error) {
        // console.log(error);
        throw new AppError('', StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}
async function deleteGym(id){
    try {
        const gym = await gymRepository.destroy(id);
        return gym;

    } catch (error) {
        // console.log(error);
        throw new AppError('', StatusCodes.INTERNAL_SERVER_ERROR);   
    }
}

module.exports = {
    createGym,
    getGyms,
    getGym,
    updateGym,
    deleteGym
}


