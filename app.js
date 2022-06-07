const connectDb = require("./database");
const express = require("express");
const cors = require("cors");
const categoriesRoutes = require("./api/categories/categories.routes");

const app = express();

connectDb();

app.use(express.json());
app.use(cors());

app.use("/api/categories", categoriesRoutes);

app.listen(8080, () => {
  console.log("The application is running on localhost:8080");
});
