const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
const port = 3000;

// Configurações do Express
app.use(express.json());
// Configuração do CORS
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "academia",
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    return;
  }
  console.log("Conectado ao banco de dados MySQL");
});

app.use(express.urlencoded({ extended: true }));

app.get("/submit", (req, res) => {
  const sql = "SELECT * FROM fichadetreino"

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erro ao buscar dados no banco de dados");
      return res.json("Erro ao buscar dados");
    }
    res.json(results);
  })
});

app.post("/submit", (req, res) => {
  const objetivo = req.body.objetivo;
  const treino = req.body.treino;

  // Inserir os dados na tabela reserva
  const sql = "INSERT INTO fichadetreino (objetivo, treino) VALUES (?, ?)";
  db.query(sql, [objetivo, treino], (err, results) => {
    if (err) {
      console.error("Erro ao inserir dados no banco de dados:", err);
      return res.json("Erro ao enviar dados.");
    }
    res.json("Dados inseridos na tabela fichadetreino com sucesso!");
  });
});

app.put("/submit/:id", (req, res) => {
  const id = req.params.id;

  const objetivo = req.body.objetivo;
  const treino = req.body.treino;
  
  // Atualizar os dados na tabela reserva
  const sql = "UPDATE fichadetreino SET objetivo=?, treino=? WHERE id=?";
  db.query(sql, [objetivo,treino, id], (err, results) => {
    if (err) {
      console.error("Erro ao atualizar dados no banco de dados");
      return res.json("Erro ao atualizar dados");
    }
    res.json("Dados atualizados na tabela fichadetreino com sucesso!")
  })
})

app.delete("/submit/:id", (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM fichadetreino WHERE id=?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erro ao deletar dados no banco de dados:", err);
      return res.json("Erro ao deletar dados");
    }
    res.json("Dados deletados na tabela fichadetreino com sucesso!")
  })
})

app.listen(port, () => {
  console.log(`Servidor Express rodando em http://localhost:${port}`);
});
