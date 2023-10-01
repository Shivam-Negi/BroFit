const {StatusCodes} = require('http-status-codes');
const {RoutineRepository, UserRepository} = require('../repositories');
const AppError = require('../utils/errors/app-error');

const routineRepository = new RoutineRepository();
const userRepository = new UserRepository();

async function createRoutine(id, data) {
    try {
        const role = await userRepository.getRole(id);
        data.gymId = role.gymId;
        if(role.role == 'user') {
            data.created = id;
            data.visibility = 'specific';
        }
        const routine = await routineRepository.create(data);
        return routine;  
    } catch (error) {
       throw new AppError('Something went wrong while creating routine', StatusCodes.INTERNAL_SERVER_ERROR); 
    } 
}

async function getRoutinesNames(params) {
    try {
        const {visibility, id} = params;
        if(visibility == "specific") {
            const routine = await routineRepository.getRoutinesNameByUserId(id, visibility);
            return routine;
        }
        const routine = await routineRepository.getRoutinesNameByGymId(id, visibility);
        return routine;
    } catch (error) {
        throw new AppError('Something went wrong while getting routine', StatusCodes.INTERNAL_SERVER_ERROR); 
    }
}

async function getRoutineDayContent(routineId, day) {
    try {
        const routine = await routineRepository.getRoutineDayContent(routineId, day);
        return routine;
    } catch (error) {
        throw new AppError('Something went wrong while getting routine', StatusCodes.INTERNAL_SERVER_ERROR);
    }

}

async function pushWorkout(id, data) {
    try {
        const routine = await routineRepository.addWorkouts(id, data);
        return routine;        
    } catch (error) {
        // console.log(error);
        throw new AppError('Something went wrong while updating the routine', StatusCodes.INTERNAL_SERVER_ERROR);      
    }
}

module.exports = {
    createRoutine,
    getRoutinesNames,
    getRoutineDayContent,
    pushWorkout,
};