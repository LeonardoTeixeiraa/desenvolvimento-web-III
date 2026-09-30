var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  res.render("alunos", {
    title: "Alunos",
    showNavbar: true,
    activeMenu: "alunos",
    servidorDw3: process.env.SERVIDOR_DW3,
  });
});

router.get('/form', function(req, res) {
res.render('alunos/vwFormAlunos', {
title: 'Formulario de alunos',
showNavbar: true,
activeMenu: 'alunos',
servidorDw3: process.env.SERVIDOR_DW3
});
});

module.exports = router;
