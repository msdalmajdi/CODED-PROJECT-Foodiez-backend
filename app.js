const connectDb = require("./database");
const express = require("express");
const path = require("path");
const cors = require("cors");
const userRoutes = require("./api/users/users.routes");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");
const categoriesRoutes = require("./api/categories/categories.routes");
const recipesRoutes = require("./api/recipes/recipes.routes");
const ingredientsRoutes = require("./api/ingredients/ingredients.routes");
const app = express();

connectDb();

app.use(express.json());
app.use(cors());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use("/api", userRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/recipes", recipesRoutes);
app.use("/api/ingredients", ingredientsRoutes);

app.use(`/media`, express.static(path.join(__dirname, `media`)));

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
});

app.listen(8080, () => {
  console.log("The application is running on localhost:8080");
});
