const CrudRepository = require('./crud-repository');
const Attendence = require('../models/attendence');

class AttendenceRepository extends CrudRepository {
    constructor(){
        super(Attendence);
    }

    async getAttendenceByGymId(id){
        const attendence = Attendence.find({
            gymId : id
        });
        return attendence;
    }
}

module.exports = AttendenceRepository;
