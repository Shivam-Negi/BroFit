const { StatusCodes } = require('http-status-codes');
const {AttendenceRepository, UserRepository} = require('../repositories/');
const attendenceRepository = new AttendenceRepository();
const userRepository = new UserRepository();
const AppError = require('../utils/errors/app-error');


async function createAttendence(data) {
    try {
        const user = await userRepository.get(data.userId);
        // console.log(data);
        const attendence = await attendenceRepository.create(
            {
                gymId : user.gymId,
                checkIn : data.checkIn,
                checkOut : data.checkOut,
            }
        );
        // console.log(attendence);
        return attendence;
        
    } catch (error) {
        // console.log(error);
        throw new AppError('', StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}

// async function dailyAttendence(data) {

//     try {
//         const attendenceModel = await attendenceRepository.dailyAttendence(data.id);
//         attendenceModel.attendence.push(data.attendenceInfo);
//         await attendenceModel.save();
//         return attendenceModel;
//     } catch (error) {
//         throw new AppError('', StatusCodes.INTERNAL_SERVER_ERROR);
//     }
// }

async function getAllAttendence() {
    try {
        const attendence = await attendenceRepository.getAll();
        return attendence;
    } catch (error) {
        // console.log(error);
        throw new AppError('', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAttendence(id) {
    try {
        const attendence = await attendenceRepository.getAttendenceByGymId(id);
        return attendence;
        
    } catch (error) {
        console.log(error);
        throw new AppError('', StatusCodes.INTERNAL_SERVER_ERROR);   
    }
}

async function updateAttendence(id, data) {
    try {
        const attendence = await attendenceRepository.update(id, data);
        return attendence;
        
    } catch (error) {
        // console.log(error);
        throw new AppError('', StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}
async function deleteAttendence(id){
    try {
        const attendence = await attendenceRepository.destroy(id);
        // const 
        return attendence;

    } catch (error) {
        // console.log(error);
        throw new AppError('', StatusCodes.INTERNAL_SERVER_ERROR);   
    }
}

module.exports = {
    getAllAttendence,
    getAttendence,
    createAttendence,
    updateAttendence,
    deleteAttendence,
    // dailyAttendence,
}


