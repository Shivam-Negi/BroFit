const {StatusCodes} = require('http-status-codes');
const {RoutineRepository, UserRepository} = require('../repositories');
const AppError = require('../utils/errors/app-error');

const routineRepository = new RoutineRepository();
const userRepository = new UserRepository();

async function createRoutine(id, data) {
    try {
        const role = userRepository.getRole(id);
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



module.exports = {
    createRoutine,

};