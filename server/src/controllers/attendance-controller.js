const { StatusCodes } = require("http-status-codes");
const { AttendanceService } = require("../services");
const { successResponse, errorResponse } = require("../utils/common");

async function createAttendance(req, res) {
  try {
    // console.log(req.user);
    const attendance = await AttendanceService.createAttendance({
      userId: req.user,
      checkIn: req.body.checkIn,
      checkOut: req.body.checkOut,
    });
    successResponse.data = attendance;
    return res.status(StatusCodes.CREATED).json(successResponse);
  } catch (error) {
    // console.log(error);
    errorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

async function getAllAttendance(req, res) {
  try {
    const attendance = await AttendanceService.getAllAttendance();
    successResponse.data = attendance;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

async function getAttendance(req, res) {
  try {
    const attendance = await AttendanceService.getAttendance(req.params.id);
    successResponse.data = attendance;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}
async function updateAttendance(req, res) {
  try {
    const attendance = await AttendanceService.updateAttendance(
      req.params.id,
      req.body
    );
    successResponse.data = attendance;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}
async function deleteAttendance(req, res) {
  try {
    const attendance = await AttendanceService.deleteAttendance(req.params.id);
    successResponse.data = attendance;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

module.exports = {
  createAttendance,
  getAllAttendance,
  getAttendance,
  updateAttendance,
  deleteAttendance,
  // dailyAttendance,
};
