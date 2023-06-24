const {GymService} = require('../services');


async function createGym(req, res) {
    try {
        const gym = await GymService.createGym(req.body);
        return res.status(201).json({
            success: true,
            message: "successfully created a gym",
            data: response,
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

module.exports = {
    createGym,
}