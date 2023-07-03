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

    async getGymInfo(id) {
        const gym = await Gym.findOne({
            gymId : id
        }).populate('plans').populate('members');
        return gym;
    }

    async updateByGymId(id, data) {
        try {
            const result = await Gym.updateOne({
                gymId : id
            }, data,
            {new: true});
            return result;
        } catch(error) {
            console.log("Something went wrong in crud repo");
            throw error;
        }
    }

}

module.exports = GymRepository;