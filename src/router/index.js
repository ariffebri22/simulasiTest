const app = require("express");
const router = app.Router();
const Article = require("./article");

router.use("/api/articles", Article);

module.exports = router;
