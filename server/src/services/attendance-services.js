const { StatusCodes } = require("http-status-codes");
const { AttendanceRepository, UserRepository, UserProfileRepository, GymRepository } = require("../repositories");
const attendanceRepository = new AttendanceRepository();
const userRepository = new UserRepository();
const userProfileRepository = new UserProfileRepository();
const gymRepository = new GymRepository();
const AppError = require("../utils/errors/app-error");
const { checkInTime } = require("../utils/helpers/datetime-helpers");

async function createAttendance(data) {
  try {
    const user = await userRepository.get(data.userId);
    const attendance = await attendanceRepository.create({
      gymId: user.gymId,
    });
    const gym = await gymRepository.findGym(user.gymId);
    let liveMem = gym.currentlyCheckedIn;
    liveMem = liveMem + 1;
    const currentTime = checkInTime();
    const hour = currentTime.split(':')[0];
    await gymRepository.updateByGymId(user.gymId, {
      $set: {
        currentlyCheckedIn : liveMem,
        [`liveGraph.${hour}`]: liveMem,
      }
    })
    const userProfile = await userProfileRepository.getUserProfileByUserId(data.userId);
    userProfile.attendance.push(attendance);
    await userProfile.save();
    return attendance;
  } catch (error) {
    // console.log(error);
    throw new AppError("", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getAllAttendance() {
  try {
    const attendance = await attendanceRepository.getAll();
    return attendance;
  } catch (error) {
    // console.log(error);
    throw new AppError("", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getStatusInUsers(status) {
  try {
    const currentMembers = await attendanceRepository.getStatusInUsers(status);
    return currentMembers;
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

async function updateAttendance(id, userId) {
  try {
    const userProfile = await userProfileRepository.getUserProfileByUserId(id);
    let attendanceArray = userProfile.attendance;
    const attendanceId = attendanceArray[attendanceArray.length-1];
    const data = {
      checkOut : checkInTime(),
      status : 'OUT'
    }
    const attendance = await attendanceRepository.update(attendanceId, data);
    const user = await userRepository.get(userId);
    const gym = await gymRepository.findGym(user.gymId);
    let liveMem = gym.currentlyCheckedIn;
    liveMem = liveMem - 1;
    const currentTime = checkInTime();
    const hour = currentTime.split(':')[0];
    await gymRepository.updateByGymId(user.gymId, {
      $set: {
        currentlyCheckedIn : liveMem,
        [`liveGraph.${hour}`]: liveMem,
      }
    })
    return attendance;
  } catch (error) {
     console.log(error);
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
async function getAttendanceByUserId(id) {
   try {
    const userProfile = await userProfileRepository.getUserProfileByUserId(id);
    if(userProfile.attendance.length === 0){
      return false;
    }
    let attendanceArray = userProfile.attendance;
    const attendanceId = attendanceArray[attendanceArray.length-1];
    const attendance = await attendanceRepository.get(attendanceId);
    return attendance.day.split('-')[0];
   } catch (error) {
    console.log(error);
    throw new AppError("", StatusCodes.INTERNAL_SERVER_ERROR);
    
   }
}

async function getDayWiseAttendenceOfCustomerByGymId(id, data) {
  try {
    const attendance = await attendanceRepository.getdailyAttendenceByGymId(id, data);
    // console.log(typeof(attendance));
    if (attendance.length === 0) {
      // console.log('inside if');
      throw new AppError('attendance not found for the specified day', StatusCodes.NOT_FOUND);
    }
    return attendance;
  } catch (error) {
    if( error instanceof AppError) throw error;
    throw new AppError("", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
  getAllAttendance,
  getAttendance,
  createAttendance,
  updateAttendance,
  deleteAttendance,
  getAttendanceByUserId,
  getStatusInUsers,
  getDayWiseAttendenceOfCustomerByGymId
};
