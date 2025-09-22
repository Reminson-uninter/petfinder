document.getElementById('cadastroPet').addEventListener('submit', function(event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  const dados = new FormData(event.target);
  const dadosObj = {};

  // Campos de texto
  dadosObj.nomePet = dados.get('nomePet');
  dadosObj.idadePet = dados.get('idadePet');
  dadosObj.tipoPet = dados.get('tipoPet');
  dadosObj.racaPet = dados.get('racaPet');
  dadosObj.sexoPet = dados.get('sexoPet');
  dadosObj.portePet = dados.get('portePet');
  dadosObj.descricaoPet = dados.get('descricaoPet');

  // Checkboxes como booleanos
  dadosObj.vacinaPet = dados.get('vacinaPet') ? true : false;
  dadosObj.castradoPet = dados.get('castradoPet') ? true : false;

  // Verifica se todos os campos obrigatórios estão preenchidos
  if (
    !dadosObj.nomePet ||
    !dadosObj.idadePet ||
    !dadosObj.tipoPet ||
    !dadosObj.racaPet ||
    !dadosObj.sexoPet ||
    !dadosObj.portePet ||
    !dados.get('fotoPet') || // arquivo precisa existir
    !dadosObj.descricaoPet
  ) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }

  // Converte a imagem para base64 antes de salvar
  const arquivoFoto = dados.get('fotoPet');
  const reader = new FileReader();

  reader.onload = function(e) {
    dadosObj.fotoPet = e.target.result; // base64 da imagem

    // Salva no localStorage (acumulando cadastros)
    const pets = JSON.parse(localStorage.getItem('dadosPet')) || [];
    pets.push(dadosObj);
    localStorage.setItem('dadosPet', JSON.stringify(pets));

    // Feedback visual
    document.getElementById('mensagem-sucesso').style.display = 'block';

    // Limpa o formulário
    event.target.reset();

    console.log('Pet cadastrado:', dadosObj);
  };

  reader.readAsDataURL(arquivoFoto); // inicia leitura da imagem
});

