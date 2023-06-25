const CrudRepository = require('./crud-repository');
const Plan = require('../models/plan');


class PlanRepository extends CrudRepository {

    constructor() {
        super(Plan);
    }
}

module.exports = PlanRepository;