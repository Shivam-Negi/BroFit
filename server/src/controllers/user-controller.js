const { UserService } = require('../services');


async function createUser(req, res) {
    try {
        const user = await UserService.createUser(req.body);
        return res.status(201).json({
            success: true,
            message: "successfully created a user",
            data: user,
            err: {}
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "error while creating a user",
            data: {},
            err: error
        })
    }
}

async function getUsers(req, res) {
    try {
        const users = await UserService.getUsers();
        return res.status(200).json({
            success: true,
            message: "successfully fetched all users",
            data: users,
            err: {}
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "error while fetching users",
            data: {},
            err: error
        })
    }
}

module.exports = {
   createUser,
   getUsers
}