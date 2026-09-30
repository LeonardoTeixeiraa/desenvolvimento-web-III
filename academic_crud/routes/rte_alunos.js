//Arquivo routes/rte_alunos.js
var express = require("express");
var alunosApp = require("../apps/alunos/controller/ctlAluno");
var router = express.Router();
//Função necessária para evitar que usuários não autenticados acessem o sistema.
function authenticationMiddleware(req, res, next) {
  // Verificar se existe uma sessão válida.
  isLogged = req.session.isLogged;
  if (!isLogged) {
    res.redirect("/Login");
  }
  next();
}

/* GET métodos */
router.get("/", authenticationMiddleware, alunosApp.GetAllAlunos);
router.get("/insertAlunos", authenticationMiddleware, alunosApp.InsertAluno);
router.get(
  "/viewAlunos/:alunoid/:oper",
  authenticationMiddleware,
  alunosApp.GetAlunoByID,
);
/* POST métodos */
router.post("/insertAlunos", authenticationMiddleware, alunosApp.InsertAluno);
router.post("/DeleteAlunos", authenticationMiddleware, alunosApp.DeleteAluno);
router.put(
  "/viewAlunos/:alunoid",
  authenticationMiddleware,
  alunosApp.UpdateAluno,
);
module.exports = router;
