const CrudRepository = require('./crud-repository');
const User = require('../models/user');

class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }

    async getUserByEmail(email) {
        const user = await User.findOne({
            email : email,
        });
        return user;
    }
    async getUserByUserId(id) {
        const user = await User.findOne({
            _id : id
        });
        return user;
    }
    async getUserByNameAndGym(data) {
        const user = await User.findOne({
            gymId : data.gymId,
            name : data.name
        }).select('role name email gymId');
        return user;
    }
}

module.exports = UserRepository;