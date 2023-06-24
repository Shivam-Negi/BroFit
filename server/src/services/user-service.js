const user = require('../models/gym');
const {UserRepository} = require('../repositories');
const userRepository = new UserRepository();
const AppError = require('../utils/errors/app-error');
const {StatusCodes} = require('http-status-codes')


async function createUser(data) {
    try {
        const user = await userRepository.create(data);
        return user;
        
    } catch (error) {
        // console.log(error);
        throw new AppError('', StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}

async function getUsers() {
    try {
        const users = await userRepository.getAll();
        return users;
    } catch (error) {
        // console.log(error);
        throw new AppError('', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getUser(id) {
    try {
        const user = await userRepository.get(id);
        return user;
    } catch (error) {
        // console.log(error);
        throw new AppError('', StatusCodes.INTERNAL_SERVER_ERROR);    
    }
}

async function updateUser(id, data) {
    try {
        const user = await userRepository.update(id, data);
        return user;
    } catch (error) {
        // console.log(error);
        throw new AppError('', StatusCodes.INTERNAL_SERVER_ERROR);   
    }
}

async function deleteUser(id) {
    try {
        const user = await userRepository.destroy(id);
        return user;
    } catch (error) {
        // console.log(error);
        throw new AppError('', StatusCodes.INTERNAL_SERVER_ERROR);   
    }
}

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
}


