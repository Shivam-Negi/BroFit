const CrudRepository = require("./crud-repository");
const Attendance = require("../models/attendance");
const { currentDate } = require("../utils/helpers/datetime-helpers");

class AttendanceRepository extends CrudRepository {
  constructor() {
    super(Attendance);
  }

  async getAttendanceByGymId(id) {
    const attendance = Attendance.find({
      gymId: id,
      day: currentDate(),
    }).select('checkIn checkOut status -_id');
    return attendance;
  }
  async getStatusInUsers(status) {
    const currentMembers = Attendance.find({
      status: status
    });
    //console.log(currentMembers);
    return currentMembers;
  }

  async deleteAllAttendanceOfTheUserId(attendanceId) {
    const attendance = await Attendance.deleteMany({
      _id : attendanceId
    });
    return attendance;
  }

  async getdailyAttendenceByGymId(id, data) {
    console.log('id : ', id);
    console.log('data : ',data);
    try {
      const attendance = await Attendance.find({
        gymId : id,
        day : data
      }).populate({
          path: "userId",
          select: "name"});
      // console.log(attendance);
      
      return attendance;
      
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = AttendanceRepository;
