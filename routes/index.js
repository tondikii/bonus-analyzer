const router = require("express").Router();
const userRouter = require("./user");
const criteriaRouter = require("./criteria");
const appraisalRouter = require("./appraisal");
const employeeRouter = require("./employee");
const performanceReportRouter = require("./performanceReport");

router.use("/user", userRouter);
router.use("/criteria", criteriaRouter);
router.use("/appraisal", appraisalRouter);
router.use("/employee", employeeRouter);
router.use("/performanceReport", performanceReportRouter);

module.exports = router;
