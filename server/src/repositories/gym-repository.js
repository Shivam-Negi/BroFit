const CrudRepository = require('./crud-repository');
const Gym = require('../models/gym');


class GymRepository extends CrudRepository {

    constructor() {
        super(Gym);
    }

    async findGym(id) {
        const gym = await Gym.findOne({
            gymId : id
        });
        return gym;
    }
    async findOwner(id) {
        const gym = await Gym.findOne({
            gymId : id
        }).select('email -_id');
        return gym;
    }

    async getGymInfo(id) {
        const gym = await Gym.findOne({
            gymId : id
        }).select('gymName owner email gymId plans -_id phoneNumber')
        .populate('plans');
        return gym;
    }

    async getGymMems(data) {
        // console.log(typeof(data.limit));
        // console.log(typeof(data.page));
        const gym = await Gym.findOne({
            gymId : data.gymId
        }).select('members -_id')
        .populate({
            path: "members",
            select: "name registerationNumber"
        })
        // .skip((data.page - 1) * data.limit)
        // .limit(5)
        // .exec();
        return gym;
    }

    async getGymGraph(id) {
        const gym = await Gym.findOne({
            gymId : id
        });
        return gym.liveGraph;
    }

    async updateByGymId(id, data) {
        /* console.log('id : ', id);
        console.log('data : ', data); */
        try {
            const result = await Gym.findOneAndUpdate({
                gymId : id
            }, data,
            {new: true});
            // console.log(result);
            return result;
        } catch(error) {
            // console.log('error in updation of graph : ', error);
            console.log("Something went wrong in crud repo");
            throw error;
        }
    }

    async deleteMembersFromGym(id,userId) {

        try {
            const gym = await Gym.updateOne({
                gymId : id
            },
            {
                $pull : {members : userId }
            });
            return gym;
        } catch (error) {
            console.log("Something went wrong in crud repo");
            throw error;
        }

    }

    async deletePlansFromeGymByGymId(id, plansId) {

        try {
            const gym = await Gym.updateOne({
                gymId : id
            },
            {
                $pull : {plans : plansId}
            });
            return gym;
        } catch (error) {
            console.log("Something went wrong in crud repo");
            throw error; 
        }
    }
    async getGymLongitudeAndLatitude(id) {
        try {
            const gymLocation = await Gym.findOne({
                gymId : id,
            }).select('longitude latitude');
            return gymLocation;
        } catch (error) {
            console.log('something went wrong in the crud repo');
            throw error;  
        }
    }

}

module.exports = GymRepository;