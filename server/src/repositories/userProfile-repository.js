const CrudRepository = require("./crud-repository");
const UserProfile = require("../models/userProfile");

class UserProfileRepository extends CrudRepository {
  constructor() {
    super(UserProfile);
  }

  async getUserProfileInfo(id) {
    const userProfile = await UserProfile.findOne({ userId : id })
      .populate({
        path: "attendance",
        select: "checkIn checkOut day -_id",
      })
      .populate({
        path: "plan",
        select: "plan validity -_id",
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
}

module.exports = UserProfileRepository;
