var express = require("express");
var router = express.Router();

var backendUrl = (process.env.SERVIDOR_DW3 || "http://localhost:40000").replace(
  /\/+$/,
  "",
);

function criarCursoPadrao() {
  return {
    cursoid: 0,
    codigo: "",
    descricao: "",
    ativo: true,
    deleted: false,
  };
}

async function buscarApi(url, opcoes) {
  var options = Object.assign(
    {
      headers: {
        "Content-Type": "application/json",
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
      (payload && payload.message) || "Erro ao acessar o servidor de cursos.",
    );
  }

  return payload;
}

router.get("/", async function (req, res) {
  try {
    var data = await buscarApi(backendUrl + "/getAllCursos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " +
          (req.cookies && req.cookies.token ? req.cookies.token : ""),
      },
    });

    res.render("cursos", {
      title: "Manutenção de cursos",
      data: data,
      showNavbar: true,
      activeMenu: "cursos",
      servidorDw3: backendUrl,
    });
  } catch (error) {
    res.status(500).render("error", {
      title: "Erro",
      message: error.message,
    });
  }
});

router.get("/view", async function (req, res) {
  var id = req.query.cursoId;
  var oper = req.query.oper || "Re";
  var token = req.query.token || "";

  try {
    if (!id) {
      return res.status(400).render("error", {
        title: "Erro",
        message: "Identificador do curso não informado.",
      });
    }

    var data = await buscarApi(backendUrl + "/getCursoByID/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    var registro =
      data && data.registro && Array.isArray(data.registro)
        ? data.registro[0] || criarCursoPadrao()
        : criarCursoPadrao();

    res.render("curso-view", {
      title: "Curso",
      showNavbar: true,
      activeMenu: "cursos",
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

router.get("/insertCursos", function (req, res) {
  res.render("cursos/vwFormCursos", {
    title: "Cadastro de cursos",
    data: criarCursoPadrao(),
    oper: "c",
    showNavbar: true,
    activeMenu: "cursos",
    servidorDw3: backendUrl,
  });
});

router.get("/viewCursos/:id/:oper", async function (req, res) {
  var id = req.params.id;
  var oper = req.params.oper || "v";

  try {
    var data = await buscarApi(backendUrl + "/getCursoByID/" + id, {
      method: "GET",
    });

    var registro =
      data && data.registro && data.registro[0]
        ? data.registro[0]
        : criarCursoPadrao();

    res.render("cursos", {
      title: "Cadastro de cursos",
      data: registro,
      oper: oper,
      showNavbar: true,
      activeMenu: "cursos",
    });
  } catch (error) {
    res.status(500).render("error", {
      title: "Erro",
      message: error.message,
    });
  }
});

router.post("/insertCursos", async function (req, res) {
  var body = req.body || {};
  var payload = {
    codigo: body.codigo || "",
    descricao: body.descricao || "",
    ativo: body.ativo === true || body.ativo === "true",
    deleted: false,
  };

  try {
    var result = await buscarApi(backendUrl + "/insertCurso", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (result && result.status === "ok") {
      return res.redirect("/cursos");
    }

    res.status(400).render("cursos", {
      title: "Cadastro de cursos",
      data: Object.assign({ cursoid: 0 }, payload),
      oper: "c",
      showNavbar: true,
      activeMenu: "cursos",
    });
  } catch (error) {
    res.status(500).render("error", {
      title: "Erro",
      message: error.message,
    });
  }
});

router.post("/viewCursos", async function (req, res) {
  var body = req.body || {};
  var payload = {
    codigo: body.codigo || "",
    descricao: body.descricao || "",
    ativo: body.ativo === true || body.ativo === "true",
    deleted: false,
  };

  try {
    var result = await buscarApi(backendUrl + "/updateCurso/" + body.id, {
      method: "PUT",
      body: JSON.stringify(payload),
    });

    if (result && result.status === "ok") {
      return res.json({ status: "ok" });
    }

    return res.json({ status: "erro" });
  } catch (error) {
    return res.json({ status: "erro", message: error.message });
  }
});

router.post("/DeleteCursos", async function (req, res) {
  var body = req.body || {};

  try {
    var result = await buscarApi(backendUrl + "/deleteCurso/" + body.id, {
      method: "DELETE",
    });

    if (result && result.status === "ok") {
      return res.json({ status: "ok" });
    }

    return res.json({ status: "erro" });
  } catch (error) {
    return res.json({ status: "erro", message: error.message });
  }
});

module.exports = router;
