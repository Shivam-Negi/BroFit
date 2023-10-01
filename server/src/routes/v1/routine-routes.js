const express = require('express');
const {RoutineController} = require("../../controllers");
const router = express.Router();


router.post('/:id', RoutineController.createRoutine);




module.exports = router;