const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        trim : true,
        unique : true,
        required : true, 
    },
    phoneNo : {
        type : Number,
        minlength : 10,
        maxlength : 10
    },
    gymId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Gym'
    },
})

module.exports = mongoose.model('User', userSchema);