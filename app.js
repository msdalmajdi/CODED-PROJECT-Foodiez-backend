const connectDb = require("./database");
const express = require("express");

const app = express();

connectDb();

app.use(express.json());

app.listen(8080, () => {
  console.log("The application is running on localhost:8080");
});
