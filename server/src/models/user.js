const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
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
    password : {
        type : String,
        requird : true,
    },
    gymId : {
        type: String,
        required : true
    },
})

module.exports = mongoose.model('User', userSchema);