const router = require("express").Router();
const {
  createAppraisal,
  fetchAppraisals,
  updateAppraisal,
  deleteAppraisal,
} = require("../controllers/appraisal");

router.post("/", createAppraisal);
router.get("/", fetchAppraisals);
router.put("/:id", updateAppraisal);
router.delete("/:id", deleteAppraisal);

module.exports = router;
