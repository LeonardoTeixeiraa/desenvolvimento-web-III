const db = require("../../../database/databaseconfig");

const GetAllAlunos = async () => {
  return (
    await db.query(
      `SELECT a.*, c.descricao AS descricao
       FROM alunos a
       LEFT JOIN cursos c ON c.cursoid = a.cursoid
       WHERE a.deleted = false
       ORDER BY a.nome ASC`,
    )
  ).rows;
};

const GetAlunoByID = async (alunoIDPar) => {
  return (
    await db.query(
      `SELECT a.*, c.descricao AS descricao
       FROM alunos a
       LEFT JOIN cursos c ON c.cursoid = a.cursoid
       WHERE a.alunoid = $1 AND a.deleted = false
       ORDER BY a.nome ASC`,
      [alunoIDPar],
    )
  ).rows;
};

const GetCursosToAlunos = async () => {
  return (
    await db.query(
      "SELECT cursoid, descricao FROM cursos WHERE deleted = false ORDER BY descricao ASC",
    )
  ).rows;
};

const InsertAluno = async (alunoREGPar) => {
  //@ Atenção: aqui já começamos a utilizar a variável msg para retornor erros de banco de dados.
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO alunos " + "values(default, $1, $2, $3, $4, $5, $6, $7)",
        [
          alunoREGPar.prontuario,
          alunoREGPar.nome,
          alunoREGPar.endereco,
          alunoREGPar.rendafamiliar,
          alunoREGPar.datanascimento,
          alunoREGPar.cursoid,
          alunoREGPar.deleted === undefined ? false : alunoREGPar.deleted,
        ],
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlAlunos|insertAlunos] " + error.detail;
    linhasAfetadas = -1;
  }
  return { msg, linhasAfetadas };
};

const UpdateAluno = async (alunoIDPar, alunoREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE alunos SET " +
          "prontuario = $2, " +
          "nome = $3, " +
          "endereco = $4, " +
          "rendafamiliar = $5, " +
          "datanascimento = $6, " +
          "cursoid = $7, " +
          "deleted = $8 " +
          "WHERE alunoid = $1",
        [
          alunoIDPar,
          alunoREGPar.prontuario,
          alunoREGPar.nome,
          alunoREGPar.endereco,
          alunoREGPar.rendafamiliar,
          alunoREGPar.datanascimento,
          alunoREGPar.cursoid,
          alunoREGPar.deleted === undefined ? false : alunoREGPar.deleted,
        ],
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlAlunos|insertAlunos] " + error.detail;
    linhasAfetadas = -1;
  }
  return { msg, linhasAfetadas };
};

const DeleteAluno = async (alunoIDPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE alunos SET " + "deleted = true " + "WHERE alunoid = $1",
        [alunoIDPar],
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlAlunos|insertAlunos] " + error.detail;
    linhasAfetadas = -1;
  }
  return { msg, linhasAfetadas };
};

module.exports = {
  GetAllAlunos,
  GetAlunoByID,
  GetCursosToAlunos,
  InsertAluno,
  UpdateAluno,
  DeleteAluno,
};
