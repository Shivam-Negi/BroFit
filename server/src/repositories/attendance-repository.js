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
}

module.exports = AttendanceRepository;
