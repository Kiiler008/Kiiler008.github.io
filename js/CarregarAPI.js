let paginaAtual = 1;

const getDadosAPI = async function(page) {
   const url = `https://rickandmortyapi.com/api/character/?page=${page}`;
   const response = await fetch(url);
   const dados = await response.json();
   displayResults(dados.results);
}

const criarElemento = (tag, classe, texto) => {
   const elemento = document.createElement(tag);
   if (classe) elemento.classList.add(classe);
   if (texto) elemento.textContent = texto;
   return elemento;
}

const displayResults = function(results) {
   const divCardmoldura = document.getElementById('CardsRM');
   divCardmoldura.innerHTML = ''; 

   results.forEach(result => {
      const divCards = criarElemento('div', 'Cards');
      const h2NomeP = criarElemento('h2', 'Nome_Personagem', result.name);
      const divtextos = criarElemento('div', 'divtextos');
      const MFpersonagem = criarElemento('span', 'MFpersonagem', 'Gênero: ' + result.gender);
      const PEspecie = criarElemento('span', 'Origem', 'Espécie: ' + result.species);
      const POrigem = criarElemento('span', 'POrigem', 'Origem: ' + result.origin.name);
      const img = criarElemento('img', 'ImagemP');
      img.src = result.image;
      const spanStatusVM = criarElemento('span', 'StatusVM', 'Status: ' + result.status);

      divCardmoldura.appendChild(divCards);
      divCards.append(h2NomeP, img, divtextos);
      divtextos.append(PEspecie, MFpersonagem, spanStatusVM, POrigem);
   });
}

function search() {
   const searchTerm = document.getElementById('search_bar').value;
   const apiURL = `https://rickandmortyapi.com/api/character?name=${searchTerm}`;

   fetch(apiURL)
   .then(response => response.json())
   .then(data => displayResults(data.results))
   .catch(error => console.error('Erro ao buscar dados: ', error));
}

function handleKeyPress(event) {
   if (event.keyCode === 13) {
      search();
   }
}

document.getElementById('search_bar').addEventListener('keypress', handleKeyPress);

window.addEventListener('load', () => {
   getDadosAPI(paginaAtual);
   const loadMoreBtn = document.getElementById('load-more-btn');

   loadMoreBtn.addEventListener('click', () => {
      paginaAtual++;
      getDadosAPI(paginaAtual);
   });
});
