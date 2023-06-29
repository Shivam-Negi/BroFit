const express = require("express");
const { AttendanceController } = require("../../controllers");
const router = express.Router();
const { AuthMiddlewares } = require("../../middlewares");

router.get(
  "/",
  AuthMiddlewares.checkAuth,
  AttendanceController.getAllAttendance
);
router.post(
  "/",
  AuthMiddlewares.checkAuth,
  AttendanceController.createAttendance
);
router.get(
  "/:id",
  AuthMiddlewares.checkAuth,
  AttendanceController.getAttendance
);
router.patch(
  "/:id",
  AuthMiddlewares.checkAuth,
  AttendanceController.updateAttendance
);
router.delete(
  "/:id",
  AuthMiddlewares.checkAuth,
  AttendanceController.deleteAttendance
);

module.exports = router;
