const express = require('express');
const { PlanController } = require('../../controllers');
const router = express.Router();

router.get('/', PlanController.getPlans);
router.post('/', PlanController.createPlan);
router.get('/:id', PlanController.getPlan);
router.patch('/:id', PlanController.updatePlan);
router.delete('/:id', PlanController.deletePlan);

module.exports = router;