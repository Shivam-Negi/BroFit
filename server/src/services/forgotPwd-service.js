const { StatusCodes } = require('http-status-codes');
const { UserRepository } = require('../repositories');
const userRepository = new UserRepository();
const AppError = require('../utils/errors/app-error');
const { Auth } = require('../utils/common');
const { serverConfig, Mailer } = require('../config');
const bcrypt = require('bcrypt');

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
        const jwt = Auth.createTokenReset({
            email: user.email,
            userId: user._id,
          }, user.password);
        
        const link = `${serverConfig.RESET}/${user._id}/${jwt}`;
        const response = await Mailer.sendMail({
            from: serverConfig.GMAIL_EMAIL,
            to: user.email,
            subject: 'change password link',
            text:  link
        });
        // console.log(response);
        // console.log('link : ', link);
        return link;
    } catch (error) {
        errorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
}

async function changePwd(data, userId) {
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
    errorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}


module.exports = {
    getUser,
    changePwd
}