const express = require("express");
const routerApp = express.Router();
const appCalculadora = require("../controller/calculadora");

routerApp.post("/soma", appCalculadora.soma);
routerApp.post("/subtracao", appCalculadora.subtracao);
routerApp.post("/multiplicacao", appCalculadora.multiplicacao);
routerApp.post("/divisao", appCalculadora.divisao);

module.exports = routerApp;
