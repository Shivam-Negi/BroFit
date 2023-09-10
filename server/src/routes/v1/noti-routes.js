const express = require('express');
const { NotiController } = require('../../controllers');

const router = express.Router();

// noti for all mems.
router.get('/:gymId', NotiController.getNoti);       
router.post('/:gymId', NotiController.sendNoti);

// noti for specific mem
router.get('/spec/:gymId/:userId', NotiController.getNotiSpec);
router.post('/spec/:gymId/:userId', NotiController.sendNotiSpec);

module.exports = router;