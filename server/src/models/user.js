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
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    phoneNo : {
        type : Number,
        minlength : 10,
        maxlength : 10,
        unique : true,
    },
    gymId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Gym'
    },
})

module.exports = mongoose.model('User', userSchema);