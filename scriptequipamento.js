
document.addEventListener("DOMContentLoaded", exibirEquipamentos);

let equipamentos = [];

// Reserva em edição
let equipamentoAtual = null;

// Função para exibir reservas na tabela
function exibirEquipamentos() {
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = "";

  // Carrega reservas do servidor ao carregar a página
  fetch("http://localhost:3000/submit")
      .then((response) => response.json())
      .then((data) => {
        equipamentos = data;
          //Iterar pelas reservas e criar as linhas da tabela
          equipamentos.forEach((equipamento) => {
          const linha = document.createElement("tr");
          linha.innerHTML = 
          `<td>${equipamento.id}</td>
          <td>${equipamento.nomeequipamento}</td>
          <td>${equipamento.grupomuscular}</td>
          <td>
              <button onclick="editarEquipamento('${equipamento.id}')">Alterar</button>
              <button onclick="deletarEquipamento('${equipamento.id}')">Remover</button>
          </td>`;

          tbody.appendChild(linha);
  });
})
}

function editarEquipamento(id) {
    equipamentoAtual = id;

  const equipamento = equipamentos.find((r) => String(r.id) === String(id));

  document.getElementById("nomeequipamento").value = equipamento.nomeequipamento;
  document.getElementById("grupomuscular").value = equipamento.grupomuscular;
}
function deletarEquipamento(id) {
  fetch("http://localhost:3000/submit/" + id, {
      method: "DELETE",
  })
      .then(() => {
        equipamentos = equipamentos.filter((r) => r.id !== id);
          exibirEquipamentos();
      })
      .catch((error) => console.error("Error:", error));
}

// Evento para lidar com o envio do formulário
document
  .getElementById("myForm")
  .addEventListener("submit", function (event) {
      event.preventDefault();

      // Coleta os valores do formulário
      const equipamento = {
          nomeequipamento: document.getElementById("nomeequipamento").value,
          grupomuscular: document.getElementById("grupomuscular").value
      };
      if (equipamentoAtual) {
          // Se estiver editando
          fetch("http://localhost:3000/submit/" + equipamentoAtual, {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(equipamento),
          })
              .then((response) => response.json())
              .then((data) => {

                  const index = equipamentos.findIndex((r) => r.id === equipamentoAtual);
                  equipamentos[index] = data;
                  exibirEquipamentos();

                  // Limpa o formulário e reseta a reserva em edição
                  document.getElementById("myForm").reset();
                  equipamentoAtual = null;
              })
              .catch((error) => console.error("Error:", error));
      } else {
          // Se for um novo produto
          fetch("http://localhost:3000/submit", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(equipamento),
          })
              .then((response) => response.json())
              .then((data) => {
                  console.log(data);
                  equipamentos.push(data);
                  exibirEquipamentos();
                  document.getElementById("myForm").reset();
              })
              .catch((error) => console.error("Error:", error));
      }
  });
