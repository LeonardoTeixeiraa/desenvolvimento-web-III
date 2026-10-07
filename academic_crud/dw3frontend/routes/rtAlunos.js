var express = require("express");
var router = express.Router();

function getServidorDw3() {
  return (process.env.SERVIDOR_DW3 || "http://localhost:40000").replace(
    /\/+$/,
    "",
  );
}

async function buscarApi(url, token, opcoes) {
  var options = Object.assign(
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (token || ""),
      },
    },
    opcoes || {},
  );

  var response = await fetch(url, options);
  var payload = {};

  try {
    payload = await response.json();
  } catch (error) {
    payload = {};
  }

  if (!response.ok) {
    throw new Error(
      (payload && payload.message) || "Erro ao acessar o servidor de alunos.",
    );
  }

  return payload;
}

router.get("/", function (req, res) {
  res.render("alunos", {
    title: "Alunos",
    showNavbar: true,
    activeMenu: "alunos",
    servidorDw3: getServidorDw3(),
  });
});

router.get("/view", async function (req, res) {
  var alunoId = req.query.alunoId;
  var oper = req.query.oper || "Re";
  var token = req.query.token || "";

  try {
    var data = await buscarApi(
      getServidorDw3() + "/getAlunoByID/" + alunoId,
      token,
      {
        method: "GET",
      },
    );

    var registro =
      data && data.registro && data.registro[0] ? data.registro[0] : null;

    res.render("aluno-view", {
      title: "Aluno",
      showNavbar: true,
      activeMenu: "alunos",
      oper: oper,
      token: token,
      data: registro,
    });
  } catch (error) {
    res.status(500).render("error", {
      title: "Erro",
      message: error.message,
    });
  }
});

router.get("/form", function (req, res) {
  res.render("alunos/vwFormAlunos", {
    title: "Formulario de alunos",
    showNavbar: true,
    activeMenu: "alunos",
    servidorDw3: getServidorDw3(),
  });
});

module.exports = router;
