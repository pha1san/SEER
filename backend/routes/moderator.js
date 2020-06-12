const router = require("express").Router();
const moderatorController = require("../controllers/moderatorController.js");

router.get("/", moderatorController.moderator);
router.route("/add").post(moderatorController.addModerator);
router.route("/id:id").get(moderatorController.getModerator);
router.route("/delete/id:id").delete(moderatorController.delete);
router.route("/move").post(moderatorController.moveToAnalyst);

module.exports = router;
