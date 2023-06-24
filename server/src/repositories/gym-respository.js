const CrudRepository = require('./crud-repository');
const Gym = require('../models/gym');


class GymRepository extends CrudRepository {

    constructor() {
        super(Gym);
    }
}

module.exports = GymRepository;