
document.addEventListener("DOMContentLoaded", exibirConsultas);

let consultas = [];

// Reserva em edição
let consultaAtual = null;

// Função para exibir reservas na tabela
function exibirConsultas() {
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = "";

  // Carrega reservas do servidor ao carregar a página
  fetch("http://localhost:3000/submit")
      .then((response) => response.json())
      .then((data) => {
        consultas = data;
          //Iterar pelas reservas e criar as linhas da tabela
          consultas.forEach((consulta) => {
          const linha = document.createElement("tr");
          linha.innerHTML = 
          `<td>${consulta.id}</td>
          <td>${consulta.nomepaciente}</td> 
          <td>${consulta.dataconsulta}</td>
          <td>
              <button onclick="editarConsulta('${consulta.id}')">Alterar</button>
              <button onclick="deletarConsulta('${consulta.id}')">Remover</button>
          </td>`;

          tbody.appendChild(linha);
  });
})
}

function editarConsulta(id) {
    consultaAtual = id;

  const consulta = consultas.find((r) => String(r.id) === String(id));

  document.getElementById("nomepaciente").value = consulta.nomepaciente;
  document.getElementById("dataconsulta").value = consulta.dataconsulta;
}
function deletarConsulta(id) {
  fetch("http://localhost:3000/submit/" + id, {
      method: "DELETE",
  })
      .then(() => {
        consultas = consultas.filter((r) => r.id !== id);
          exibirConsultas();
      })
      .catch((error) => console.error("Error:", error));
}

// Evento para lidar com o envio do formulário
document
  .getElementById("myForm")
  .addEventListener("submit", function (event) {
      event.preventDefault();

      // Coleta os valores do formulário
      const consulta = {
          nomepaciente: document.getElementById("nomepaciente").value,
          dataconsulta: document.getElementById("dataconsulta").value
      };
      if (consultaAtual) {
          // Se estiver editando
          fetch("http://localhost:3000/submit/" + consultaAtual, {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(consulta),
          })
              .then((response) => response.json())
              .then((data) => {

                  const index = consultas.findIndex((r) => r.id === consultaAtual);
                  consultas[index] = data;
                  exibirConsultas();

                  // Limpa o formulário e reseta a reserva em edição
                  document.getElementById("myForm").reset();
                  consultaAtual = null;
              })
              .catch((error) => console.error("Error:", error));
      } else {
          // Se for um novo produto
          fetch("http://localhost:3000/submit", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(consulta),
          })
              .then((response) => response.json())
              .then((data) => {
                  console.log(data);
                  consultas.push(data);
                  exibirConsultas();
                  document.getElementById("myForm").reset();
              })
              .catch((error) => console.error("Error:", error));
      }
  });
