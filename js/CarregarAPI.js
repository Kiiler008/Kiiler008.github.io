let paginaAtual = 1;
const teste = [];
// Função para obter os dados da API
const getDadosAPI = async function(page) {
   const url = `https://rickandmortyapi.com/api/character/?page=${page}`;
   const response = await fetch(url);
   const dados = await response.json();
   teste.push(dados)

   let dadosApi = 0;

   for (let i = 0; i < teste.length; i++) {
      const dadosLoop = await teste[i].results;
      dadosApi = dadosLoop;
      displayResults(dadosApi);
  }
}
// Função para exibir os resultados na página HTML
const criarElemento = (tag, classe, texto) => {
   const elemento = document.createElement(tag);
   if (classe) elemento.classList.add(classe);
   if (texto) elemento.textContent = texto;
   return elemento;
}
// Itera sobre os resultados e os exibe na página
const displayResults = function(results) {
   const divCardmoldura = document.getElementById('CardsRM');
   divCardmoldura.innerHTML = ''; 

   results.forEach(function(result) {
      const divCards = document.createElement('div');
      divCards.classList.add('Cards');

      const h2NomeP = criarElemento('h2', 'Nome_Personagem', result.name);
      const divtextos = criarElemento('div','divtextos');
         const MFpersonagem= criarElemento('span','MFpersonagem','Gênero:'+ result.gender)
         const PEspecie = criarElemento('span', 'Origem','Espécie:'+ result.species);
         const POrigem = criarElemento('span', 'POrigem','Origem:'+ result.origin.name);
      const img = criarElemento('img', 'ImagemP');
      img.src = result.image;
      const spanStatusVM = criarElemento('span', 'StatusVM','Status:'+ result.status);

      divCardmoldura.appendChild(divCards);
      divCards.append(h2NomeP, img, divtextos);
      divtextos.append(PEspecie,MFpersonagem,spanStatusVM,POrigem);
   });
}
// Função para realizar uma pesquisa na API com base no nome do personagem
function search() {
   var searchTerm = document.getElementById('search_bar').value;
   var apiURL = `https://rickandmortyapi.com/api/character?name=${searchTerm}`;

   fetch(apiURL)
   .then(response => response.json())
   .then(data => {
      displayResults(data.results);
   })
   .catch(error => console.error('Erro ao buscar dados: ', error));
}
// Evento que carrega os dados da API quando a página é carregada
window.addEventListener('load', () => {
   getDadosAPI(paginaAtual);
   const loadMoreBtn = document.getElementById('load-more-btn');

   loadMoreBtn.addEventListener('click', () => {
      paginaAtual++;
      getDadosAPI(paginaAtual);
   });
});
// Evento que carrega os dados da API quando a página é carregada
window.addEventListener('load', getDadosAPI);