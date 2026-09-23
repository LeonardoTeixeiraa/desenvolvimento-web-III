const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

const router = require("./routes/router");

var indexRouter = require("./routes/index");
var alunosRouter = require("./routes/rte_alunos");
var cursosRouter = require("./routes/rte_cursos");

const port = 40000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

//Configurar o CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use(router);
app.use("/", indexRouter);
app.use("/alunos", alunosRouter);
app.use("/cursos", cursosRouter);

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
