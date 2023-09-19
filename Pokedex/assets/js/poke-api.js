const pokeApi = {}

function converterPokeApiDetalhe(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.numero = pokeDetail.id
    pokemon.nome = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const {type} = types

    pokemon.tipos = types
    pokemon.tipo = type

    const abilities = pokeDetail.abilities.map((abilitiesAbility) => abilitiesAbility.ability.name)
    const [ability] = abilities

    pokemon.abilities = abilities
    pokemon.ability = ability

    pokemon.imagem = pokeDetail.sprites.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(converterPokeApiDetalhe)
}

pokeApi.getPokemon = (offset = 0, limit = 12) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemon) => pokemon.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => pokemonDetails)
}
