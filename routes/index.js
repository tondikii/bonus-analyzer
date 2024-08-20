const router = require("express").Router();
const userRouter = require("./user");
const criteriaRouter = require("./criteria");
const appraisalRouter = require("./appraisal");
const employeeRouter = require("./employee");

router.use("/user", userRouter);
router.use("/criteria", criteriaRouter);
router.use("/appraisal", appraisalRouter);
router.use("/employee", employeeRouter);

module.exports = router;
