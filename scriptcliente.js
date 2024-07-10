
document.addEventListener("DOMContentLoaded", exibirClientes);

let clientes = [];

// Reserva em edição
let clienteAtual = null;

// Função para exibir reservas na tabela
function exibirClientes() {
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = "";

  // Carrega reservas do servidor ao carregar a página
  fetch("http://localhost:3000/submit")
      .then((response) => response.json())
      .then((data) => {
        clientes = data;
          //Iterar pelas reservas e criar as linhas da tabela
          clientes.forEach((cliente) => {
          const linha = document.createElement("tr");
          linha.innerHTML = 
          `<td>${cliente.id}</td>
          <td>${cliente.nomecliente}</td>
          <td>${cliente.documentocliente}</td>
          <td>
              <button onclick="editarCliente('${cliente.id}')">Alterar</button>
              <button onclick="deletarCliente('${cliente.id}')">Remover</button>
          </td>`;

          tbody.appendChild(linha);
  });
})
}

function editarCliente(id) {
    clienteAtual = id;

  const cliente = clientes.find((r) => String(r.id) === String(id));

  document.getElementById("nomecliente").value = cliente.nomecliente;
  document.getElementById("documentocliente").value = cliente.documentocliente;
}
function deletarCliente(id) {
  fetch("http://localhost:3000/submit/" + id, {
      method: "DELETE",
  })
      .then(() => {
        clientes = clientes.filter((r) => r.id !== id);
          exibirClientes();
      })
      .catch((error) => console.error("Error:", error));
}

// Evento para lidar com o envio do formulário
document
  .getElementById("myForm")
  .addEventListener("submit", function (event) {
      event.preventDefault();

      // Coleta os valores do formulário
      const cliente = {
          nomecliente: document.getElementById("nomecliente").value,
          documentocliente: document.getElementById("documentocliente").value
      };
      if (clienteAtual) {
          // Se estiver editando
          fetch("http://localhost:3000/submit/" + clienteAtual, {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(cliente),
          })
              .then((response) => response.json())
              .then((data) => {

                  const index = clientes.findIndex((r) => r.id === clienteAtual);
                  clientes[index] = data;
                  exibirClientes();

                  // Limpa o formulário e reseta a reserva em edição
                  document.getElementById("myForm").reset();
                  clienteAtual = null;
              })
              .catch((error) => console.error("Error:", error));
      } else {
          // Se for um novo produto
          fetch("http://localhost:3000/submit", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(cliente),
          })
              .then((response) => response.json())
              .then((data) => {
                  console.log(data);
                  clientes.push(data);
                  exibirClientes();
                  document.getElementById("myForm").reset();
              })
              .catch((error) => console.error("Error:", error));
      }
  });
