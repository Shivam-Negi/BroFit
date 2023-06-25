const {GymOwnerRepository} = require('../repositories');
const gymOwnerRepository = new GymOwnerRepository(); 
const AppError = require('../utils/errors/app-error');
const {StatusCodes} = require('http-status-codes');


async function createGymOwner(data) {
    try {
        const gymOwner = await gymOwnerRepository.create(data);
        return gymOwner;
        
    } catch (error) {
        // console.log(error);
        throw new AppError('', StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}

async function getGymOwners() {
    try {
        const gymOwners = await gymOwnerRepository.getAll();
        return gymOwners;
    } catch (error) {
        // console.log(error);
        throw new AppError('', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getGymOwner(id) {
    try {
        const gymOwner = await gymOwnerRepository.get(id);
        return gymOwner;
    } catch (error) {
        // console.log(error);
        throw new AppError('', StatusCodes.INTERNAL_SERVER_ERROR);    
    }
}

async function updateGymOwner(id, data) {
    try {
        const gymOwner = await gymOwnerRepository.update(id, data);
        return gymOwner;
    } catch (error) {
        // console.log(error);
        throw new AppError('', StatusCodes.INTERNAL_SERVER_ERROR);   
    }
}

async function deleteGymOwner(id) {
    try {
        const gymOwner = await gymOwnerRepository.destroy(id);
        return gymOwner;
    } catch (error) {
        // console.log(error);
        throw new AppError('', StatusCodes.INTERNAL_SERVER_ERROR);   
    }
}

module.exports = {
    createGymOwner,
    getGymOwner,
    getGymOwners,
    updateGymOwner,
    deleteGymOwner,
}
