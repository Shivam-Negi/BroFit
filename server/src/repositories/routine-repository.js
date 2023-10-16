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

    async addWorkouts(id, data) {
        const workouts = data.workouts; // array of id's of workout
        const dayOfWeek = data.day;
        try {
            const result = await Routine.updateOne(
                { 
                    _id: id 
                },
                { 
                    $push: { 
                        [dayOfWeek]: workouts 
                    } 
                }
              );
              return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async removeWorkouts(id, data) {
        const workouts = data.workouts; // array of id's of workout
        const dayOfWeek = data.day;
        try {
            const result = await Routine.updateOne(
                { 
                    _id: id 
                },
                { 
                    $pull: { 
                        [dayOfWeek]: { $in: workouts } 
                    } 
                }
              );
              return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = RoutineRepository;