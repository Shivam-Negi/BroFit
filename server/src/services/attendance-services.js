const { StatusCodes } = require("http-status-codes");
const { AttendanceRepository, UserRepository, UserProfileRepository } = require("../repositories");
const attendanceRepository = new AttendanceRepository();
const userRepository = new UserRepository();
const userProfileRepository = new UserProfileRepository();
const AppError = require("../utils/errors/app-error");
const { checkInTime } = require("../utils/helpers/datetime-helpers");

async function createAttendance(data) {
  try {
    // console.log(data);
    const user = await userRepository.get(data.userId);
    // console.log(data);
    const attendance = await attendanceRepository.create({
      gymId: user.gymId,
    });
    // console.log(attendance);
    // console.log(data.userId);
    const userProfile = await userProfileRepository.getUserProfileByUserId(data.userId);
    // console.log(userProfile);
    userProfile.attendance.push(attendance._id);
    await userProfile.save();
    // console.log(attendance);
    return attendance;
  } catch (error) {
    // console.log(error);
    throw new AppError("", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

// async function dailyAttendance(data) {

//     try {
//         const attendanceModel = await attendanceRepository.dailyAttendance(data.id);
//         attendanceModel.attendance.push(data.attendanceInfo);
//         await attendanceModel.save();
//         return attendanceModel;
//     } catch (error) {
//         throw new AppError('', StatusCodes.INTERNAL_SERVER_ERROR);
//     }
// }

async function getAllAttendance() {
  try {
    const attendance = await attendanceRepository.getAll();
    return attendance;
  } catch (error) {
    // console.log(error);
    throw new AppError("", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getAttendance(id) {
  try {
    const attendance = await attendanceRepository.getAttendanceByGymId(id);
    return attendance;
  } catch (error) {
    // console.log(error);
    throw new AppError("", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function updateAttendance(id) {
  try {
    const userProfile = await userProfileRepository.getUserProfileByUserId(id);
    let attendanceArray = userProfile.attendance;
    const attendanceId = attendanceArray[attendanceArray.length-1];
    const data = {
      checkOut : checkInTime(),
      status : 'OUT'
    }
    const attendance = await attendanceRepository.update(attendanceId, data);
    return attendance;
  } catch (error) {
    // console.log(error);
    throw new AppError("", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
async function deleteAttendance(id) {
  try {
    const attendance = await attendanceRepository.destroy(id);
    // const
    return attendance;
  } catch (error) {
    // console.log(error);
    throw new AppError("", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
  getAllAttendance,
  getAttendance,
  createAttendance,
  updateAttendance,
  deleteAttendance,
  // dailyAttendance,
};
