var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect("/home");
});

router.get("/home", function (req, res, next) {
  res.render("home", {
    title: "Início",
    showNavbar: true,
    activeMenu: "home",
  });
});

/* GET login page. */
router.get("/login", function (req, res, next) {
  res.render("login", {
    title: "Login",
    showNavbar: false,
    servidorDw3: process.env.SERVIDOR_DW3,
  });
});

module.exports = router;
