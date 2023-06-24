const { StatusCodes } = require('http-status-codes');
const { UserService } = require('../services');
const { successResponse, errorResponse } = require('../utils/common');


async function createUser(req, res) {
    try {
        const user = await UserService.createUser(req.body);
        successResponse.data = user;
        return res.status(StatusCodes.CREATED).json(successResponse);
        
    } catch (error) {
        errorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
}

async function getUsers(req, res) {
    try {
        const users = await UserService.getUsers();
        successResponse.data = users;
        return res.status(StatusCodes.OK).json(successResponse);
        
    } catch (error) {
        errorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
}
async function getUser(req, res) {
    try {
        const user = await UserService.getUser(req.params.id);
        successResponse.data = user;
        return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
        errorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
        
    }
}

async function updateUser(req, res) {
    try {
        const user = await UserService.updateUser(req.params.id, req.body);
        successResponse.data = user;
        return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
        errorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
        
    }
}

async function deleteUser(req, res) {
    try {
        const user = await UserService.deleteUser(req.params.id);
        successResponse.data = user;
        return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
        errorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
        
    }
}
module.exports = {
   createUser,
   getUsers,
   getUser,
   updateUser,
   deleteUser,
}