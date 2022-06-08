const express = require("express");
const router = express.Router();

const {
  createIngredient,
  getIngredients,
} = require("./ingredients.controllers");

router.post("/create", createIngredient);
router.get("/", getIngredients);

module.exports = router;
