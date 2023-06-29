const { StatusCodes } = require('http-status-codes');
const { UserProfileService } = require('../services');
const { successResponse, errorResponse } = require('../utils/common');


async function createUserProfile(req, res) {
    try {
        // console.log('req body content: ', req.body);
        const userProfile = await UserProfileService.createUserProfile({
            userId : req.user,
            height : req.body.height,
            weight : req.body.weight,
        });
        successResponse.data = userProfile;
        return res.status(StatusCodes.CREATED).json(successResponse);
        
    } catch (error) {
        errorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
}

async function getUserProfiles(req, res) {
    try {
        const userProfiles = await UserProfileService.getUserProfiles();
        successResponse.data = userProfiles;
        return res.status(StatusCodes.OK).json(successResponse);
        
    } catch (error) {
        errorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
}
async function getUserProfile(req, res) {
    try {
        const userProfile = await UserProfileService.getUserProfile(req.params.id);
        // console.log(userProfile);
        successResponse.data = userProfile;
        return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
        // console.log(error);
        errorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
        
    }
}

async function updateUserProfile(req, res) {
    try {
        const userProfile = await UserProfileService.updateUserProfile(req.params.id, req.body);
        successResponse.data = userProfile;
        return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
        errorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
        
    }
}

async function deleteUserProfile(req, res) {
    try {
        const userProfile = await UserProfileService.deleteUserProfile(req.params.id);
        successResponse.data = userProfile;
        return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
        errorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
        
    }
}

module.exports = {
    createUserProfile,
    getUserProfiles,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
}