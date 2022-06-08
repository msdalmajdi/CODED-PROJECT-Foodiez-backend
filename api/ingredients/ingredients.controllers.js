const Ingredient = require("../../models/Ingredient");

exports.createIngredient = async (req, res) => {
  try {
    const newIngredient = await Ingredient.create(req.body);
    res.status(201).json(newIngredient);
  } catch (error) {
    console.log("we caught the error in Ingredient Create ", error);
    res.status(500).json(error);
  }
};

exports.getIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.status(201).json(ingredients);
  } catch (err) {
    res.status(500).json("Server Error");
  }
};
