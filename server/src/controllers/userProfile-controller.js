const { StatusCodes } = require('http-status-codes');
const { UserProfileService } = require('../services');
const { successResponse, errorResponse } = require('../utils/common');


async function createUserProfile(req, res) {
    try {
        //  console.log('req content: ', req.user);
        const userProfile = await UserProfileService.createUserProfile({
            userId : req.user,
            height : req.body.height,
            weight : req.body.weight,
            plan : req.body.plan,
            age : req.body.age,
            gender : req.body.gender,
            address : req.body.address,
            phoneNumber : req.body.phoneNumber
        });
        successResponse.data = userProfile;
        return res.status(StatusCodes.CREATED).json(successResponse);
        
    } catch (error) {
        errorResponse.error = error;
        return res.status(error.statusCode).json(errorResponse);
    }
}

async function getUserProfiles(req, res) {
    try {
        const userProfiles = await UserProfileService.getUserProfiles();
        successResponse.data = userProfiles;
        return res.status(StatusCodes.OK).json(successResponse);
        
    } catch (error) {
        errorResponse.error = error;
        return res.status(error.statusCode).json(errorResponse);
    }
}
async function getUserProfile(req, res) {
    try {
        const userProfile = await UserProfileService.getUserProfile(req.params.id);
        //  console.log(userProfile);
        successResponse.data = userProfile;
        return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
         console.log(error);
        errorResponse.error = error;
        return res.status(error.statusCode).json(errorResponse);
        
    }
}

async function getUserAttendance(req, res) {
    try {
        const userProfile = await UserProfileService.getUserAttendance(req.params.id);
        //  console.log(userProfile);
        successResponse.data = userProfile;
        return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
        //  console.log(error);
        errorResponse.error = error;
        return res.status(error.statusCode).json(errorResponse);
        
    }
}

async function updateUserProfile(req, res) {
    try {
        const userProfile = await UserProfileService.updateUserProfile(req.params.id, req.body);
        successResponse.data = userProfile;
        return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
        errorResponse.error = error;
        return res.status(error.statusCode).json(errorResponse);
        
    }
}
// this is for owners
async function updateUserProfilePlans(req, res) {
    try {
        const userProfile = await UserProfileService.updateUserProfilePlans(req.params.id, req.body);
        // console.log(userProfile);
        successResponse.data = userProfile;
        return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
        errorResponse.error = error;
        return res.status(error.statusCode).json(errorResponse);
        
    }
}
// this is for users
async function updateUserPlan(req, res) {
    try {
        const userProfile = await UserProfileService.updateUserPlan(req.params.id, req.body);
        // console.log(userProfile);
        successResponse.data = userProfile;
        return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
        errorResponse.error = error;
        return res.status(error.statusCode).json(errorResponse);
        
    }
}

async function deleteUserProfile(req, res) {
    try {
        const userProfile = await UserProfileService.deleteUserProfile(req.params.id);
        successResponse.data = userProfile;
        return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
        errorResponse.error = error;
        return res.status(error.statusCode).json(errorResponse);
        
    }
}

async function getUserByStatus(req, res) {
    try {
        // console.log(req.params);
        const userProfiles = await UserProfileService.getUserStatusByGymId(req.params.id, req.params.status);
        // console.log(userProfiles);
        successResponse.data = userProfiles;
        // console.log(successResponse);
        return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
        // console.log(error);
        errorResponse.error = error;
        return res.status(error.statusCode).json(errorResponse);
    }
}

module.exports = {
    createUserProfile,
    getUserProfiles,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
    updateUserProfilePlans,
    updateUserPlan,
    getUserByStatus,
    getUserAttendance
}