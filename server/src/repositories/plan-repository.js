const CrudRepository = require('./crud-repository');
const Plan = require('../models/plan');

class PlanRepository extends CrudRepository {

    constructor() {
        super(Plan);
    }
    async getPlansOfGym(gymId) {
      const plans = await Plan.find({
          gymId: gymId
        });
        return plans;
      }
    async deletePlans(gymId) {
      try {
        const plans = await Plan.deleteMany({
          gymId : gymId
        })
        return gymId;
      } catch (error) {
        throw error;
      }
    }
}

module.exports = PlanRepository;