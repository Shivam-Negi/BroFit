const { StatusCodes } = require("http-status-codes");

const { errorResponse } = require("../utils/common");
const { UserService } = require("../services");
const AppError = require("../utils/errors/app-error");

function validateAuthRequest(req, res, next) {
  // console.log(req.body);
  if (!req.body.email) {
    errorResponse.message = "Something went wrong while authenticating user";
    errorResponse.error = new AppError(
      ["Email not found in the incoming request in the correct form"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  if (!req.body.password) {
    errorResponse.message = "Something went wrong while authenticating user";
    errorResponse.error = new AppError(
      ["password not found in the incoming request in the correct form"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  next();
}

async function checkAuth(req, res, next) {
  try {
    const response = await UserService.isAuthenticated(
      req.headers["x-access-token"]
    );
    console.log('response of check auth',response);
    if (response) {
      req.user = response; // setting the user id in the req object
      next();
    }
  } catch (error) {
    return res.status(error.statusCode).json(error);
  }
}

async function isAdmin(req, res, next) {
  const response = await UserService.isAdmin(req.user); // line 29 provides userId
  if (!response) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "User not authorized for this action" });
  }
  next();
}

module.exports = {
  validateAuthRequest,
  checkAuth,
  isAdmin,
};
