var createError = require("http-errors");
var express = require("express");
var path = require("path");
var nunjucks = require("nunjucks");
require("dotenv").config({
  path: path.join(__dirname, "dw3frontend.env"),
  quiet: true,
});
var app = express();
var viewsPath = path.join(__dirname, "views");
const port = process.env.PORT || 40100;
app.set("views", viewsPath);
app.set("view engine", "njk");
nunjucks.configure(viewsPath, {
  autoescape: true,
  express: app,
  noCache: app.get("env") === "development",
});
