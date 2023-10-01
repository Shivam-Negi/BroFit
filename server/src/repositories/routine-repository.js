const CrudRepository = require('./crud-repository');
const Routine = require('../models/routine');


class RoutineRepository extends CrudRepository {
    
    constructor() {
        super(Routine);
    }

}

module.exports = RoutineRepository;