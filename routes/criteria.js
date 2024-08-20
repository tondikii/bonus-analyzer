const router = require("express").Router();
const {
  createCriteria,
  fetchCriterion,
  fetchCriteriaById,
  deleteCriteria,
  updateCriteria,
} = require("../controllers/criteria");

router.post("/", createCriteria);
router.get("/", fetchCriterion);
router.get("/:id", fetchCriteriaById);
router.put("/:id", updateCriteria);
router.delete("/:id", deleteCriteria);

module.exports = router;
