// const {GymOwnerService} = require('../services');
// const {successResponse,errorResponse} = require('../utils/common');
// const {StatusCodes} = require('http-status-codes');

// async function createGymOwner(req, res) {
//     try {
//         const gymOwner = await GymOwnerService.createGymOwner(req.body);
//         successResponse.data = gymOwner;
//         console.log(successResponse.success);
//         return res.status(StatusCodes.CREATED).json(successResponse);

//     } catch (error) {
//         errorResponse.error = error;
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
//     }
// }

// async function getGymOwners(req, res) {
//     try {
//         const gymOwners = await GymOwnerService.getGymOwners();
//         successResponse.data = gymOwners;
//         // console.log(successResponse.success);
//         return res.status(StatusCodes.OK).json(successResponse);

//     } catch (error) {
//         errorResponse.error = error;
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
//     }
// }

// async function getGymOwner(req, res) {
//     try {
//         const gymOwner = await GymOwnerService.getGymOwner(req.params.id);
//         successResponse.data = gymOwner;
//         return res.status(StatusCodes.OK).json(successResponse);

//     } catch (error) {
//         errorResponse.error = error;
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
//     }
// }
// async function updateGymOwner(req, res) {
//     try {
//         const gymOwner = await GymOwnerService.updateGymOwner(req.params.id, req.body);
//         successResponse.data = gymOwner;
//         return res.status(StatusCodes.OK).json(successResponse);
//     } catch (error) {
//         errorResponse.error = error;
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);

//     }
// }
// async function deleteGymOwner(req, res) {
//     try {
//         const gymOwner = await GymOwnerService.deleteGymOwner(req.params.id);
//         successResponse.data = gymOwner;
//         return res.status(StatusCodes.OK).json(successResponse);

//     } catch (error) {
//         errorResponse.error = error;
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse)

//     }
// }

// module.exports = {
//     createGymOwner,
//     getGymOwners,
//     getGymOwner,
//     updateGymOwner,
//     deleteGymOwner,
// }
