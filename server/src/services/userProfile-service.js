const {UserProfileRepository, UserRepository} = require('../repositories');
const userProfileRepository = new UserProfileRepository();
const userRepository = new UserRepository();
const {StatusCodes} = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const { currentDate, dateAfterAddingDays } = require('../utils/helpers/datetime-helpers');
const user = require('../models/user');


async function createUserProfile(data) {
    try {
        const user = await userRepository.get(data.userId);
        if(!user) {
            throw new AppError('no user found for the userId', StatusCodes.BAD_REQUEST);
        }
        data.gymId = user.gymId;
        const userProfile = await userProfileRepository.create(data);
        return userProfile;
        
    } catch (error) {
        // console.log(error);
        if(error instanceof AppError) throw error;
        throw new AppError('Something went wrong cannot create user Profile', StatusCodes.INTERNAL_SERVER_ERROR);       
    }
}

async function getUserProfiles() {
    try {
        const userProfiles = await userProfileRepository.getAll();
        return userProfiles;
    } catch (error) {
        // console.log(error);
        throw new AppError('Something went wrong cannot fetch the user Profiles', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getUserProfile(id) {
    try {
        const userProfile = await userProfileRepository.getUserProfileInfo(id);
        if(!userProfile) {
            throw new AppError('no user Profile found for this user', StatusCodes.BAD_REQUEST);
        }
        //  console.log(userProfile);
        return userProfile;
    } catch (error) {
        // console.log(error);
        if(error instanceof AppError) throw error;
        throw new AppError('Something went wrong cannot fetch the user Profiles', StatusCodes.INTERNAL_SERVER_ERROR);    
    }
}

async function getUserAttendance(id) {
    try {
        const userProfile = await userProfileRepository.getUserAttendance(id);
        if(!userProfile) {
            throw new AppError('no attendence found for this user Profile', StatusCodes.BAD_REQUEST);
        }
        //  console.log(userProfile);
        return userProfile;
    } catch (error) {
        // console.log(error);
        if(error instanceof AppError) throw error;
        throw new AppError('Something went wrong cannot fetch the user attendance', StatusCodes.INTERNAL_SERVER_ERROR);    
    }
}

async function updateUserProfile(id, data) {
    try {
        const userProfile = await userProfileRepository.updateUserProfile(id, data);
        return userProfile;
    } catch (error) {
        // console.log(error);
        throw new AppError('Something went wrong cannot update the user Profle', StatusCodes.INTERNAL_SERVER_ERROR);   
    }
}

async function updateUserProfilePlans(id, data) {
    try {
        const userProfile = await userProfileRepository.getUserProfileInfo(id);
        if(!userProfile) {
            throw new AppError('cannot find the userProfile for this user', StatusCodes.BAD_REQUEST);
        }
        const days = userProfile.plan.validity;
        const userProfilePlan = await userProfileRepository.updateUserProfile(userProfile._id, {
            status : data.status,
            planStartDate : currentDate(),
            planExpiryDate : dateAfterAddingDays(days+1),
        });
        return userProfilePlan;
    } catch (error) {
        if(error instanceof AppError) throw error;
        throw new AppError('Something went wrong cannot update the user plans', StatusCodes.INTERNAL_SERVER_ERROR); 
    }
}

async function updateUserPlan(userId, data) {
    try {
        const userProfile = await userProfileRepository.getUserProfileInfo(userId);
        if(!userProfile) {
            throw AppError('cannot find the userProfile for this user', StatusCodes.BAD_REQUEST);
        }
        const userProfilePlan = await userProfileRepository.updateUserProfile(userProfile._id, {
            plan: data.planId,
            planStartDate : '',
            planExpiryDate : '',
        });
        return userProfilePlan;
    } catch (error) {
        if(error instanceof AppError) throw error;
        throw new AppError('Something went wrong cannot update the user plans', StatusCodes.INTERNAL_SERVER_ERROR); 
    }
}
async function deleteUserProfile(id) {
    try {
        const userProfile = await userProfileRepository.destroy(id);
        return userProfile;
    } catch (error) {
        // console.log(error);
        throw new AppError('Something went wrong cannot delete the user profile', StatusCodes.INTERNAL_SERVER_ERROR);   
    }
}
async function getUserProfileByUserId(id) {
    try {
        const userProfile = await userProfileRepository.getUserProfileByUserId(id);
        if(!userProfile) {
            throw AppError('cannot find the userProfile for this user', StatusCodes.BAD_REQUEST);
        }
        return userProfile;
    } catch (error) {
        // console.log(error);
        if(error instanceof AppError) throw error;
        throw new AppError('Something went wrong cannot fetch the user Profile', StatusCodes.INTERNAL_SERVER_ERROR);   
    }
}
async function getUserStatusByGymId(id ,data) {
    try {
        // console.log(data);
        const userProfile = await userProfileRepository.getUserByStatus(id, data);
        // console.log(userProfile);
        if(userProfile.length === 0) {
            // console.log('inside if');
            throw new AppError('No such members found ', StatusCodes.NOT_FOUND);
        }
        return userProfile;
    } catch (error) {
        if(error instanceof AppError) throw error;
        throw new AppError('Something went wrong cannot fetch the user status', StatusCodes.INTERNAL_SERVER_ERROR); 
    }
}
async function getPlanMemberCount(gymId, planId) {
    try {
        const userProfile = await userProfileRepository.getPlanMemberCount(gymId, planId);
        const result = {
            count : userProfile,
        }
        return result;
        
    } catch (error) {
        throw new AppError('Something went wrong cannot fetch the plan member count', StatusCodes.INTERNAL_SERVER_ERROR);  
    }
}


module.exports = {
    createUserProfile,
    getUserProfiles,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
    getUserProfileByUserId,
    updateUserProfilePlans,
    updateUserPlan,
    getUserStatusByGymId,
    getUserAttendance,
    getPlanMemberCount,
}
