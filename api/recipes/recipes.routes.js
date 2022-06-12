const express = require("express");
const upload = require("../../middleware/multer");
const router = express.Router();
const {
  createRecipe,
  getRecipes,
  recipeDetails,
} = require("./recipes.controllers");

router.get("/", getRecipes);

router.post("/create", upload.single("recipeImage"), createRecipe);
router.get("/:recipeId", recipeDetails);

module.exports = router;
