var createError = require("http-errors");
var express = require("express");
var path = require("path");
var dotenv = require("dotenv");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var nunjucks = require("nunjucks");

var indexRouter = require("./routes/index");
var rtCursos = require("./routes/rtCursos");
var rtAlunos = require("./routes/rtAlunos");
var rtLogin = require("./routes/rtLogin");

dotenv.config({ path: path.join(__dirname, "dw3frontend.env") });

var app = express();
var port = Number(process.env.PORT || 40100);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "njk");

nunjucks.configure(path.join(__dirname, "views"), {
  autoescape: true,
  express: app,
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/alunos", rtAlunos);
app.use("/cursos", rtCursos);
app.use("/login", rtLogin);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

if (require.main === module) {
  app.listen(port, function () {
    console.log("dw3frontend listening on port " + port);
  });
}

module.exports = app;
