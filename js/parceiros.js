const galeria = document.querySelector('.parceiros')
const criaImagem = document.createElement('img')
criaImagem.src ='assets/img/pelegrinos.jpg'
criaImagem.alt = 'Imagem de pelegrinos';
criaImagem.style.width = '150px'; // Estilização opcional
criaImagem.style.borderRadius = '10px';
criaImagem.classList.add('pelegrinos-vet')
galeria.appendChild(criaImagem);


const criaImg = document.createElement('img')
criaImg.src ='assets/img/AnjosDajuda.jpg'
criaImg.alt = 'Imagem de pelegrinos';
criaImg.style.width = '150px'; // Estilização opcional
criaImg.style.borderRadius = '10px';
criaImg.style.border ='1px solid'

criaImg.classList.add('anjosDajuda')
galeria.appendChild(criaImg);


//Direciona para o site Anjos D'juda
function anjosDjuda(){
  window.location.href ='https://www.anjosdajuda.org/nossos-pets'
}
criaImg.addEventListener('click', () =>{
  anjosDjuda()
})



function carregaSite(){
   window.location.href='https://www.instagram.com/peregrinosvet/'

 }




criaImagem.addEventListener('click',() => {
    carregaSite()
})