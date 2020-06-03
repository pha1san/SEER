const router = require("express").Router();
const entryController = require("../controllers/entryController.js");

router.get("/", entryController.entries);

router.route("/add").post(entryController.addEntry);

router.route("/addTDD").post(entryController.addTDD);

router.route("/id:id").get(entryController.getEntry);

router.route("/search/title").post(entryController.searchTitle);

router.route("/search/author").post(entryController.searchAuthor);

//router.route("/search").get();

module.exports = router;
