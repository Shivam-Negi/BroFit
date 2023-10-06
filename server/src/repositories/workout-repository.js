const CrudRepository = require('./crud-repository');
const Workout = require('../models/workout');

class WorkoutRepository extends CrudRepository {
    constructor() {
        super(Workout);
    }

    async getWorkouts(tags) {
        try {
            const workouts = await Workout.find({ 
                tags: {
                     $all: tags 
                } 
            });
            return workouts;
        } catch (error) {
            throw error;
        }
    }
    async getWorkout(params) {
        try {
            const workout = await Workout.findOne({
                name : params
            });
            return workout;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = WorkoutRepository;