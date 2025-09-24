// Função para gerar um ID único de 4 dígitos
function gerarIdPet() {
  const listaPets = JSON.parse(localStorage.getItem('pets')) || [];
  let novoId;

  do {
    novoId = Math.floor(1000 + Math.random() * 9000); // entre 1000 e 9999
  } while (listaPets.some(pet => pet.id === novoId));

  return novoId;
}

// Cadastro do pet
document.querySelector('#form-container').addEventListener('submit', function(event) {
  event.preventDefault();

  const imagemInput = document.getElementById('imagem');
  const arquivoImagem = imagemInput.files[0];

  if (!arquivoImagem) {
    alert('Por favor, selecione uma imagem do pet.');
    return;
  }

  const reader = new FileReader();

  reader.onload = function(e) {
    const pet = {
      id: gerarIdPet(),
      nome: document.getElementById("nome").value.trim(),
      localiza: document.getElementById("localizacao").value.trim(),
      raca: document.getElementById("tipo").value.trim(),
      sexo: document.getElementById("sexo").value.trim(),
      idade: document.getElementById("idade").value.trim(),
      data: document.getElementById("data").value.trim(),
      contato: document.getElementById("contato").value.trim(),
      whatsapp: document.getElementById("whatsapp").value.trim(),
      descricao: document.getElementById("descricao").value.trim(),
      imagem: e.target.result,
      status: "desaparecido"
    };

    const camposObrigatorios = [
      'nome', 'localiza', 'raca', 'sexo', 'idade',
      'data', 'contato', 'whatsapp', 'imagem'
    ];
    const camposVazios = camposObrigatorios.some(campo => !pet[campo] && pet[campo] !== 0);

    if (camposVazios) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const listaPets = JSON.parse(localStorage.getItem('pets')) || [];
    listaPets.push(pet);
    localStorage.setItem('pets', JSON.stringify(listaPets));

    alert(`Pet cadastrado com sucesso! Código de rastreio: ${pet.id}`);
    document.getElementById('form-container').reset();

    setTimeout(() => {
      window.location.href = "cadastrados.html";
    }, 1000);
  };

  reader.readAsDataURL(arquivoImagem);
});