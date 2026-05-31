 document.getElementById('action-btn').addEventListener('click', () => {
    const usuarioLogado = localStorage.getItem('usuarioLogado');

    if (!usuarioLogado) {
      localStorage.setItem("destinoAposLogin", "publicar.html");
      window.location.href = 'criar-conta.html';
    } else {
      window.location.href = 'publicar.html';
    }
  });


// 🐾 Exibe os pets com todos os dados relevantes
let debounceTimer;
function exibirPets() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    const listaPets = JSON.parse(localStorage.getItem('ocorrenciasPets')) || [];
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

   const statusTexto = pet.status ? pet.status.toUpperCase() : 'DESAPARECIDO';

const statusColor = pet.status === 'encontrado'
  ? '#4CAF50' // verde para encontrado
  : '#ff6600'; // laranja para desaparecido ou outro status

      card.innerHTML = `
        <img src="${pet.imagem}" alt="Imagem do pet" style="width:100%; height:auto; border-radius:5px;">
        <h3 style="margin: 5px 0;">${pet.nome}</h3>
        <div class="sumido">
          <strong>Status:</strong> <span style="color:${statusColor};"><strong>${statusTexto}</strong></span>
        </div>
           <p><strong>ID:</strong> ${pet.id}</p>
        <p><strong>Tipo:</strong> ${pet.raca}</p>
        <p><strong>Sexo:</strong> ${pet.sexo}</p>
        <p><strong>Última localização:</strong> ${pet.localiza}</p>
        <p><strong>Data:</strong> ${pet.data}</p>
        <p><strong>Contato:</strong> ${pet.contato}</p>
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

      container.appendChild(card);
    });
  }, 300);
}
window.addEventListener('DOMContentLoaded', exibirPets);