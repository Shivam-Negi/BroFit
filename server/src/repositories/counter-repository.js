const CrudRepository = require('./crud-repository');
const Counter = require('../models/counter');

class CounterRepository extends CrudRepository{
    constructor(){
        super(Counter);
    }

    async counterIncreement(id) {
        try {
            const counter = await Counter.findOneAndUpdate(
                {gymId : id},
                {"$inc": {"seq":1}},
                {new: true}
                );
            return counter;
        } catch (error) {
            throw error;    
        }
    }
}

module.exports = CounterRepository;