function atualizaItens() {
    if (numPokemonsExibidos <= 1008) {
        var i;
        for (i = numPokemonsExibidos + 1; i <= numPokemonsExibidos + numPokemonsPorPagina; i++) {
            urls.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
        }
        copiaNumPokemonsExibidos += numPokemonsPorPagina;
        const promises = urls.map(url => fetch(url));

        Promise.all(promises)
            .then(responses => Promise.all(responses.map(res => res.json())))
            .then(data => {
                data.forEach(criaElementos);
            })
            .catch(error => console.log(error))
            .finally(() => {
                numPokemonsExibidos += numPokemonsPorPagina;
                urls = [];
            })
    }

}
//cria elementos
function criaElementos(poke) {
    //criando os elementos
    var itemLista = document.createElement('li');
    var figureItemLista = document.createElement('figure');
    var imagem = document.createElement('img');
    var idPokemon = document.createElement('p');
    var nomePokemon = document.createElement('p');
    pokemonList.appendChild(itemLista);
    pokemonList.lastChild.appendChild(figureItemLista);
    pokemonList.lastChild.lastChild.appendChild(imagem);
    pokemonList.lastChild.appendChild(idPokemon);
    pokemonList.lastChild.appendChild(nomePokemon);

    //adicionando as classes aos elementos
    pokemonList.lastChild.setAttribute('data-pokemon', `${poke.name}`);
    pokemonList.lastChild.firstChild.classList.add('pokemon-figure');
    pokemonList.lastChild.firstChild.firstChild.classList.add('pokemon-img');
    pokemonList.lastChild.firstChild.firstChild.src = poke.sprites.other['official-artwork'].front_default;
    pokemonList.lastChild.children[1].innerText = adicionaZerosAoId(`${poke.id}`);
    pokemonList.lastChild.children[2].innerText = formataNome(`${poke.name}`);
    pokemonList.lastChild.children[1].classList.add('pokemon-id');
    pokemonList.lastChild.children[2].classList.add('pokemon-name');
}

//cria um elemento quando for feita a pesquisa
function criaUmElemento(idOuNome) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${idOuNome}`)
        .then(response => response.json())
        .then(response => {
            let filhosPokemonList = Array.from(pokemonList.children);
            filhosPokemonList.forEach((filho) => {
                filho.classList.add('displayOff');
            });
            criaElementos(response);
            copiaNumPokemonsExibidos = numPokemonsExibidos + 1;
            verificadorElementoUnico = true;
            buttonPageDown.classList.add('displayOff');
        })
        .catch(erro => {
            console.log(erro);
            console.log("A vida é assim")
        })
        .finally();
}

function mostraUmPokemon(key){
    if (key.keyCode === 13 || clicouLupa) {
        if (pesquisa.value !== '') {
            criaUmElemento(pesquisa.value);
            if (verificadorElementoUnico) {
                pokemonList.lastChild.remove();
                verificadorElementoUnico = false;
            }
        }
        else if (pesquisa.value === '' && copiaNumPokemonsExibidos > numPokemonsExibidos) {
            copiaNumPokemonsExibidos--;
            pokemonList.lastChild.remove();
            verificadorElementoUnico = false;
            let filhosPokemonListOn = Array.from(pokemonList.children);
            filhosPokemonListOn.forEach((filho) => {
                filho.classList.remove('displayOff');
            });
            buttonPageDown.classList.remove('displayOff');
        }

    }
    clicouLupa = false;
}

//formata o id
function adicionaZerosAoId(id) {
    if (id < 10) {
        return '000' + id;
    }
    else if (id >= 10 && id < 100) {
        return '00' + id;
    }
    else if (id >= 100 && id < 1000) {
        return '0' + id;
    }
    else {
        return id;
    }
}

//formata o nome
function formataNome(nome) {
    return nome.charAt(0).toUpperCase() + nome.slice(1);
}