const { StatusCodes } = require('http-status-codes');
const { UserRepository } = require('../repositories');
const userRepository = new UserRepository();
const AppError = require('../utils/errors/app-error');
const { Auth } = require('../utils/common');
const { serverConfig, Mailer } = require('../config');
const bcrypt = require('bcrypt');
const { generateRandom4DigitNumber } = require('../utils/helpers/otp');

async function getUser(data) {
    try {
        const user = await userRepository.getUserByEmail(data.email);
        //  console.log('in service, User details: ', user);
        if (!user) {
            throw new AppError(
                'No user found for the given email',
                StatusCodes.NOT_FOUND
            );
        } 
        const userId = user._id;
        /* const jwt = Auth.createTokenReset({
            email: user.email,
            userId: user._id,
          }, user.password); */
        
        // const link = `${serverConfig.RESET}/${user._id}/${jwt}`;
        
        const otp = generateRandom4DigitNumber();
        const response = await Mailer.sendMail({
            from: serverConfig.GMAIL_EMAIL,
            to: user.email,
            subject: 'change password otp',
            text: `Please type this otp in the app to change your password : ${otp}`
        });
        // console.log(response);
        // console.log('link : ', link);
        return {otp, userId};
    } catch (error) {
        // errorResponse.error = error;
        // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
        if(error instanceof AppError) throw error;
        throw new AppError('Something went wrong while geting the user', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function changePwd(userId, data) {
  try {
    const user = await userRepository.get(userId);
    if(!user) {
      throw new AppError('no user found for this userId', StatusCodes.NOT_FOUND);
    }
    user.password = data.password;

    // Re-encrypt the updated password
    const salt = bcrypt.genSaltSync(8);
    const encryptPassword = bcrypt.hashSync(user.password, salt);
    user.password = encryptPassword;
    const response = await userRepository.update(userId, user);
    // console.log('response after update pwd : ', response);
    return response;
  } catch (error) {
    // errorResponse.error = error;
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    if(error instanceof AppError) throw error;
    throw new AppError('Something went wrong while changing the password', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}


module.exports = {
    getUser,
    changePwd
}