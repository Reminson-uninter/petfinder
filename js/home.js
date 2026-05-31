// js/home.js

const btnMobile = document.querySelector('#btn-mobile');
const navMenu = document.querySelector('#nav-menu');

btnMobile.addEventListener('click', toggleMenu);

function toggleMenu() {

  navMenu.classList.toggle('active');

  const active = navMenu.classList.contains('active');

  btnMobile.setAttribute('aria-expanded', active);

}

// BOTÃO CADASTRAR
const actionBtn = document.querySelector('#action-btn');

actionBtn.addEventListener('click', () => {

  const usuarioLogado = localStorage.getItem('usuarioLogado');

  if (!usuarioLogado) {

    localStorage.setItem(
      'destinoAposLogin',
      'publicar.html'
    );

    window.location.href = 'criar-conta.html';

    return;
  }

  window.location.href = 'publicar.html';

});

// PETS
function exibirPets() {

  const listaPets =
    JSON.parse(localStorage.getItem('pets')) || [];

  const container =
    document.querySelector('.container-cards');

  container.innerHTML = '';

  if (listaPets.length === 0) {

    container.innerHTML =
      '<p>Nenhum pet cadastrado.</p>';

    return;
  }

  listaPets.forEach((pet) => {

    const card = criarCardPet(pet);

    container.appendChild(card);

  });

}

// COMPONENTE CARD
function criarCardPet(pet) {

  const card = document.createElement('article');

  card.classList.add('pet-card');

  const statusTexto =
    pet.status?.toUpperCase() || 'DESAPARECIDO';

  const statusColor =
    pet.status === 'encontrado'
      ? '#4CAF50'
      : '#ff6600';

  const whatsappHTML = pet.whatsapp
    ? `
      <a
        href="https://wa.me/55${pet.whatsapp.replace(/\D/g, '')}"
        target="_blank"
        class="whatsapp-link"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
        />
        Falar no WhatsApp
      </a>
    `
    : '';

  card.innerHTML = `
    <img
      src="${pet.imagem}"
      alt="${pet.nome}"
      class="pet-image"
    >

    <h3>${pet.nome}</h3>

    <p>
      <strong>Status:</strong>

      <span style="color:${statusColor}">
        <strong>${statusTexto}</strong>
      </span>
    </p>

    <p><strong>ID:</strong> ${pet.id}</p>

    <p><strong>Raça:</strong> ${pet.raca}</p>

    <p><strong>Sexo:</strong> ${pet.sexo}</p>

    <p>
      <strong>Última localização:</strong>
      ${pet.localiza}
    </p>

    <p><strong>Data:</strong> ${pet.data}</p>

    <p><strong>Contato:</strong> ${pet.contato}</p>

    ${whatsappHTML}

    ${
      pet.recompensa
        ? `
          <p class="recompensa">
            🎁 ${pet.recompensa}
          </p>
        `
        : ''
    }

    <p>
      <strong>Descrição:</strong>
      ${pet.descricao}
    </p>

    <button class="btn-saiba-mais">
      Saiba Mais
    </button>
  `;

  const btnSaibaMais =
    card.querySelector('.btn-saiba-mais');

  btnSaibaMais.addEventListener('click', () => {

    window.location.href =
      `detalhes.html?id=${pet.id}`;

  });

  return card;

}

window.addEventListener(
  'DOMContentLoaded',
  exibirPets
);