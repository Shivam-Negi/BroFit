const { StatusCodes } = require('http-status-codes');

const { UserService } = require('../services');

const { successResponse, errorResponse } = require('../utils/common');


/**
 * POST : /user/:id 
 * req-body {}
 */
async function getUser(req, res) {
    try {
        const user = await UserService.getUser(req.params.id);
        successResponse.data = user;
        return res
                .status(StatusCodes.OK)
                .json(successResponse);
    } catch(error) {
        //console.log(error)
        errorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(errorResponse);
    }
}

async function getUserInfo(req, res) {
    try {
        const user = await UserService.getUserInfo({
            name: req.params.name,
            gymId:  req.params.gym
        });
        successResponse.data = user;
        return res
                .status(StatusCodes.OK)
                .json(successResponse);
    } catch(error) {
        //console.log(error)
        errorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(errorResponse);
    }
}


/**
 * POST : /signup
 * req-body {email: 'xyz@gmail.com', password: '1jkj1'}
 */

async function createUser(req, res) {    // signup
    try {
        // console.log('inside controller : ', req.body)
        const user = await UserService.createUser({
            email : req.body.email,
            password : req.body.password,
            name : req.body.name,
            gymId : req.body.gymId,
            // role : req.body.role,  
        });
        successResponse.data = user;
        return res
                .status(StatusCodes.CREATED)
                .json(successResponse);

    }
    catch(error) {
        console.log(error)
        errorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(errorResponse);
    }
}

async function signin(req, res) {
    try {
        // console.log(res.body);
        const user = await UserService.signin({
            email: req.body.email,
            password: req.body.password,
            role : req.role, 
        });
        // console.log(user);
        successResponse.data = user;
        return res
                .status(StatusCodes.CREATED)
                .json(successResponse);
    } catch (error) {
        // console.log(error)
        errorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(errorResponse);
    }
}
// async function signin(req, res) {
//       try {
//         console.log(res.body);
//         const user = await UserService.signin({
//           email: req.body.email,
//           password: req.body.password,
//           role: req.role,
//         });
//         // console.log(user);
//         successResponse.data = user;
//         return res.status(StatusCodes.CREATED).json(successResponse);
//       } catch (error) {
//         // console.log(error);
//         errorResponse.error = error;
//         return res.status(error.statusCode).json(errorResponse);
//       }
// }

async function addRoleToUser(req, res) {
    try {
        const user = await UserService.addRoleToUser(req.params.id, {
            role: 'owner',
        });
        successResponse.data = user;
        return res
                .status(StatusCodes.CREATED)
                .json(successResponse);
    } catch (error) {
        console.log(error)
        errorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(errorResponse);
    }
}

async function deleteUser(req, res) {
    try {
        const user = await UserService.deleteUser(req.params.id);
        successResponse.data = user;
        return res
                .status(StatusCodes.OK)
                .json(successResponse);
    } catch (error) {
        errorResponse.error = error;
        return res
                .status(errorResponse)
                .json(errorResponse);
        
    }
}

module.exports = {
    getUser,
    createUser,
    signin,
    addRoleToUser,
    deleteUser,
    getUserInfo,
    addRoleToUser
    // signinWithRole,
}