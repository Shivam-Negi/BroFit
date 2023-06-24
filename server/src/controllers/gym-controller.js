const { GymService } = require('../services');


async function createGym(req, res) {
    try {
        const gym = await GymService.createGym(req.body);
        return res.status(201).json({
            success: true,
            message: "successfully created a gym",
            data: gym,
            err: {}
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "error while creating a gym",
            data: {},
            err: error
        })
    }
}

async function getGyms(req, res) {
    try {
        const gyms = await GymService.getGyms();
        return res.status(200).json({
            success: true,
            message: "successfully fetched all gyms",
            data: gyms,
            err: {}
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "error while fetching gyms",
            data: {},
            err: error
        })
    }
}

module.exports = {
    createGym,
    getGyms
}