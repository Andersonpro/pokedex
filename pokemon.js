const pokemon = document.querySelector(".pokemon");
const pokemonList = document.querySelector(".pokemon-list");
const buttonPageDown = document.querySelector('#button-page-down');
const searchImg = document.querySelector('.container-search-img');
var clicouLupa = false;
buttonPageDown.addEventListener('click', atualizaItens);
const pesquisa = document.querySelector('#search');
//verificador para criar apenas um elemento por vez na pesquisa
var verificadorElementoUnico = false;
var copiaNumPokemonsExibidos = 0;

var urls = [];
var numPokemonsExibidos = 0;
var numPokemonsPorPagina = 12;
let intervaId;

window.onload = atualizaItens;

//pesquisa de pokemon, se o número for válido, mostra apenas o que foi buscado, caso esteja em branco e aperte enter, volta a lista normal que já foi carregada
pesquisa.addEventListener('keydown', (key) => {
mostraUmPokemon(key);
})
searchImg.addEventListener('click', (key) => {
    clicouLupa = true;
    mostraUmPokemon(key);
})