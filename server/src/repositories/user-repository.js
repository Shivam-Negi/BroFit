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
    async getUserRegisterNumber(data) {
        try {
          const user = await User.findOne({
            gymId : data.gymId,
            registerationNumber : data.registerationNumber,
          });
          return user; 
        } catch (error) {
            throw error;
        }
      }
      async getGymMembers(data) {
        try {
            // console.log(data);
            const count = await User.countDocuments({
                gymId : data.gymId,
                role : 'user',
            })
            const gymMembers = await User.find({
                gymId : data.gymId,
                role : 'user',
            }).select('name registerationNumber _id')
            .skip((data.page - 1) * data.limit)
            .limit(data.limit)
            .exec();
            // console.log(gymMembers);
            return {
                totalPages : Math.ceil(count/data.limit),
                MembersArray : gymMembers
            };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    
    async getUserByRegNumber(data) {
        try {
            const member = await User.findOne({
                gymId : data.gymId,
                registerationNumber : data.registerationNumber,
                role : 'user'
            }).select('name _id registerationNumber');
            return member;
        } catch (error) {
            console.log(error);
            throw error;   
        }
    }
}

module.exports = UserRepository;