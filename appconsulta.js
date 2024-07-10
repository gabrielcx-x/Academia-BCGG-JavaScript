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
  const sql = "SELECT * FROM cadastroconsulta"

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erro ao buscar dados no banco de dados");
      return res.json("Erro ao buscar dados");
    }
    res.json(results);
  })
});

app.post("/submit", (req, res) => {
  const nomepaciente = req.body.nomepaciente;
  const dataconsulta = req.body.dataconsulta;

  // Inserir os dados na tabela reserva
  const sql = "INSERT INTO cadastroconsulta (nomepaciente, dataconsulta) VALUES (?, ?)";
  db.query(sql, [nomepaciente, dataconsulta], (err, results) => {
    if (err) {
      console.error("Erro ao inserir dados no banco de dados:", err);
      return res.json("Erro ao enviar dados.");
    }
    res.json("Dados inseridos na tabela cadastroconsulta com sucesso!");
  });
});

app.put("/submit/:id", (req, res) => {
  const id = req.params.id;

  const nomepaciente = req.body.nomepaciente;
  const dataconsulta = req.body.dataconsulta;
  
  // Atualizar os dados na tabela reserva
  const sql = "UPDATE cadastroconsulta SET nomepaciente=?, dataconsulta=? WHERE id=?";
  db.query(sql, [nomepaciente, dataconsulta, id], (err, results) => {
    if (err) {
      console.error("Erro ao atualizar dados no banco de dados");
      return res.json("Erro ao atualizar dados");
    }
    res.json("Dados atualizados na tabela cadastroconsulta com sucesso!")
  })
})

app.delete("/submit/:id", (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM cadastroconsulta WHERE id=?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erro ao deletar dados no banco de dados:", err);
      return res.json("Erro ao deletar dados");
    }
    res.json("Dados deletados na tabela cadastroconsulta com sucesso!")
  })
})

app.listen(port, () => {
  console.log(`Servidor Express rodando em http://localhost:${port}`);
});
