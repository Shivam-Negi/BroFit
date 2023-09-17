const express = require('express');
const { UserProfileController } = require('../../controllers');
const {AuthMiddlewares} = require('../../middlewares')
const router = express.Router();

router.get('/', UserProfileController.getUserProfiles);
router.post('/', AuthMiddlewares.checkAuth, UserProfileController.createUserProfile);
router.get('/:id', AuthMiddlewares.checkAuth, UserProfileController.getUserProfile);
router.get('/calendar/:id', AuthMiddlewares.checkAuth, UserProfileController.getUserAttendance);
router.patch('/:id', AuthMiddlewares.checkAuth, UserProfileController.updateUserProfile);
router.delete('/:id', AuthMiddlewares.checkAuth, UserProfileController.deleteUserProfile);
router.patch('/plan/:id',UserProfileController.updateUserProfilePlans);
router.patch('/newPlan/:id',UserProfileController.updateUserPlan);
router.get('/:id/:status',UserProfileController.getUserByStatus);
router.get('/planMemberCount/:gymId/:planId', UserProfileController.getPlanMemberCount);
router.get('/profilePic/:userId/:gymId', UserProfileController.getUserPic);
router.post('/profilePic/:userId/:gymId', UserProfileController.uploadUserPic);
 
module.exports = router;