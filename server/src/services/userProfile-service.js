const {UserProfileRepository} = require('../repositories');
const userProfileRepository = new UserProfileRepository();
const {StatusCodes} = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const { currentDate, dateAfterAddingDays } = require('../utils/helpers/datetime-helpers');


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
        //  console.log(userProfile);
        return userProfile;
    } catch (error) {
        // console.log(error);
        throw new AppError('', StatusCodes.INTERNAL_SERVER_ERROR);    
    }
}

async function updateUserProfile(id, data) {
    try {
        const userProfile = await userProfileRepository.updateUserProfile(id, data);
        return userProfile;
    } catch (error) {
        // console.log(error);
        throw new AppError('', StatusCodes.INTERNAL_SERVER_ERROR);   
    }
}

async function updateUserProfilePlans(id, data) {
    try {
        const userProfile = await userProfileRepository.getUserProfileInfo(id);
        const days = userProfile.plan.validity;
        const userProfilePlan = await userProfileRepository.updateUserProfile(userProfile._id, {
            status : data.status,
            planStartDate : currentDate(),
            planExpiryDate : dateAfterAddingDays(days+1),
        });
        return userProfilePlan;
    } catch (error) {
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
    updateUserProfilePlans
}
