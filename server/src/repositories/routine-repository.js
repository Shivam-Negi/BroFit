const CrudRepository = require('./crud-repository');
const Routine = require('../models/routine');
const { default: mongoose } = require('mongoose');


class RoutineRepository extends CrudRepository {
    
    constructor() {
        super(Routine);
    }
    async getRoutinesNameByUserId(id, visibility) {
        try {
            const routineName = await Routine.aggregate([
                {
                    $match : {
                        created : new mongoose.Types.ObjectId(id),
                        visibility : visibility,
                    }
                },
                {
                    $project : {
                        title : 1,
                        monday : {$size : '$monday'},
                        tuesday : {$size : '$tuesday'},
                        wednesday : {$size : '$wednesday'},
                        thursday : {$size : '$thursday'},
                        friday : {$size : '$friday'},
                        saturday : {$size : '$saturday'},
                        sunday : {$size : '$sunday'},

                    },
                },
            ]);
            // console.log(routineName);
            return routineName;
        } catch (error) {
            console.log(error);
            throw error;
        }    
    }
    async getRoutinesNameByGymId(id, visibility) {
        try {
            const routineName = await Routine.aggregate([ // it first search using the filter then create a object with the specified data
                {
                    $match : {
                        gymId : id,
                        visibility : visibility,
                    }
                },
                {
                    $project : {
                        title : 1,
                        level : 1,
                        monday : {$size : '$monday'},
                        tuesday : {$size : '$tuesday'},
                        wednesday : {$size : '$wednesday'},
                        thursday : {$size : '$thursday'},
                        friday : {$size : '$friday'},
                        saturday : {$size : '$saturday'},
                        sunday : {$size : '$sunday'},

                    },
                },
            ]);
            // console.log(routineName);
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