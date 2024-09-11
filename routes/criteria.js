const router = require("express").Router();
const {
  createCriteria,
  fetchCriterion,
  fetchCriteriaById,
  deleteCriteria,
  updateCriteria,
  fetchCriterionOnly
} = require("../controllers/criteria");

router.post("/", createCriteria);
router.get("/only", fetchCriterionOnly);
router.get("/", fetchCriterion);
router.get("/:id", fetchCriteriaById);
router.put("/:id", updateCriteria);
router.delete("/:id", deleteCriteria);


module.exports = router;
