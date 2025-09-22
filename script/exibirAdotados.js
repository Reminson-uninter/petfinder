// Menu responsivo
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('nav-menu').classList.toggle('active');
});

// Recupera os pets cadastrados
const dadosSalvos = JSON.parse(localStorage.getItem('dadosPet')) || [];

// Função para exibir os pets
function exibir(pets) {
  const galeria = document.querySelector('.galeria-adocao');
  galeria.innerHTML = '<h1>Adoção Responsável</h1><div class="gallery"></div>';
  const container = galeria.querySelector('.gallery');

  if (pets.length === 0) {
    container.innerHTML = '<p>Nenhum pet encontrado com os filtros selecionados.</p>';
    return;
  }

  pets.forEach(pet => {
    const card = document.createElement('div');
    card.classList.add('animal-card');

    const img = document.createElement('img');
    img.src = pet.fotoPet || 'assets/img/default-pet.png';
    img.alt = `Foto de ${pet.nomePet}`;
    img.classList.add('foto-pet');

    const info = document.createElement('div');
    info.classList.add('info');
    info.innerHTML = `
      <h3><strong>Nome:</strong> ${pet.nomePet}</h3>
      <p><strong>Idade:</strong> ${pet.idadePet}</p>
      <p><strong>Tipo:</strong> ${pet.tipoPet}</p>
      <p><strong>Raça:</strong> ${pet.racaPet}</p>
      <p><strong>Sexo:</strong> ${pet.sexoPet}</p>
      <p><strong>Porte:</strong> ${pet.portePet}</p>
      <p><strong>Vacinado:</strong> ${pet.vacinaPet ? 'Sim' : 'Não'}</p>
      <p><strong>Castrado:</strong> ${pet.castradoPet ? 'Sim' : 'Não'}</p>
      <p><strong>Descrição:</strong> ${pet.descricaoPet}</p>
    `;

    const button = document.createElement('button');
    button.classList.add('adopt-btn');
    button.textContent = 'Quero adotar';
    button.addEventListener('click', () => {
      localStorage.setItem('petSelecionado', JSON.stringify(pet));
      window.location.href = 'adotar.html';
    });

    info.appendChild(button);
    card.appendChild(img);
    card.appendChild(info);
    container.appendChild(card);
  });
}

// Filtro por idade e sexo
document.getElementById('btn-filtrar').addEventListener('click', () => {
  const idadeMax = parseInt(document.getElementById('filtro-idade').value);
  const sexo = document.getElementById('filtro-sexo').value;

  const filtrados = dadosSalvos.filter(pet => {
    const idadeNum = pet.idadePet ? parseInt(pet.idadePet.replace(/\D/g, '')) : NaN;
    const idadeOk = isNaN(idadeMax) || idadeNum <= idadeMax;
    const sexoOk = !sexo || pet.sexoPet === sexo;
    return idadeOk && sexoOk;
  });

  exibir(filtrados);
});

// Exibe todos ao carregar
exibir(dadosSalvos);