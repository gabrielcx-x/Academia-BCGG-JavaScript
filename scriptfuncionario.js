
document.addEventListener("DOMContentLoaded", exibirFuncionarios);

let funcionarios = [];

// Reserva em edição
let funcionarioAtual = null;

// Função para exibir reservas na tabela
function exibirFuncionarios() {
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = "";

  // Carrega reservas do servidor ao carregar a página
  fetch("http://localhost:3000/submit")
      .then((response) => response.json())
      .then((data) => {
        funcionarios = data;
          //Iterar pelas reservas e criar as linhas da tabela
          funcionarios.forEach((funcionario) => {
          const linha = document.createElement("tr");
          linha.innerHTML = 
          `<td>${funcionario.id}</td>
          <td>${funcionario.nomefuncionario}</td>
          <td>${funcionario.cargo}</td>
          <td>
              <button onclick="editarFuncionario('${funcionario.id}')">Alterar</button>
              <button onclick="deletarFuncionario('${funcionario.id}')">Remover</button>
          </td>`;

          tbody.appendChild(linha);
  });
})
}

function editarFuncionario(id) {
    funcionarioAtual = id;

  const funcionario = funcionarios.find((r) => String(r.id) === String(id));

  document.getElementById("nomefuncionario").value = funcionario.nomefuncionario;
  document.getElementById("cargo").value = funcionario.cargo;
}
function deletarFuncionario(id) {
  fetch("http://localhost:3000/submit/" + id, {
      method: "DELETE",
  })
      .then(() => {
        funcionarios = funcionarios.filter((r) => r.id !== id);
          exibirFuncionarios();
      })
      .catch((error) => console.error("Error:", error));
}

// Evento para lidar com o envio do formulário
document
  .getElementById("myForm")
  .addEventListener("submit", function (event) {
      event.preventDefault();

      // Coleta os valores do formulário
      const funcionario = {
          nomefuncionario: document.getElementById("nomefuncionario").value,
          cargo: document.getElementById("cargo").value
      };
      if (funcionarioAtual) {
          // Se estiver editando
          fetch("http://localhost:3000/submit/" + funcionarioAtual, {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(funcionario),
          })
              .then((response) => response.json())
              .then((data) => {

                  const index = funcionarios.findIndex((r) => r.id === funcionarioAtual);
                  funcionarios[index] = data;
                  exibirFuncionarios();

                  // Limpa o formulário e reseta a reserva em edição
                  document.getElementById("myForm").reset();
                  funcionarioAtual = null;
              })
              .catch((error) => console.error("Error:", error));
      } else {
          // Se for um novo produto
          fetch("http://localhost:3000/submit", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(funcionario),
          })
              .then((response) => response.json())
              .then((data) => {
                  console.log(data);
                  funcionarios.push(data);
                  exibirFuncionarios();
                  document.getElementById("myForm").reset();
              })
              .catch((error) => console.error("Error:", error));
      }
  });
