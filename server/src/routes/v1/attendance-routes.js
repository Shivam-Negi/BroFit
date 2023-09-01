const express = require('express');
const { AttendanceController } = require('../../controllers');
const router = express.Router();
const { AuthMiddlewares, RouteRestrictorMiddleware } = require('../../middlewares');

router.get(
  '/',
  AuthMiddlewares.checkAuth,
  AuthMiddlewares.checkRole(['owner','admin']),
  AttendanceController.getAllAttendance
);
router.post(
  '/',
  AuthMiddlewares.checkAuth,
   RouteRestrictorMiddleware.routeRestrictor,
  AttendanceController.createAttendance
);
router.get(                   // get attendance acc to date
  '/:id',
  AuthMiddlewares.checkAuth,
  AttendanceController.getAttendance
);
router.patch(
  '/:id',
  AuthMiddlewares.checkAuth,
  AttendanceController.updateAttendance
);
router.delete(
  '/:id',
  AuthMiddlewares.checkAuth,
  AttendanceController.deleteAttendance
);
router.get(
  '/:id/:day',
  AttendanceController.getDayWiseAttendance
);
router.get(
  '/monthlyCount/:id/:currentMonth',
  AttendanceController.getMonthlyAttendance
);

module.exports = router;
