const { StatusCodes } = require('http-status-codes');
const { NotiRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const notiRepository = new NotiRepository();

async function sendNoti(data) {
    try {
        const noti = await notiRepository.create(data);
        return noti;
    } catch (error) {
        console.log(error);
        throw new AppError('Cannot create noti object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getNoti(gymId) {
    try {
        const noti = await notiRepository.getAllNoti(gymId);
        return noti;
    } catch (error) {
        throw new AppError('Cannot fetch all notific', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function sendNotiSpec(data) {
    try {
        const noti = await notiRepository.create(data);
        return noti;
    } catch (error) {
        console.log(error);
        throw new AppError('Cannot create noti object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getNotiSpec(gymId, userId) {
    try {
        const noti = await notiRepository.getNotiSpec(gymId, userId);
        return noti;
    } catch (error) {
        throw new AppError('Cannot fetch the notific', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    sendNoti,
    getNoti,
    sendNotiSpec,
    getNotiSpec,
}