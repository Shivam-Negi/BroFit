const express = require('express');
const { DietChartController } = require('../../controllers');
const router = express.Router();

router.get('/:id', DietChartController.getAllDietChartForGym);
router.get('/personal/:id', DietChartController.getDietChartByUserId);
router.post('/create/:id', DietChartController.createDietChart);
router.patch('/:id', DietChartController.updateDietChart);
router.delete('/:id', DietChartController.deleteDietChart);

module.exports = router;