// Seleciona todos os links do menu
const menuLinks = document.querySelectorAll('#menu a');

menuLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault(); // evita o comportamento padrão

    // pega o destino do link (ex: #about)
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    // rolagem animada
    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    // opcional: destacar o link ativo
    menuLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});
