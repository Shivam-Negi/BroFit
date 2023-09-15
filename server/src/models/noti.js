const mongoose = require('mongoose');
const { checkInTime, currentDate } = require('../utils/helpers/datetime-helpers');

const notiSchema = new mongoose.Schema({
    gymId: {
        type: String,
        required: true,
    },
    target: {
        type: String,
        enum: ['all', 'specific'],
        default: 'all',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    content: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        default: checkInTime,
    },
    day: {
        type: String,
        default: currentDate,
    }
});

module.exports = mongoose.model('Noti', notiSchema);