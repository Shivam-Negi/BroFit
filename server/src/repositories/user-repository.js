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
    async getUserByRegAndGym(data) {
        const user = await User.findOne({
            gymId : data.gymId,
            registerationNumber : data.registerationNumber
        }).select('role name email gymId registerationNumber');
        return user;
    }
    async getAllMembersOfGym(id) {
        try {
            const gymMembers = await User.find({
                gymId : id,
                role : 'user',
            }).select('members');
            return gymMembers;
        } catch (error) {
            throw error;
        }
    }
    async deleteOwner(gymId) {
        try {
            const gymOwner = await User.findOneAndDelete({
                gymId : gymId,
                role : 'owner' 
            })
            return gymOwner;
        } catch (error) {
            throw error;
        }

    }
}

module.exports = UserRepository;