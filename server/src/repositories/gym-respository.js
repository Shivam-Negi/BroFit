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

}

module.exports = GymRepository;