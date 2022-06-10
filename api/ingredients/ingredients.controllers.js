const Ingredient = require("../../models/Ingredient");
const Fuse = require("fuse.js");

const options = {
  threshold: 0.3,
  keys: ["name"],
};

exports.createIngredient = async (req, res, next) => {
  try {
    const ingredients = await Ingredient.find();
    const fuse = new Fuse(ingredients, options);
    const result = fuse.search(req.body.name);
    if (result.length !== 0) {
      res.status(400).json({ message: "Cannot add duplicates" });
    } else {
      const newIngredient = await Ingredient.create(req.body);
      res.status(201).json(newIngredient);
    }
  } catch (error) {
    next(error);
  }
};

exports.getIngredients = async (req, res, next) => {
  try {
    const ingredients = await Ingredient.find();
    res.json(ingredients);
  } catch (err) {
    next(error);
  }
};
