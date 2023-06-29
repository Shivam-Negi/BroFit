const {StatusCodes} = require('http-status-codes');
const {AttendenceService, UserProfileService} = require('../services');
const {successResponse,errorResponse} = require('../utils/common');


async function createAttendence(req, res) {
    try {
        // const obj {
        //     CheckIn: ,
        //     date:    ,
        //     checkOut: 
        // }
        // console.log(req.user);
        const attendence = await AttendenceService.createAttendence(
            {
                userId : req.user,
                checkIn : req.body.checkIn,
                checkOut : req.body.checkOut,
            }
        );
        // console.log(attendence._id);
        console.log(req.user);
        const userprofile = await UserProfileService.getUserProfileByUserId(req.user);
        // console.log(userprofile);
        userprofile.attendence.push(attendence._id);
        await userprofile.save();
        successResponse.data = attendence;
        return res.status(StatusCodes.CREATED).json(successResponse);
        
    } catch (error) {
        console.log(error);
        errorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
}

// async function dailyAttendence(req, res) {
//     try {
//         const attendenceInfoData = {
//             id : req.user,
//             attendenceInfo : {
//                 checkIn : req.body.checkIn,
//                 date : req.body.date,
//                 checkOut : req.body.checkOut
//             }
//         }
//         // console.log(attendenceInfoData);
//         const attendence = await AttendenceService.dailyAttendence(attendenceInfoData);
//         const userProfile = await UserProfileService.getUserProfileByUserId(req.user);
//         // console.log(attendence.attendence);
//         let data = attendence.attendence;
//         userProfile.attendence.push(data[data.length-1]._id);
//         await userProfile.save();
//         successResponse.data = attendence.attendence;
//         return res.status(StatusCodes.OK).json(successResponse);
//     } catch (error) {
//         // console.log(error);
//         errorResponse.error = error;
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
//     }
// }

async function getAllAttendence(req, res) {
    try {
        const attendence = await AttendenceService.getAllAttendence();
        successResponse.data = attendence;
        return res.status(StatusCodes.OK).json(successResponse);
        
    } catch (error) {
        errorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
}

async function getAttendence(req, res) {
    try {
        const attendence = await AttendenceService.getAttendence(req.params.id);
        successResponse.data = attendence;
        return res.status(StatusCodes.OK).json(successResponse);
        
    } catch (error) {
        errorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);   
    }
}
async function updateAttendence(req, res) {
    try {
        const attendence = await AttendenceService.updateAttendence(req.params.id, req.body);
        successResponse.data = attendence;
        return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
        errorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
        
    }
}
async function deleteAttendence(req, res) {
    try {
        const attendence = await AttendenceService.deleteAttendence(req.params.id);
        successResponse.data = attendence;
        return res.status(StatusCodes.OK).json(successResponse);
        
    } catch (error) {
        errorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse)
        
    }
}

module.exports = {
    createAttendence,
    getAllAttendence,
    getAttendence,
    updateAttendence,
    deleteAttendence,
    // dailyAttendence,
}