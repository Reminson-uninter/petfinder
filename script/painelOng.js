// Verifica ONG logada
const ongLogada = JSON.parse(localStorage.getItem('ongLogada'));
if (!ongLogada) {
  alert('Nenhuma ONG logada. Faça login primeiro.');
  window.location.href = 'index.html';
}

// Carrega dados da ONG logada
const dadosPorOng = JSON.parse(localStorage.getItem('dadosPorOng')) || {};
const dadosDaOng = dadosPorOng[ongLogada.id] || { pets: [] };

// Exibe pets ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
  exibirPets(dadosDaOng.pets);
});

// Cadastro de pet
document.getElementById('cadastroPet').addEventListener('submit', function(event) {
  event.preventDefault();
  const dados = new FormData(event.target);
  const arquivoFoto = dados.get('fotoPet');

  if (!arquivoFoto || !arquivoFoto.type.startsWith('image/')) {
    alert('Por favor, envie uma imagem válida do pet.');
    return;
  }

  const dadosObj = {
    id: 'pet-' + Date.now(),
    nomePet: dados.get('nomePet'),
    idadePet: dados.get('idadePet'),
    tipoPet: dados.get('tipoPet'),
    racaPet: dados.get('racaPet'),
    sexoPet: dados.get('sexoPet'),
    portePet: dados.get('portePet'),
    descricaoPet: dados.get('descricaoPet'),
    vacinaPet: dados.get('vacinaPet') ? true : false,
    castradoPet: dados.get('castradoPet') ? true : false
  };

  for (let key in dadosObj) {
    if (dadosObj[key] === '' || dadosObj[key] === null) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    dadosObj.fotoPet = e.target.result;
    dadosDaOng.pets.push(dadosObj);
    dadosPorOng[ongLogada.id] = dadosDaOng;
    localStorage.setItem('dadosPorOng', JSON.stringify(dadosPorOng));

    document.getElementById('mensagem-sucesso').style.display = 'block';
    event.target.reset();
    exibirPets(dadosDaOng.pets);
  };

  reader.onerror = function() {
    alert('Erro ao carregar a imagem. Tente novamente.');
  };

  reader.readAsDataURL(arquivoFoto);
});

// Filtros
document.getElementById('btnFiltrar').addEventListener('click', () => {
  const tipo = document.getElementById('filtroTipo').value;
  const sexo = document.getElementById('filtroSexo').value;
  const porte = document.getElementById('filtroPorte').value;

  const filtrados = dadosDaOng.pets.filter(pet => {
    const tipoOk = !tipo || pet.tipoPet.toLowerCase() === tipo.toLowerCase();
    const sexoOk = !sexo || pet.sexoPet === sexo;
    const porteOk = !porte || pet.portePet === porte;
    return tipoOk && sexoOk && porteOk;
  });

  exibirPets(filtrados);
});

document.getElementById('btnLimpar').addEventListener('click', () => {
  document.getElementById('filtroTipo').value = '';
  document.getElementById('filtroSexo').value = '';
  document.getElementById('filtroPorte').value = '';
  exibirPets(dadosDaOng.pets);
});

// Exibe os pets cadastrados
function exibirPets(pets) {
  const galeria = document.getElementById('galeriaPets');
  galeria.innerHTML = '';

  if (pets.length === 0) {
    galeria.innerHTML = '<p>Nenhum pet cadastrado ainda.</p>';
    return;
  }

  pets.forEach(pet => {
    const card = document.createElement('div');
    card.classList.add('pet-card');
    card.style.width = '220px';
    card.style.margin = '10px';
    card.style.padding = '10px';
    card.style.border = '1px solid #ccc';
    card.style.borderRadius = '8px';
    card.style.boxShadow = '0 0 6px rgba(0,0,0,0.1)';
    card.style.display = 'inline-block';
    card.style.verticalAlign = 'top';
    card.style.backgroundColor = '#fff';
    card.style.textAlign = 'center';

    const img = document.createElement('img');
    img.src = pet.fotoPet;
    img.alt = `Foto de ${pet.nomePet}`;
    img.style.width = '100%';
    img.style.height = '140px';
    img.style.objectFit = 'cover';
    img.style.borderRadius = '6px';

    const info = document.createElement('div');
    info.innerHTML = `
      <p><strong>ID:</strong> ${pet.id}</p>
      <h3>${pet.nomePet}</h3>
      <p><strong>Tipo:</strong> ${pet.tipoPet}</p>
      <p><strong>Raça:</strong> ${pet.racaPet}</p>
      <p><strong>Sexo:</strong> ${pet.sexoPet}</p>
      <p><strong>Porte:</strong> ${pet.portePet}</p>
      <p><strong>Vacinado:</strong> ${pet.vacinaPet ? 'Sim' : 'Não'}</p>
      <p><strong>Castrado:</strong> ${pet.castradoPet ? 'Sim' : 'Não'}</p>
    `;

    const btnEditar = document.createElement('button');
    btnEditar.textContent = '✏️ Editar';
    btnEditar.style.margin = '5px';
    btnEditar.style.backgroundColor = '#4CAF50';
    btnEditar.style.color = '#fff';
    btnEditar.style.border = 'none';
    btnEditar.style.borderRadius = '4px';
    btnEditar.style.padding = '6px 10px';
    btnEditar.onclick = () => editarPet(pet.id);

    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = '🗑️ Excluir';
    btnExcluir.style.margin = '5px';
    btnExcluir.style.backgroundColor = '#f44336';
    btnExcluir.style.color = '#fff';
    btnExcluir.style.border = 'none';
    btnExcluir.style.borderRadius = '4px';
    btnExcluir.style.padding = '6px 10px';
    btnExcluir.onclick = () => excluirPet(pet.id);

    card.appendChild(img);
    card.appendChild(info);
    card.appendChild(btnEditar);
    card.appendChild(btnExcluir);
    galeria.appendChild(card);
  });
}

// Excluir pet
function excluirPet(id) {
  dadosDaOng.pets = dadosDaOng.pets.filter(pet => pet.id !== id);
  dadosPorOng[ongLogada.id] = dadosDaOng;
  localStorage.setItem('dadosPorOng', JSON.stringify(dadosPorOng));
  exibirPets(dadosDaOng.pets);
}

// Editar pet
function editarPet(id) {
  const pet = dadosDaOng.pets.find(p => p.id === id);
  if (!pet) return;

  localStorage.setItem('petEditando', JSON.stringify(pet));
  localStorage.setItem('ongEditando', ongLogada.id);
  window.location.href = 'editarAdotado.html';
}