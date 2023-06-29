const express = require('express');
const { AttendenceController } = require('../../controllers');
const router = express.Router();
const {AuthMiddlewares} = require('../../middlewares')

router.get('/', AuthMiddlewares.checkAuth, AttendenceController.getAllAttendence);
// router.post('/', AuthMiddlewares.checkAuth, AttendenceController.createAttendence);

router.post('/', AuthMiddlewares.checkAuth, AttendenceController.createAttendence);
router.get('/:id', AuthMiddlewares.checkAuth, AttendenceController.getAttendence);
router.patch('/:id', AuthMiddlewares.checkAuth, AttendenceController.updateAttendence);
router.delete('/:id', AuthMiddlewares.checkAuth, AttendenceController.deleteAttendence);

module.exports = router;