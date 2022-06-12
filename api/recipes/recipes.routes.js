const express = require("express");
const { default: slugify } = require("slugify");
const upload = require("../../middleware/multer");
const router = express.Router();
const {
  createRecipe,
  getRecipes,
  recipeDetails,
} = require("./recipes.controllers");

router.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.slug = slugify(req.body.name);
  }
  next();
});
router.post("/create", upload.single("recipeImage"), createRecipe);
router.get("/", getRecipes);

router.get("/:recipeId", recipeDetails);

module.exports = router;
