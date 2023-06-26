const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true,
    },
    gym_id : {
        type : Number,
        ref : 'Gym'
    },   
})

module.exports = mongoose.model('Plan', planSchema);