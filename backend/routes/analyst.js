const router = require("express").Router();
const analystController = require("../controllers/analystController.js");

//note: these routes must have the exact same functionality found in the controller files or else it will cause errors in the server.
router.get("/", analystController.analyst);
router.route("/id:id").get(analystController.getAnalyst);
router.route("/add").post(analystController.addAnalyst);
router.route("/delete/id:id").delete(analystController.delete);
router.route("/move").post(analystController.moveToEntry);

module.exports = router;
