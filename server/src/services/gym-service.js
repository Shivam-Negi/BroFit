const gym = require('../models/gym');
const {GymRepository} = require('../repositories');
const gymRepository = new GymRepository();


async function createGym(data) {
    try {
        const gym = await gymRepository.create(data);
        return gym;
        
    } catch (error) {
        // console.log(error);
        throw error;
        
    }
}

async function getGyms() {
    try {
        const gyms = await gymRepository.getAll();
        return gyms;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    createGym,
    getGyms
}


