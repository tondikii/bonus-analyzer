const router = require("express").Router();
const {deleteAppraisal, updateAppraisal} = require("../controllers/appraisal");

router.put("/:id", updateAppraisal);
router.delete("/:id", deleteAppraisal);

module.exports = router;
