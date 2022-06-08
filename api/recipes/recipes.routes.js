const express = require("express");
const router = express.Router();

const { createRecipe, getRecipes } = require("./recipes.controllers");

router.post("/create", createRecipe);
router.get("/", getRecipes);

module.exports = router;
