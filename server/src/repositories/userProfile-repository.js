const CrudRepository = require("./crud-repository");
const UserProfile = require("../models/userProfile");

class UserProfileRepository extends CrudRepository {
  constructor() {
    super(UserProfile);
  }

  async getUserProfileInfo(id) {
    const userProfile = await UserProfile.findOne({ userId : id })
      .populate("attendance")
      .populate({
        path: "plan",
        select: "plan validity -_id",
      });
      // console.log(userProfile);
      // .populate({
      //   path: "userId",
      //   select: "name email -_id",
      // });
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
