const router = require("express").Router();
const {signIn} = require("../controllers/user");
router.post("/sign-in", signIn);
module.exports = router;
