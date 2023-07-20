const { StatusCodes } = require("http-status-codes");
const { ForgotPwdService, UserService } = require("../services");
const { successResponse, errorResponse } = require("../utils/common");

async function getUser(req, res) {
    try {
        const userLink = await ForgotPwdService.getUser(req.body);
        successResponse.data = userLink;
        return res.status(StatusCodes.OK).json(successResponse);
        
    } catch (error) {
        errorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
}

async function changePwd(req, res) {
    try {
        const pswd = await ForgotPwdService.changePwd(req.body, req.user);
        successResponse.data = pswd;
        return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
        errorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
}

module.exports = {
    getUser,
    changePwd,
}