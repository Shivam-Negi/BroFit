const {UserRepository} = require('../repositories');
const AppError = require('../utils/errors/app-error');
const {StatusCodes} = require('http-status-codes')
const { Auth } = require('../utils/common');

const userRepository = new UserRepository();

async function createUser(data) {
    try {
        const user = await userRepository.create(data);
        return user;      
    } catch (error) {
        // console.log(error);
        throw new AppError('Cannot create a new User object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getUser(id) {
    try {
        const user = await userRepository.get(id);
        return user;
    } catch (error) {
        // console.log(error);
        throw new AppError('Cannot fetch data of the user', StatusCodes.INTERNAL_SERVER_ERROR);    
    }
}

async function signin(data) {
    try {
        const user = await userRepository.getUserByEmail(data.email);
        // console.log('in service, User details: ', user);
        if(!user) {
            throw new AppError('No user found for the given email', StatusCodes.NOT_FOUND);
        }
        const passwordMatch = Auth.checkPassword(data.password, user.password);
        // console.log("password match : ", passwordMatch);
        if(!passwordMatch) {
            throw new AppError('Invalid password', StatusCodes.BAD_REQUEST);
        }
        const jwt = Auth.createToken({name: user.name, email: user.email});
        return jwt;
    } catch (error) {
        if(error instanceof AppError)   throw error;
        // console.log(error);
        throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function isAuthenticated(token) {
    try {
        if(!token) {
            throw new AppError('Missing JWT token', StatusCodes.BAD_REQUEST);
        }
        const response = Auth.verifyToken(token);
        //console.log("response : ", response);
        const user = await userRepository.get(response.id);
        if(!user) {
            throw new AppError('No user found', StatusCodes.NOT_FOUND);
        }
        return user.id;
    } catch (error) {
        if(error instanceof AppError)   throw error;
        if(error.name == 'JsonWebTokenError') {
            throw new AppError('Invalid JWT token', StatusCodes.BAD_REQUEST);
        }
        if(error.name == 'TokenExpiredError') {
            throw new AppError('JWT token expired', StatusCodes.BAD_REQUEST);
        }
        console.log(error);
        throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    createUser,
    getUser,
    signin,
    isAuthenticated
}


