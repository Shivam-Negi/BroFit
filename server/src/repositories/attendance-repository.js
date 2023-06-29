const CrudRepository = require("./crud-repository");
const Attendance = require("../models/attendance");

class AttendanceRepository extends CrudRepository {
  constructor() {
    super(Attendance);
  }

  async getAttendanceByGymId(id) {
    const attendance = Attendance.find({
      gymId: id,
    });
    return attendance;
  }
}

module.exports = AttendanceRepository;
