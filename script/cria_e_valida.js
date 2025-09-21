  document.getElementById('loginOng').addEventListener('submit', function(event) {
    event.preventDefault();
    const formLogin = event.target;
    const emailLogin = formLogin.emailLogin.value; 
    const senhaLogin = formLogin.senhaLogin.value;
    const ongCadastrada = JSON.parse(localStorage.getItem('ong'));
    if (!ongCadastrada) {
      alert('Nenhuma ONG cadastrada. Por favor, cadastre-se primeiro.');
      return;
    } 
    if (emailLogin !== ongCadastrada.emailOng || senhaLogin !== ongCadastrada.senhaOng) {
      alert('E-mail ou senha incorretos. Tente novamente.');
      return;
      
    }
    document.location.href = 'painel_ong.html';
    alert('Login realizado com sucesso!');
  });



//cadastro ong
document.getElementById('cadastroOng').addEventListener('submit', function(event) {
    event.preventDefault();
    const formOng = event.target;
    const dados = new FormData(formOng);
    const dadosObj = {}
    dados.forEach((value, key) => {
      dadosObj[key] = value;
    });
   
  
 const { nomeOng, emailOng, senhaOng, cidade, localidades } = dadosObj;

if (nomeOng && emailOng && senhaOng && cidade && localidades) {
  localStorage.setItem('ong', JSON.stringify(dadosObj));
  alert('ONG cadastrada com sucesso!');
  formOng.reset();
} else {
  alert('Por favor, preencha todos os campos.');
}
  });