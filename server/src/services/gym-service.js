const { StatusCodes } = require('http-status-codes');
const { GymRepository, UserRepository, PlanRepository, UserProfileRepository, AttendanceRepository, CounterRepository} = require('../repositories');
const gymRepository = new GymRepository();
const userRepository = new UserRepository();
const planRepository = new PlanRepository();
const userProfileRespository = new UserProfileRepository();
const attendanceRespository = new AttendanceRepository();
const counterRepository = new CounterRepository();
const AppError = require('../utils/errors/app-error');

async function createGym(data) {
    try {
        // console.log(data);
        // const counter = await counterRepository.create({
        //     gymId : data.gymId,
        //     seq : data.registerationNumber - 1,
        // })
        const gym = await gymRepository.create({
            gymName : data.gymName,
            gymId : data.gymId,
            owner : data.owner,
            email : data.email,
            phoneNumber : data.phoneNumber,
            latitude : data.latitude,
            longitude : data.longitude, 
        });
        return gym;
        
    } catch (error) {
        // console.log(error);
        throw new AppError('Something went wrong while creating gym model', StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}

async function getGyms() {
    try {
        const gyms = await gymRepository.getAll();
        return gyms;
    } catch (error) {
        // console.log(error);
        throw new AppError('Something went wrong while fetching gyms', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getGym(id) {
    try {
        const gym = await gymRepository.getGymInfo(id);
        if(!gym) {
            throw new AppError('no gym for this gymId', StatusCodes.BAD_REQUEST);
        }
        return gym;
        
    } catch (error) {
        // console.log(error);
        if(error instanceof AppError) throw error;
        throw new AppError('Something went wrong while fetching the gym', StatusCodes.INTERNAL_SERVER_ERROR);   
    }
}

async function getGymGraph(id) {
    try {
        const gym = await gymRepository.getGymGraph(id);
        if(!gym) {
            throw new AppError('no graph exist for this gym', StatusCodes.BAD_REQUEST);
        }
        return gym;
        
    } catch (error) {
        // console.log(error);
        if(error instanceof AppError) throw error;
        throw new AppError('Something went wrong while fetch the gym graph', StatusCodes.INTERNAL_SERVER_ERROR);   
    }
}

async function getGymMems(id) {
    try {
        const gym = await gymRepository.getGymMems(id);
        if(!gym) {
            throw new AppError('no gym exist for this gymId',StatusCodes.BAD_REQUEST);
        }
        return gym;
        
    } catch (error) {
        // console.log(error);
        if(error instanceof AppError) throw error;
        throw new AppError('Something went wrong while fetching members from gym', StatusCodes.INTERNAL_SERVER_ERROR);   
    }
}

async function updateGym(id, data) {
    try {
        const gym = await gymRepository.updateByGymId(id, data);
        return gym;
        
    } catch (error) {
        // console.log(error);
        throw new AppError('Something went wrong while updating gym', StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}
async function deleteGym(id){
    try {
        const gym = await gymRepository.destroy(id);
        if(!gym) {
            throw new AppError('no gym found for this id', StatusCodes.BAD_REQUEST);
        }
        const counter = await counterRepository.counterDelete(gym.gymId);
        // console.log(gym);
        const gymMembers = gym.members;
        // console.log(gymMembers);
        const gymOwner = await userRepository.deleteOwner(gym.gymId);
        // console.log(gymOwner);
        const plans = await planRepository.deletePlans(gym.gymId);
        // console.log(plans);
        if(gymMembers.length >= 1) {
            gymMembers.map( async (element) => {
                // console.log(element);
                const user = await userRepository.destroy(element);
                if(!user) {
                    throw new AppError('no user exist for the given userId',StatusCodes.BAD_REQUEST);
                } 
                const userProfile = await userProfileRespository.deleteUserProfileByUserId(user._id);
                // console.log(userProfile);
                if(userProfile) {
                    if(userProfile.attendance.length > 0) {
                      // console.log('inside if');
                      const attendance = await  attendanceRespository.deleteAllAttendanceOfTheUserId(userProfile.attendance);
                    }  
                }
            });
        }
        return gym;

    } catch (error) {
        // console.log(error);
        if(error instanceof AppError) throw error;
        throw new AppError('Something went wrong while deleting gym', StatusCodes.INTERNAL_SERVER_ERROR);   
    }
}
async function getGymLocation(id) {
    try {
        const gymLocation  = await gymRepository.getGymLongitudeAndLatitude(id);
        if(!gymLocation) {
            throw new AppError('no gym found for the given gymId', StatusCodes.NOT_FOUND);
        }
        return gymLocation;
    } catch (error) {
        if(error instanceof AppError) throw error;
        throw new AppError('Something went wrong while fetching the location', StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}

module.exports = {
    createGym,
    getGyms,
    getGym,
    getGymGraph,
    updateGym,
    deleteGym,
    getGymMems,
    getGymLocation
}


