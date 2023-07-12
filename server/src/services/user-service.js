const { UserRepository, GymRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');
const { Auth } = require('../utils/common');

const { serverConfig, Mailer } = require('../config')

const userRepository = new UserRepository();
const gymRepository = new GymRepository();

async function createUser(data) {
  try {
    const user = await userRepository.create(data);
      // console.log('user : ', user);
    const gym = await gymRepository.findGym(data.gymId);
      // console.log('gym : ', gym);

      const response = await Mailer.sendMail({
          from: serverConfig.GMAIL_EMAIL,
          to: user.email,
          subject: 'Registration Complete',
          text:  `congrats ${user.name}, you are now successfully registered in the gym ${gym.gymName}`
      });
      // console.log(response);
  
    gym.members.push(user._id);
    console.log(gym.members);
    await gym.save();
    console.log('testing');
    return user;
  } catch (error) {
    // console.log(error);
    throw new AppError(
      'Cannot create a new User object',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getUser(id) {
  try {
    const user = await userRepository.get(id);
    return user;
  } catch (error) {
    // console.log(error);
    throw new AppError(
      'Cannot fetch data of the user',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function signin(data) {
  try {
    const user = await userRepository.getUserByEmail(data.email);
    //  console.log('in service, User details: ', user);
    if (!user) {
      throw new AppError(
        'No user found for the given email',
        StatusCodes.NOT_FOUND
      );
    }
    const passwordMatch = Auth.checkPassword(data.password, user.password);
    // console.log("password match : ", passwordMatch);
    if (!passwordMatch) {
      throw new AppError('Invalid password', StatusCodes.BAD_REQUEST);
    }
    const jwt = Auth.createToken({
      name: user.name,
      email: user.email,
      userId: user._id,
    });
    if(user.role != data.role) {
      throw new AppError('Please make sure you are logging in from right portal',StatusCodes.UNAUTHORIZED);
    }
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
    return user;
  } catch (error) {
    // console.log(error);
    throw new AppError(
      'Cannot fetch data of the user',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function deleteUser(id) {

  try {
    const user = await userRepository.destroy(id);
    const gym = await gymRepository.findGym(user.gymId);
    let membersArray = gym.members;
    membersArray.slice(membersArray.findIndex(),1);
    console.log(membersArray);
    gym.members = membersArray;
    console.log(gym.members);
    await gym.save();
  } catch (error) {
    throw new AppError(
      'Cannot delete user from the database',
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
};
