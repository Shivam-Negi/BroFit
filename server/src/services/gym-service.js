const { StatusCodes } = require('http-status-codes');
const { GymRepository } = require('../repositories');
const gymRepository = new GymRepository();
const AppError = require('../utils/errors/app-error');

async function createGym(data) {
    try {
        const gym = await gymRepository.create(data);
        return gym;
        
    } catch (error) {
        // console.log(error);
        throw new AppError('Something went wrong while creating gym model', StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}

async function getGyms() {
    try {
        const gyms = await gymRepository.getAll();
        return gyms;
    } catch (error) {
        // console.log(error);
        throw new AppError('Something went wrong while fetching gyms', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getGym(id) {
    try {
        const gym = await gymRepository.getGymInfo(id);
        if(!gym) {
            throw new AppError('no gym for this gymId', StatusCodes.BAD_REQUEST);
        }
        return gym;
        
    } catch (error) {
        // console.log(error);
        if(error instanceof AppError) throw error;
        throw new AppError('Something went wrong while fetching the gym', StatusCodes.INTERNAL_SERVER_ERROR);   
    }
}

async function getGymGraph(id) {
    try {
        const gym = await gymRepository.getGymGraph(id);
        if(!gym) {
            throw new AppError('no graph exist for this gym', StatusCodes.BAD_REQUEST);
        }
        return gym;
        
    } catch (error) {
        // console.log(error);
        if(error instanceof AppError) throw error;
        throw new AppError('Something went wrong while fetch the gym graph', StatusCodes.INTERNAL_SERVER_ERROR);   
    }
}

async function getGymMems(id) {
    try {
        const gym = await gymRepository.getGymMems(id);
        if(!gym) {
            throw new AppError('no gym exist for this gymId',StatusCodes.BAD_REQUEST);
        }
        return gym;
        
    } catch (error) {
        // console.log(error);
        if(error instanceof AppError) throw error;
        throw new AppError('Something went wrong while fetching members from gym', StatusCodes.INTERNAL_SERVER_ERROR);   
    }
}

async function updateGym(id, data) {
    try {
        const gym = await gymRepository.updateByGymId(id, data);
        return gym;
        
    } catch (error) {
        // console.log(error);
        throw new AppError('Something went wrong while updating gym', StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}
async function deleteGym(id){
    try {
        const gym = await gymRepository.destroy(id);
        if(!gym) {
            throw new AppError('no gym found for this id', StatusCodes.BAD_REQUEST);
        }
        return gym;

    } catch (error) {
        // console.log(error);
        if(error instanceof AppError) throw error;
        throw new AppError('Something went wrong while deleting gym', StatusCodes.INTERNAL_SERVER_ERROR);   
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


