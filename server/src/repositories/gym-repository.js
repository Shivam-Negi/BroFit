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
        }).populate('plans')
        .populate({
            path: "members",
            select: "name registerationNumber"
        });
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
            const result = await Gym.updateOne({
                gymId : id
            }, data,
            {new: true});
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

}

module.exports = GymRepository;