const Recipe = require("../../models/Recipe");
const { default: slugify } = require("slugify");

exports.createRecipe = async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  req.body.ingredients.length === 0
    ? (req.body.ingredients = [])
    : (req.body.ingredients = req.body.ingredients.split(","));

  req.body.categories.length === 0
    ? (req.body.categories = [])
    : (req.body.categories = req.body.categories.split(","));

  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newRecipe = await Recipe.create(req.body);

    console.log(req.body);
    res.json(newRecipe);
  } catch (error) {
    console.log("I am in error");
    next(error);
  }
};

exports.getRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find()
      .populate("categories")
      .populate("ingredients")
      .populate("user");
    res.json(recipes);
  } catch (err) {
    next(err);
  }
};

exports.recipeDetails = async (req, res, next) => {
  const { recipeId } = req.params;

  try {
    const foundRecipe = await Recipe.findById(recipeId);
    if (foundRecipe) {
      res.status(200).json(foundRecipe);
      console.log("Successful Recipe detail");
    } else {
      res.status(404).json({ message: "Recipe not found" });
      console.log("Recipe not found");
    }
  } catch (error) {
    next(error);
  }
};
