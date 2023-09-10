const {StatusCodes} = require('http-status-codes');
const { NotiService } = require('../services');
const { successResponse, errorResponse } = require('../utils/common');

// send notific to all
async function sendNoti(req, res) {
    try {
        const noti = await NotiService.sendNoti({
            gymId : req.params.gymId,
            content : req.body.content
        });
        successResponse.data = noti;
        return res
                .status(StatusCodes.CREATED)
                .json(successResponse);
    } catch (error) {
        // console.log(error)
        errorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(errorResponse);
    }
}

// fetch all notific targeted for all mems.
async function getNoti(req, res) {
    try {
        const noti = await NotiService.getNoti(req.params.gymId);
        successResponse.data = noti;
        return res
                .status(StatusCodes.OK)
                .json(successResponse);
    } catch (error) {
        errorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(errorResponse);
    }
}

// send noti to specific mem
async function sendNotiSpec(req, res) {
    try {
        const noti = await NotiService.sendNotiSpec({
            gymId: req.params.gymId,
            content: req.body.content,
            target: 'specific',
            userId: req.params.userId
        });
        successResponse.data = noti;
        return res
                .status(StatusCodes.CREATED)
                .json(successResponse);
    } catch (error) {
        // console.log(error)
        errorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(errorResponse);
    }
}

// fetch noti of a specific user
async function getNotiSpec(req, res) {
    try {
        const noti = await NotiService.getNotiSpec(req.params.gymId, req.params.userId);
        successResponse.data = noti;
        return res
                .status(StatusCodes.OK)
                .json(successResponse);
    } catch (error) {
        errorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(errorResponse);
    }
}

module.exports = {
    sendNoti,
    getNoti,
    sendNotiSpec,
    getNotiSpec,
}