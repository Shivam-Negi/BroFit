const CrudRepository = require('./crud-repository');
const UserProfile = require('../models/userProfile');

class UserProfileRepository extends CrudRepository{

    constructor() {
        super(UserProfile);
    }

    async getUserProfileInfo(id) {

        const userProfile = await UserProfile.findOne({ _id: id }).populate('attendence').populate('plan');
        return userProfile;
        
    }
    async getUserProfileByUserId(data){
        const userProfile = await UserProfile.findOne(
            {
               userId : data 
            }
        );
        return userProfile;
    }
}

module.exports = UserProfileRepository;