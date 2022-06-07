const express = require("express");
const router = express.Router();

const { createCategory, getCategories } = require("./categories.controllers");

router.post("/create", createCategory);
router.get("/", getCategories);

module.exports = router;
