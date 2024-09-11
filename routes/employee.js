const router = require("express").Router();
const {
  fetchEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  fetchEmployeesOnly,
} = require("../controllers/employee");

router.post("/", createEmployee);
router.get("/only", fetchEmployeesOnly);
router.get("/", fetchEmployees);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router;
