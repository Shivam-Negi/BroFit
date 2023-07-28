const CrudRepository = require("./crud-repository");
const UserProfile = require("../models/userProfile");

class UserProfileRepository extends CrudRepository {
  constructor() {
    super(UserProfile);
  }

  async getUserProfileInfo(id) {
    const userProfile = await UserProfile.findOne({ userId : id })
      .select('-attendance')
      .populate({
        path: "userId",
        select: "name email registerationNumber -_id ",
      })
      /* .populate({
        path: "attendance",
        select: "checkIn checkOut day -_id",
      }) */
      .populate({
        path: "plan",
        select: "name validity -_id",
      });
    return userProfile;
  }
  async getUserAttendance(id) {
    const userProfile = await UserProfile.findOne({ userId : id })
      .select('attendance -_id')
      .populate({
        path: "attendance",
        select: "day status -_id ",
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
      const result = await UserProfile.findByIdAndUpdate(id, data, {new: true}).select('-attendance')
      .populate({
        path: "plan",
        select: "name validity -_id",
      })
      .populate({
        path: "userId",
        select: "name email registerationNumber -_id ",
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
      }).select('userId -_id')
      .populate({
        path: "userId",
        select: "name registerationNumber _id",
      }).sort({updatedAt : -1});
      return userProfile;
    } catch (error) {
      // console.log(error);
      throw error;
    }
  }
}

module.exports = UserProfileRepository;
