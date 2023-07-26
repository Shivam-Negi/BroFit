const { UserRepository, GymRepository, UserProfileRepository, AttendanceRepository, CounterRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');
const { Auth } = require('../utils/common');

const { serverConfig, Mailer } = require('../config')

const userProfileRespository = new UserProfileRepository();
const userRepository = new UserRepository();
const gymRepository = new GymRepository();
const attendanceRespository = new AttendanceRepository();
const counterRepository = new CounterRepository();

async function createUser(data) {
  try {
    // console.log(data.gymId);
    const gym = await gymRepository.findGym(data.gymId);
    // console.log(gym);
    if(!gym) {
      throw new AppError('The gym with the given gymId doesnt exist',StatusCodes.BAD_REQUEST);
    }
    // console.log('gym : ', gym);
    // console.log('user : ', user);
    let counter = await counterRepository.counterIncreement(gym.gymId);
    // console.log(counter);
    if(!counter) {
      const newCounter = await counterRepository.create(
      {
        gymId: gym.gymId,
        seq: 1,
      });
      counter = newCounter;
      // console.log(counter);
    }
    // console.log(counter);
    const user = await userRepository.create({
      email : data.email,
      password : data.password,
      name : data.name,
      gymId : data.gymId,
      role : data.role,
      registerationNumber : counter.seq,
    });
    if(data.role != 'owner') {
      gym.members.push(user);
      await gym.save();
    }
    //console.log(gym.members);
    const jwt = Auth.createToken({
      userId: user._id,
      role: user.role,
      gymId: user.gymId
    });
    return {jwt, user};
  } catch (error) {
    // console.log(error);
    if(error instanceof AppError) throw error;
    throw new AppError(
      'Cannot create a new User object',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getUser(id) {
  try {
    const user = await userRepository.get(id);
    if(!user) {
      throw new AppError('No User exists for the given UserId',StatusCodes.BAD_REQUEST);
    }
    return user;
   
  } catch (error) {
    // console.log(error);
    if( error instanceof AppError) throw error;
    throw new AppError(
      'Cannot fetch data of the user',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function signin(data) {
  try {
    const user = await userRepository.getUserByEmail(data.email);
      // console.log('in service, User details: ', user);
    if (!user) {
      throw new AppError(
        'No user found for the given email',
        StatusCodes.NOT_FOUND
      );
    }
    const passwordMatch = Auth.checkPassword(data.password, user.password);
    //  console.log("password match : ", passwordMatch);
    if (!passwordMatch) {
      throw new AppError('Invalid password', StatusCodes.BAD_REQUEST);
    }
    const jwt = Auth.createToken({
      name: user.name,
      email: user.email,
      userId: user._id,
      role: user.role,
      gymId: user.gymId,
      registerationNumber: user.registerationNumber
    });
    // if(user.role != data.role) {
    //   throw new AppError('Please make sure you are logging in from right portal',StatusCodes.UNAUTHORIZED);
    // }
    return jwt;
  } catch (error) {
    if (error instanceof AppError) throw error;
    // console.log(error);
    throw new AppError(
      'Something went wrong',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function isAuthenticated(token) {
  try {
    if (!token) {
      throw new AppError('Missing JWT token', StatusCodes.BAD_REQUEST);
    }
    const response = Auth.verifyToken(token);
        // console.log("response after token verification : ", response);
    const user = await userRepository.get(response.userId);
      //  console.log('user details : ', user);
    if (!user) {
      throw new AppError('No user found', StatusCodes.NOT_FOUND);
    }
    return user._id;
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      throw new AppError('Invalid JWT token', StatusCodes.BAD_REQUEST);
    }
    if (error.name === 'TokenExpiredError') {
      throw new AppError('JWT token expired', StatusCodes.BAD_REQUEST);
    }
    if(error instanceof AppError) throw error;
    throw new AppError(
      'Something went wrong',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function isAuthenticatedReset(id, token) {
  try {
    if (!token) {
      throw new AppError('Missing JWT token', StatusCodes.BAD_REQUEST);
    }
    const user = await userRepository.get(id);
    if(!user) {
      throw new AppError('No user found', StatusCodes.NOT_FOUND);
    }
    const response = Auth.verifyTokenReset(token, user.password);
    // console.log("response after token verification : ", response);
    return response.userId;
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      throw new AppError('Invalid JWT token', StatusCodes.BAD_REQUEST);
    }
    if (error.name === 'TokenExpiredError') {
      throw new AppError('JWT token expired', StatusCodes.BAD_REQUEST);
    }
    if(error instanceof AppError) throw error;
    throw new AppError(
      'Something went wrong',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getUserByUserId(id) {
  try {
    // console.log(id);
    const user = await userRepository.getUserByUserId(id);
    // console.log(user);
    if(!user) {
      throw new AppError('no user exist for this userId',StatusCodes.BAD_REQUEST);
    }
    return user;
  } catch (error) {
    // console.log(error);
    if(error instanceof AppError) throw error;
    throw new AppError(
      'Cannot fetch data of the user',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getUserInfo(data) {
  try {
    const user = await userRepository.getUserByRegAndGym(data);
    if(!user) {
      throw new AppError('no user exists for these values', StatusCodes.BAD_REQUEST);
    }
    // console.log(user);
    return user;
  } catch (error) {
    // console.log(error);
    if(error instanceof AppError) throw error;
    throw new AppError(
      'Cannot fetch data of the user',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function deleteUser(id) {
  try {
    const user = await userRepository.destroy(id);
    // console.log(user);
    if(!user) {
      throw new AppError('no user exist for the given userId',StatusCodes.BAD_REQUEST);
    }
    const gym = await gymRepository.deleteMembersFromGym(user.gymId, user._id);
    // console.log(gym);
    if(!gym.acknowledged) {
      throw new AppError('no such user exist in the gym members array',StatusCodes.BAD_GATEWAY);
    }
    const userProfile = await userProfileRespository.deleteUserProfileByUserId(user._id);
    // console.log(userProfile);
    if(!userProfile && user.role == 'user') {
      throw new AppError('no userProfile exist for this user',StatusCodes.BAD_REQUEST);
    }
    if(user.role === 'user') {
      const attendance = await  attendanceRespository.deleteAllAttendanceOfTheUserId(userProfile.attendance);
    }
    return user;
  } catch (error) {
    if( error instanceof AppError) throw error;
    throw new AppError(
      'Cannot delete user from the database',
      StatusCodes.INTERNAL_SERVER_ERROR
    );   
  }
}

async function addRoleToUser(id, data) {
  try {
    const response = await userRepository.update(id, data);
    if(!response.acknowledged) {
      throw new AppError('failed to change the role of the user please check details and try again later', StatusCodes.BAD_REQUEST);
    }
    return response;
  } catch (error) {
    throw new AppError(
      'Cannot fetch data of the user',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }   
}

module.exports = {
  createUser,
  getUser,
  signin,
  isAuthenticated,
  getUserByUserId,
  deleteUser,
  getUserInfo,
  addRoleToUser,
  isAuthenticatedReset,
};
