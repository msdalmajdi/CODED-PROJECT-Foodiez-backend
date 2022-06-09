const express = require("express");
const upload = require("../../middleware/multer");
const router = express.Router();
const { createRecipe, getRecipes } = require("./recipes.controllers");

router.post("/create", upload.single("recipeImage"), createRecipe);
router.get("/", getRecipes);

module.exports = router;
