const mongoose = require('mongoose');


const gymSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    owner : {
        type : String,
        required : true,
    },
    members : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    ]
})

module.exports = mongoose.model('Gym', gymSchema);