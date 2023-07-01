const {StatusCodes} = require('http-status-codes');
const {AttendanceService} = require('../services');
const { currentDate } = require('../utils/helpers/datetime-helpers');




async function routeRestrictor(req, res, next) {
    try {
        const day = await AttendanceService.getAttendanceByUserId(req.user);
        const currentDay = currentDate().split('-')[0];
        if(day !== currentDay || !day){
            next();
        }
        else{
            res.status(StatusCodes.FORBIDDEN).json({error : 'Access limit exceeded'});
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });  
    }
}

module.exports = {
    routeRestrictor,
}
