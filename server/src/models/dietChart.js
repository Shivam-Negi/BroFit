const mongoose = require('mongoose');


const dietSchema = mongoose.Schema({
    gymId : {
        type : String,
        required : true,
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    dietPlanName : {
        type : String
    },
    dietPlanDescription : [{
        Name : String,
        Quantity : String,
    }]
},
{timestamps : true});

module.exports = mongoose.model('DietChart', dietSchema);