const CrudRepository = require('./crud-repository');
const GymOwner = require('../models/gymOwner');

class GymOwnerRepository extends CrudRepository {
    constructor() {
        super(GymOwner);
    }
}

module.exports = GymOwnerRepository;