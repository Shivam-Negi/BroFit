const CrudRepository = require('./crud-repository');
const UserProfile = require('../models/userProfile');

class UserProfileRepository extends CrudRepository{

    constructor() {
        super(UserProfile);
    }
}

module.exports = UserProfileRepository;