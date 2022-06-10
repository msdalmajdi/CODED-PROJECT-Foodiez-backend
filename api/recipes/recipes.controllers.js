const Recipe = require("../../models/Recipe");

exports.createRecipe = async (req, res, next) => {
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
    res.json(newRecipe);
  } catch (error) {
    next(error);
  }
};

exports.getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find()
      .populate("categories")
      .populate("ingredients");
    res.json(recipes);
  } catch (err) {
    next(err);
  }
};
