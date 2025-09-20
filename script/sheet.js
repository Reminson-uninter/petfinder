// Seleciona o formulário pelo ID e adiciona um ouvinte para o evento de envio
document.getElementById("meuFormulario").addEventListener("submit", function(e) {
  
  // Impede o comportamento padrão do formulário (recarregar a página)
  e.preventDefault();

  // Cria um objeto com os dados preenchidos pelo usuário no formulário
  const formData = {
    nome: e.target.nome.value,       // Captura o valor do campo "nome"
    email: e.target.email.value,     // Captura o valor do campo "email"
    mensagem: e.target.mensagem.value // Captura o valor do campo "mensagem"
  };

  // Envia os dados para a API do SheetMonkey usando o método POST
  fetch("https://api.sheetmonkey.io/form/ozqbywstCFtqeGFHNboP5p", {
    method: "POST",                         // Define o método HTTP como POST
    body: JSON.stringify(formData),        // Converte os dados para JSON
    headers: {
      "Content-Type": "application/json"   // Informa que o corpo da requisição está em formato JSON
    }
  })

  // Quando a resposta chegar, converte para texto
  .then(response => response.text())

  // Exibe a resposta em um alerta (pode ser uma mensagem de sucesso)
  .then(data => alert(data))

  // Se ocorrer algum erro, exibe no console
  .catch(error => console.error("Erro:", error));
});