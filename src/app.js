const path = require("path");
require("dotenv").config({
  debug: process.env.NODE_ENV === "development",
  path: path.join(__dirname, ".env"),
}); // Sets up dotenv as soon as our application starts
require("./database/Database");

const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const routes = require("./routes/index");

const app = express();
const router = express.Router();

const ENV = process.env.NODE_ENV;

// Middlewares
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(logger("dev"));
if (ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.use("/api/v1", routes(router));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.use("/api/v1", routes(router));
}

module.exports = app;
