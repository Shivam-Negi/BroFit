const { StatusCodes } = require("http-status-codes");
const { AttendanceRepository, UserRepository, UserProfileRepository, GymRepository } = require("../repositories");
const attendanceRepository = new AttendanceRepository();
const userRepository = new UserRepository();
const userProfileRepository = new UserProfileRepository();
const gymRepository = new GymRepository();
const AppError = require("../utils/errors/app-error");
const { checkInTime, currentDate } = require("../utils/helpers/datetime-helpers");

async function createAttendance(data) {
  try {
    const user = await userRepository.get(data.userId);
    if(!user) {
      throw new AppError('no user exist for this userId', StatusCodes.BAD_REQUEST);
    }
    const attendance = await attendanceRepository.create({
      gymId: user.gymId,
      userId: data.userId,
    });
    const gym = await gymRepository.findGym(user.gymId);
    if(!gym) {
      throw new AppError('no gym exist for this gymId', StatusCodes.BAD_REQUEST);
    }
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
    if(!userProfile) {
      throw new AppError('no userProfile exists for this userId', StatusCodes.BAD_REQUEST);
    }
    userProfile.attendance.push(attendance);
    await userProfile.save();
    return attendance;
  } catch (error) {
    //  console.log(error);
    if(error instanceof AppError) return error;
    throw new AppError("could not create attendence for the user", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getAllAttendance() {
  try {
    const attendance = await attendanceRepository.getAll();
    return attendance;
  } catch (error) {
    // console.log(error);
    throw new AppError("Something went wrong while getting attendance", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getStatusInUsers(status) {
  try {
    const currentMembers = await attendanceRepository.getStatusInUsers(status);
    return currentMembers;
  } catch (error) {
    // console.log(error);
    throw new AppError("Something went wrong while fetching the attendence by status", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getAttendance(id) {
  try {
    const attendance = await attendanceRepository.getAttendanceByGymId(id);
    return attendance;
  } catch (error) {
    // console.log(error);
    throw new AppError("Something went wrong while fetching the attendace", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function updateAttendance(id, userId) {
  try {
    const userProfile = await userProfileRepository.getUserProfileByUserId(id);
    if(!userProfile) {
      throw new AppError('no userProfile found for the given userId',StatusCodes.BAD_REQUEST);
    }
    let attendanceArray = userProfile.attendance;
    if(attendanceArray.length === 0) {
      throw new AppError('please check in first', StatusCodes.BAD_REQUEST);
    }
    const attendanceId = attendanceArray[attendanceArray.length-1];
    const data = {
      checkOut : checkInTime(),
      status : 'OUT'
    }
    const chkAttd = await attendanceRepository.get(attendanceId);
    if(chkAttd.status == 'OUT') {
      if(chkAttd.day == currentDate()) {
        throw new AppError('Already checked out', StatusCodes.BAD_REQUEST);
      }
      throw new AppError('please check in first', StatusCodes.BAD_REQUEST);
    }
    const attendance = await attendanceRepository.update(attendanceId, data);
    const user = await userRepository.get(userId);
    if(!user) {
      throw new AppError('no user found for this userId', StatusCodes.BAD_REQUEST);
    }
    const gym = await gymRepository.findGym(user.gymId);
    if(!gym) {
      throw new AppError('no gym found for this gymId', StatusCodes.BAD_REQUEST);
    }
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
     if(error instanceof AppError) throw error;
    throw new AppError("Something went wrong while udpating the attendance", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function deleteAttendance(id) {
  try {
    const attendance = await attendanceRepository.destroy(id);
    if(!attendance) {
      throw new AppError('no attendence found for this id', StatusCodes.NOT_FOUND);
    }
    // const
    return attendance;
  } catch (error) {
    // console.log(error);
    if(error instanceof AppError) throw error;
    throw new AppError("Something went wrong while deleting attendance", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
async function getAttendanceByUserId(id) {
   try {
    const userProfile = await userProfileRepository.getUserProfileByUserId(id);
    // if(!userProfile) {
    //   throw new AppError('no such data is present', StatusCodes.NOT_FOUND);
    // }
    if(userProfile.attendance.length === 0){
      return false;
    }
    let attendanceArray = userProfile.attendance;
    const attendanceId = attendanceArray[attendanceArray.length-1];
    const attendance = await attendanceRepository.get(attendanceId);
    if(!attendance) {
      throw new AppError('no attendance found for this id', StatusCodes.NOT_FOUND);
    }
    // return attendance.day.split('-')[0];
    return attendance.day;
   } catch (error) {
    console.log(error);
    if( error instanceof AppError) throw error;
    throw new AppError("Something went wrong while fetching atttendace", StatusCodes.INTERNAL_SERVER_ERROR);
    
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
    throw new AppError("Something went wrong while fetching attendance for the gym", StatusCodes.INTERNAL_SERVER_ERROR);
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
