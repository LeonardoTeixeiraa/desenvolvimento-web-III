const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});
module.exports = {
  query: (text, params) => pool.query(text, params),
};

pool.connect((err, client, release) => {
  if (err) {
    console.error("❌ Erro ao conectar ao banco:", err.message);
    return;
  }

  console.log("✅ Conexão com o banco de dados estabelecida!");
  release();
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
