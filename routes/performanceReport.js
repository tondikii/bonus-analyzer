const router = require("express").Router();
const {
  createPerformanceReport,
  fetchPerformanceReport,
  deletePerformanceReport,
  downloadPerformanceReport,
} = require("../controllers/performanceReport");

router.post("/", createPerformanceReport);
router.get("/", fetchPerformanceReport);
router.delete("/:id", deletePerformanceReport);
router.get("/download/:id", downloadPerformanceReport);

module.exports = router;
