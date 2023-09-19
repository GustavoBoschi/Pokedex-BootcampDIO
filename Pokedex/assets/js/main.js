const pokemonDex = document.getElementById('pokemonList')
const carregarMais = document.getElementById('carregarMais')
var exibirDetalhes = document.querySelector('#exibirDetalhes')
var container = document.querySelector('.container')
const limit = 12
let offset = 0;
const registroMaximo = 151

function converterPokemon(pokemon) {
    return `
    <li class="pokemon ${pokemon.tipos[0]}">
    <span class="numero">#${pokemon.numero}</span>
    <span class="nome">${pokemon.nome}</span>

    <div class="detalhes">
        <ol class="tipos">
        ${pokemon.tipos.map((tipo) => `<li class="tipo ${tipo}">${tipo}</li>`).join('')}
        </ol>

        <img src="${pokemon.imagem}" 
            alt="${pokemon.nome}">
    </div>
    <div class="container">
    <ol class="habi ${pokemon.tipos[0]}">
    ${pokemon.abilities.map((ability) => `<li class="ability ${ability}">${ability}</li>`).join('')}
        </ol>
</div>
<button class="exibirDetalhes" type="button" onclick="exibir(this)">
        Abilities
    </button>
</li>
`
}

function carregarPokemon(offset, limit) {
    pokeApi.getPokemon(offset, limit).then((pokemonList = []) => {
        const novoHtml = pokemonList.map(converterPokemon).join('')
        pokemonDex.innerHTML += novoHtml
    })
}

carregarPokemon(offset, limit)

carregarMais.addEventListener('click', () => {
    offset += limit

    const quantidadeRegistro = offset + limit

    if (quantidadeRegistro >= registroMaximo) {
        const novoLimite = registroMaximo - offset
        carregarPokemon(offset, novoLimite)

        carregarMais.parentElement.removeChild(carregarMais)
    } else {
        carregarPokemon(offset, limit)
    }

})

function exibir(botao) {

    const container = botao.previousElementSibling;

    if (container.style.display === 'block') {
        container.style.display = 'none';
    } else {
        container.style.display = 'block';
    }

}

