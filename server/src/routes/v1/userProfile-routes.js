const express = require('express');
const { UserProfileController } = require('../../controllers');
const router = express.Router();

router.get('/', UserProfileController.getUserProfile);
router.post('/', UserProfileController.createUserProfile);
router.get('/:id', UserProfileController.getUserProfile);
router.patch('/:id', UserProfileController.updateUserProfile);
router.delete('/:id', UserProfileController.deleteUserProfile);

module.exports = router;