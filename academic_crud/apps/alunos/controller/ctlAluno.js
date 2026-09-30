const mdlAlunos = require("../model/mdlAlunos");

const GetAllAlunos = (req, res) =>
  (async () => {
    let registro = await mdlAlunos.GetAllAlunos();
    res.json({ status: "ok", registro: registro });
  })();

const GetAlunoByID = (req, res) =>
  (async () => {
    const alunoID = parseInt(req.params.alunoid);
    let registro = await mdlAlunos.GetAlunoByID(alunoID);
    res.json({ status: "ok", registro: registro });
  })();

const GetCursosToAlunos = (req, res) =>
  (async () => {
    let registro = await mdlAlunos.GetCursosToAlunos();
    res.json({ status: "ok", registro: registro });
  })();

const InsertAluno = (req, res) =>
  (async () => {
    const registro = req.body;
    let { msg, linhasAfetadas } = await mdlAlunos.InsertAluno(registro);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

const UpdateAluno = (req, res) =>
  (async () => {
    const alunoID = parseInt(req.params.alunoid);
    const registro = req.body;
    let { msg, linhasAfetadas } = await mdlAlunos.UpdateAluno(
      alunoID,
      registro,
    );
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

const DeleteAluno = (req, res) =>
  (async () => {
    const alunoID = parseInt(req.params.alunoid);
    let { msg, linhasAfetadas } = await mdlAlunos.DeleteAluno(alunoID);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

module.exports = {
  GetAllAlunos,
  GetAlunoByID,
  GetCursosToAlunos,  
  InsertAluno,
  UpdateAluno,
  DeleteAluno,
};
