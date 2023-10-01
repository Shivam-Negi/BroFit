const CrudRepository = require('./crud-repository');
const Routine = require('../models/routine');


class RoutineRepository extends CrudRepository {
    
    constructor() {
        super(Routine);
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
                        [dayOfWeek]: { $each: workouts } 
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