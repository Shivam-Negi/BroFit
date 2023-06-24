const user = require('../models/gym');
const {UserRepository} = require('../repositories');
const userRepository = new UserRepository();


async function createUser(data) {
    try {
        const user = await userRepository.create(data);
        return user;
        
    } catch (error) {
        // console.log(error);
        throw error;
        
    }
}

async function getUsers() {
    try {
        const users = await userRepository.getAll();
        return users;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    createUser,
    getUsers
}


