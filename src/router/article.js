const { postData, getData, getDataById, deleteDataById, putData } = require("../controller/articleController");
const express = require("express");
const router = express.Router();

router.post("/", postData);
router.get("/", getData);
router.get("/:id", getDataById);
router.delete("/:id", deleteDataById);
router.put("/:id", putData);

module.exports = router;
