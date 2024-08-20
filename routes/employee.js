const router = require("express").Router();
const {fetchEmployees} = require("../controllers/employee");

router.get("/", fetchEmployees);

module.exports = router;
