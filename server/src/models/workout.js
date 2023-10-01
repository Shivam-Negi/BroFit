const mongoose = require('mongoose');
const workoutSchema = new mongoose.Schema({

    target : {
        type : String,
        required : true,
    },
    thumbnail : {
        type : String,
        required : true,
    },
    video : {
        type : String,
        required : true,
    },
    tags : [
       {
        type : String
       } 
    ]
});

module.exports = new mongoose.model('Workout', workoutSchema);
