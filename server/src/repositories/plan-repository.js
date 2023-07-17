const CrudRepository = require('./crud-repository');
const Plan = require('../models/plan');

class PlanRepository extends CrudRepository {

    constructor() {
        super(Plan);
    }
    async getPlansOfGym(gymId) {
        const plans = Plan.find({
          gymId: gymId
        });
        return plans;
      }
}

module.exports = PlanRepository;