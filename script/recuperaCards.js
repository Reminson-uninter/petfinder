function inicializarStatusDosPets() {
  const listaPets = JSON.parse(localStorage.getItem('pets')) || [];
  const listaAtualizada = listaPets.map(pet => {
    if (!pet.status) pet.status = "desaparecido";
    return pet;
  });
  localStorage.setItem('pets', JSON.stringify(listaAtualizada));
}

let debounceTimer;
function exibirPets() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    const listaPets = JSON.parse(localStorage.getItem('pets')) || [];
    const container = document.querySelector('.container-cards');
    container.innerHTML = '';

    if (listaPets.length === 0) {
      container.innerHTML = '<p>Nenhum pet cadastrado.</p>';
      return;
    }

    listaPets.forEach(pet => {
      const card = document.createElement('div');
      card.className = 'pet-card';
      card.style.maxWidth = '300px';
      card.style.border = '1px solid #ccc';
      card.style.borderRadius = '8px';
      card.style.padding = '10px';
      card.style.margin = '10px';
      card.style.overflow = 'hidden';
      card.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';

      const statusColor = pet.status === 'encontrado' ? 'green' : '#ff6600';
      const statusTexto = pet.status ? pet.status.toUpperCase() : 'DESAPARECIDO';

      card.innerHTML = `
        <img src="${pet.imagem}" alt="Imagem do pet" style="width:100%; height:auto; border-radius:5px;">
        <h3 style="margin: 5px 0;">${pet.nome}</h3>
        <div class="sumido">
          <strong>Status:</strong> <span style="color:${statusColor};"><strong>${statusTexto}</strong></span>
        </div>
        <p><strong>Raça:</strong> ${pet.raca}</p>
        <p><strong>Última localização:</strong> ${pet.localiza}</p>
        <p><strong>Data:</strong> ${pet.data}</p>
        <p><strong>Contato:</strong> ${pet.contato}</p>
        <p>
          <a href="https://wa.me/55${pet.whatsapp?.replace(/\D/g, '')}" target="_blank" style="text-decoration: none; color: #25D366;">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" style="width:20px; vertical-align:middle; margin-right:5px;">
            Falar no WhatsApp
          </a>
        </p>
        ${pet.recompensa ? `<p style="color: green;"><strong>🎁 Recompensa:</strong> ${pet.recompensa}</p>` : ''}
        <p><strong>Descrição:</strong> ${pet.descricao}</p>
        <div class="actions" style="display: flex; gap: 5px; margin-top: 10px;"></div>
      `;

      const actionsDiv = card.querySelector('.actions');

      const saibaMaisBtn = document.createElement('button');
      saibaMaisBtn.textContent = 'Saiba Mais';
      saibaMaisBtn.className = 'btn-saiba-mais';
      saibaMaisBtn.style.flex = '1';
      saibaMaisBtn.addEventListener('click', () => {
        window.location.href = `detalhes.html?id=${pet.id}`;
      });
      actionsDiv.appendChild(saibaMaisBtn);

      if (pet.status !== 'encontrado') {
        const encontrouBtn = document.createElement('button');
        encontrouBtn.textContent = 'ENCONTREI';
        encontrouBtn.className = 'btn-encontrou';
        encontrouBtn.style.flex = '1';
        encontrouBtn.style.backgroundColor = '#4CAF50';
        encontrouBtn.style.color = '#fff';

        encontrouBtn.addEventListener('click', () => {
          autenticarAcao('encontrei', pet.id);
        });

        actionsDiv.appendChild(encontrouBtn);
      }

      container.appendChild(card);
    });
  }, 300);
}

function autenticarAcao(acao, id) {
  const usuarioSalvo = JSON.parse(localStorage.getItem('usuarioLogado'));
  const listaPets = JSON.parse(localStorage.getItem('pets')) || [];

  const usuario = prompt("Digite seu usuário:").trim().toLowerCase();
  const senha = prompt("Digite sua senha:").trim();

  if (
    !usuarioSalvo ||
    !usuarioSalvo.usuario ||
    !usuarioSalvo.senha ||
    usuario !== usuarioSalvo.usuario.toLowerCase() ||
    senha !== usuarioSalvo.senha
  ) {
    alert("Usuário ou senha inválidos.");
    return;
  }

  if (acao === 'editar') {
    localStorage.setItem('petEditId', id);
    window.location.href = 'editar.html';
  } else if (acao === 'excluir') {
    if (!confirm("Tem certeza que deseja excluir este pet?")) return;
    const novaLista = listaPets.filter(p => p.id.toString() !== id.toString());
    localStorage.setItem('pets', JSON.stringify(novaLista));
    alert("Pet excluído com sucesso!");
    exibirPets();
  } else if (acao === 'encontrei') {
    marcarComoEncontrado(id);
  }
}

function marcarComoEncontrado(id) {
  const listaPets = JSON.parse(localStorage.getItem('pets')) || [];
  const index = listaPets.findIndex(p => p.id === id);
  if (index === -1) {
    alert("Pet não encontrado.");
    return;
  }

  listaPets[index].status = "encontrado";
  localStorage.setItem('pets', JSON.stringify(listaPets));
  alert("Status atualizado para ENCONTRADO!");
  exibirPets(); // atualiza a lista local
}

window.addEventListener('DOMContentLoaded', () => {
  inicializarStatusDosPets();
  exibirPets();
});