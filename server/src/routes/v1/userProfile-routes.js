const express = require('express');
const { UserProfileController } = require('../../controllers');
const {AuthMiddlewares} = require('../../middlewares')
const router = express.Router();

router.get('/', UserProfileController.getUserProfiles);
router.post('/', AuthMiddlewares.checkAuth, UserProfileController.createUserProfile);
router.get('/:id', AuthMiddlewares.checkAuth, UserProfileController.getUserProfile);
router.patch('/:id', AuthMiddlewares.checkAuth, UserProfileController.updateUserProfile);
router.delete('/:id', AuthMiddlewares.checkAuth, UserProfileController.deleteUserProfile);
router.patch('/plan/:id',UserProfileController.updateUserProfilePlans);
router.patch('/newPlan/:id',UserProfileController.updateUserPlan);
router.get('/:id/:status',UserProfileController.getUserByStatus);
 
module.exports = router;