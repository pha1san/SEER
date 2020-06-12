const router = require("express").Router();
const analystController = require("../controllers/analystController.js");

//note: these routes must have the exact same functionality found in the controller files or else it will cause errors in the server.
router.get("/", analystController.analyst);
router.route("/id:id").get(analystController.getAnalyst);

module.exports = router;