function consultPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(function (response) {
        response.json()
        .then(function (pokemon) {
            console.log(pokemon)
            renderPokemons(pokemon)

        })

    })

}

var renderPokemons = function(pokemon) {
    var pokeExtract = pokemon.name

    $(".text-info").html(pokeExtract)

    console.log(pokeExtract);
    console.log(typeof(pokeExtract))

}
