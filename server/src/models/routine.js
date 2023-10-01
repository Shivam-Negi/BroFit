const mongoose = require('mongoose');
const routineSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    level : {
        type : String,
        enum : ['beginner', 'intermediate', 'advanced']
    },
    visibility : {
        type : String,
        enum : ['all', 'specific'],
        default : 'all',
    },
    created : {
        type : mongoose.Schema.Types.ObjectId,
    },
    gymId : {
        type : String,
        required : true,
    },
    monday : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Workout'
        }
    ],
    tuesday : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Workout'
        }
    ],
    wednesday : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Workout'
        }
    ],
    thursday : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Workout'
        }
    ],
    friday : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Workout'
        }
    ],
    saturday : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Workout'
        }
    ],
    sunday : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Workout'
        }
    ]
    
});

module.exports = new mongoose.model('Routine', routineSchema);
