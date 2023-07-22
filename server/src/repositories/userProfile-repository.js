const CrudRepository = require("./crud-repository");
const UserProfile = require("../models/userProfile");

class UserProfileRepository extends CrudRepository {
  constructor() {
    super(UserProfile);
  }

  async getUserProfileInfo(id) {
    const userProfile = await UserProfile.findOne({ userId : id })
      .populate({
        path: "userId",
        select: "email -_id",
      })
      .populate({
        path: "attendance",
        select: "checkIn checkOut day -_id",
      })
      .populate({
        path: "plan",
        select: "name validity -_id",
      });
    return userProfile;
  }
  async getUserProfileByUserId(data) {
    const userProfile = await UserProfile.findOne({
      userId: data,
    });
    // console.log(userProfile);
    return userProfile;
  }
  async deleteUserProfileByUserId(id) {
      const userProfile = await UserProfile.findOneAndRemove({
        userId : id
      });
      return userProfile;
  }

  async updateUserProfile(id, data) {
      const result = await UserProfile.findByIdAndUpdate(id, data, {new: true}).populate({
        path: "plan",
        select: "name validity -_id",
      });
      return result;
  }
  async getExpireToday(day) {
    const userProfile = await UserProfile.find({ 
          planExpiryDate : day
      }).select('planExpiryDate userId plan')
      .populate({
        path: "plan",
        select: "name validity -_id",
      });
    return userProfile;
  }
  async getUserByStatus(id, data) {
    try {
      const userProfile = await UserProfile.find({
        gymId : id,
        status : data,
      }).populate([{
        path: "plan",
        select: "name validy -_id",
      },
      {
        path: "userId",
        select: "name email"
      }
    ]);
      return userProfile;
    } catch (error) {
      // console.log(error);
      throw error;
    }
  }
}

module.exports = UserProfileRepository;
