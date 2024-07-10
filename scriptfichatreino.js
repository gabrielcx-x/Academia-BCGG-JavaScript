
document.addEventListener("DOMContentLoaded", exibirTreinos);

let treinos = [];

// Reserva em edição
let treinoAtual = null;

// Função para exibir reservas na tabela
function exibirTreinos() {
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = "";

  // Carrega reservas do servidor ao carregar a página
  fetch("http://localhost:3000/submit")
      .then((response) => response.json())
      .then((data) => {
        treinos = data;
          //Iterar pelas reservas e criar as linhas da tabela
          treinos.forEach((treino) => {
          const linha = document.createElement("tr");
          linha.innerHTML = 
          `<td>${treino.id}</td>
          <td>${treino.objetivo}</td>
          <td>${treino.treino}</td>
          <td>
              <button onclick="editarTreino('${treino.id}')">Alterar</button>
              <button onclick="deletarTreino('${treino.id}')">Remover</button>
          </td>`;

          tbody.appendChild(linha);
  });
})
}

function editarTreino(id) {
    treinoAtual = id;

  const treino = treinos.find((r) => String(r.id) === String(id));

  document.getElementById("objetivo").value = treino.objetivo;
  document.getElementById("treino").value = treino.treino;
}
function deletarTreino(id) {
  fetch("http://localhost:3000/submit/" + id, {
      method: "DELETE",
  })
      .then(() => {
        treinos = treinos.filter((r) => r.id !== id);
        exibirTreinos();
      })
      .catch((error) => console.error("Error:", error));
}

// Evento para lidar com o envio do formulário
document
  .getElementById("myForm")
  .addEventListener("submit", function (event) {
      event.preventDefault();

      // Coleta os valores do formulário
      const treino = {
          objetivo: document.getElementById("objetivo").value,
          treino: document.getElementById("treino").value
      };
      if (treinoAtual) {
          // Se estiver editando
          fetch("http://localhost:3000/submit/" + treinoAtual, {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(treino),
          })
              .then((response) => response.json())
              .then((data) => {

                  const index = treinos.findIndex((r) => r.id === treinoAtual);
                  treinos [index] = data;
                  exibirTreinos();

                  // Limpa o formulário e reseta a reserva em edição
                  document.getElementById("myForm").reset();
                  treinoAtual = null;
              })
              .catch((error) => console.error("Error:", error));
      } else {
          // Se for um novo produto
          fetch("http://localhost:3000/submit", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(treino),
          })
              .then((response) => response.json())
              .then((data) => {
                  console.log(data);
                  treinos.push(data);
                  exibirTreinos();
                  document.getElementById("myForm").reset();
              })
              .catch((error) => console.error("Error:", error));
      }
  });
