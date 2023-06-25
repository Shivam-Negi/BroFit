const mongoose = require('mongoose');

const gymSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    gym_id : {
        type : Number,
        required : true
    },
    owner : {
        type : String,
        required : true,
    },
})

module.exports = mongoose.model('Gym', gymSchema);