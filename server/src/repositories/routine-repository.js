const CrudRepository = require('./crud-repository');
const Routine = require('../models/routine');


class RoutineRepository extends CrudRepository {
    
    constructor() {
        super(Routine);
    }
    async getRoutinesNameByUserId(id, visibility) {
        try {
            const routineName = await Routine.find({
                created : id,
                visibility : visibility,
            }).select('title');
            return routineName;
        } catch (error) {
            throw error;
        }    
    }
    async getRoutinesNameByGymId(id, visibility) {
        try {
            const routineName = await Routine.find({
                gymId : id,
                visibility : visibility,
            }).select('title level');
            return routineName;
        } catch (error) {
            throw error;
        }
    }

    async getRoutineDayContent(id, day) {
        try {
            const routine = await Routine.findOne({
                _id : id,
            })
            .select(day)
            .populate({
                path : day,
            });
            return routine;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = RoutineRepository;