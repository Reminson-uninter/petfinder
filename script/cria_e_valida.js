// Cadastro de ONG
document.getElementById('cadastroOng').addEventListener('submit', function(event) {
  event.preventDefault();
  const form = event.target;
  const dados = new FormData(form);
  const novaOng = {};
  dados.forEach((value, key) => novaOng[key] = value);

  if (novaOng.nomeOng && novaOng.emailOng && novaOng.senhaOng && novaOng.cidade) {
    novaOng.id = 'ong-' + Date.now();
    const todasOngs = JSON.parse(localStorage.getItem('todasOngs')) || [];
    todasOngs.push(novaOng);
    localStorage.setItem('todasOngs', JSON.stringify(todasOngs));
    alert('ONG cadastrada com sucesso!');
    form.reset();
  } else {
    alert('Preencha todos os campos.');
  }
});

// Login de ONG
document.getElementById('loginOng').addEventListener('submit', function(event) {
  event.preventDefault();
  const form = event.target;
  const email = form.emailLogin.value;
  const senha = form.senhaLogin.value;

  const todasOngs = JSON.parse(localStorage.getItem('todasOngs')) || [];
  const ongLogada = todasOngs.find(ong => ong.emailOng === email && ong.senhaOng === senha);

  if (!ongLogada) {
    alert('Email ou senha incorretos.');
    return;
  }

  localStorage.setItem('ongLogada', JSON.stringify(ongLogada));
  document.location.href = 'painel_ong.html';
});