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
      id: Date.now().toString().slice(-6), // Gera ID unico
      nome: document.getElementById('nome').value,
      localiza: document.getElementById('localizacao').value,
      raca: document.getElementById('tipo').value,
      sexo: document.getElementById('sexo').value,
      idade: document.getElementById('idade').value.trim(), // ✅ corrigido
      data: document.getElementById('data').value,
      contato: document.getElementById('contato').value,
      whatsapp: document.getElementById('whatsapp').value,
      descricao: document.getElementById('descricao').value,
      imagem: e.target.result
    };

    // Validação simples (exceto descrição, que é opcional)
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

    alert('Pet cadastrado com sucesso!');
    document.getElementById('form-container').reset();

    setTimeout(() => {
      window.location.href = "cadastrados.html";
    }, 1000);
  };

  reader.readAsDataURL(arquivoImagem);
});