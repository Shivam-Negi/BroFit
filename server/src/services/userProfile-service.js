const {UserProfileRepository} = require('../repositories');
const userProfileRepository = new UserProfileRepository();
const {StatusCodes} = require('http-status-codes');
const AppError = require('../utils/errors/app-error');


async function createUserProfile(data) {
    try {
        const userProfile = await userProfileRepository.create(data);
        return userProfile;
        
    } catch (error) {
        // console.log(error);
        throw new AppError('', StatusCodes.INTERNAL_SERVER_ERROR);       
    }
}

async function getUserProfiles() {
    try {
        const userProfiles = await userProfileRepository.getAll();
        return userProfiles;
    } catch (error) {
        // console.log(error);
        throw new AppError('', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getUserProfile(id) {
    try {
        const userProfile = await userProfileRepository.getUserProfileInfo(id);
        // console.log(userProfile);
        return userProfile;
    } catch (error) {
        // console.log(error);
        throw new AppError('', StatusCodes.INTERNAL_SERVER_ERROR);    
    }
}

async function updateUserProfile(id, data) {
    try {
        const userProfile = await userProfileRepository.update(id, data);
        return userProfile;
    } catch (error) {
        // console.log(error);
        throw new AppError('', StatusCodes.INTERNAL_SERVER_ERROR);   
    }
}

async function deleteUserProfile(id) {
    try {
        const userProfile = await userProfileRepository.destroy(id);
        return userProfile;
    } catch (error) {
        // console.log(error);
        throw new AppError('', StatusCodes.INTERNAL_SERVER_ERROR);   
    }
}
async function getUserProfileByUserId(id) {
    try {
        const userProfile = await userProfileRepository.getUserProfileByUserId(id);
        return userProfile;
    } catch (error) {
        // console.log(error);
        throw new AppError('', StatusCodes.INTERNAL_SERVER_ERROR);   
    }
}

module.exports = {
    createUserProfile,
    getUserProfiles,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
    getUserProfileByUserId,
}
