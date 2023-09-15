const express = require("express");
const router = express.Router();
const gymRouter = require("./gym-routes");
const userRouter = require("./user-routes");
const userProfileRouter = require("./userProfile-routes");
const planRouter = require("./plan-routes");
const attendanceRouter = require("./attendance-routes");
const forgotPwdRouter = require("./forgotPwd-routes");
const dietChartRouter = require("./dietChart-routes");

router.use("/gym", gymRouter);
router.use("/user", userRouter);
router.use("/userProfile", userProfileRouter);
router.use("/plan", planRouter);
router.use("/attendance", attendanceRouter);
router.use("/forgotPass", forgotPwdRouter);
router.use("/dietChart", dietChartRouter);

module.exports = router;
