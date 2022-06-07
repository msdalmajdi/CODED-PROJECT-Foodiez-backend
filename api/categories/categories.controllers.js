const Category = require("../../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    console.log("we caught the error in category Create ", error);
    res.status(500).json(error);
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(201).json(categories);
  } catch (err) {
    res.status(500).json("Server Error");
  }
};
