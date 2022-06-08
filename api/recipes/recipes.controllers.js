const Recipe = require("../../models/Recipe");

exports.createRecipe = async (req, res) => {
  try {
    const newRecipe = await Recipe.create(req.body);
    res.status(201).json(newRecipe);
  } catch (error) {
    console.log("we caught the error in Recipe Create ", error);
    res.status(500).json(error);
  }
};

exports.getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find()
      .populate("categories")
      .populate("ingredients");
    res.status(201).json(recipes);
  } catch (err) {
    res.status(500).json("Server Error");
  }
};
