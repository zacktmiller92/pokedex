
// Generate Pokemons
function consultPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(function (response) {
        response.json()
        .then(function (pokemon) {
            console.log(pokemon)
            renderPokemons(pokemon)

        })

    })
    consultPokemon()

}
var renderPokemons = function(pokemon) {
    var pokeExtract = pokemon.name

    $(".text-info").html(pokeExtract)

    console.log(pokeExtract);
    console.log(typeof(pokeExtract))

}

// gets pokemon abilities. Loops through and uses push the add the name of each array to 'abilitiesArray'
function consultAbilities (id) {
    fetch(`https://pokeapi.co/api/v2/ability/${id}`)
    .then (function (response) {
        response.json()
        .then(function(ability) {
        
            var abilitiesArray = [];
            for (var i = 0; i < pokemon.abilities.length; i++) {
                abilitiesArray.push(pokemon.abilities[i].ability.name)
            };
            })

        })
    }

    consultMove()


// joins the abilities array, replaces the hyphens with spaces and renders on the screen

$(".text-info").html(abilitiesArray.join("<br>").replace("-"," "))

// get pokemon Sprites. Images
function createPokemon(pokemon) {
    let image= item.getElementBytagName("img") [0]
image.setAttribute("src", pokemon.sprites.front_default)

let name= item.getElementsByTagName("p")[0]
name.textContent = pokemon.name

}

// get pokemon moves
function consultMove(id) {
    fetch(`https://pokeapi.co/api/v2/move/${id}`)
    .then(function (response) {
        response.json()
        .then(function (moves) {

            console.log(move)
            rendorMoves(move)


            var moveArray = [];
            for (var i= 0; i < pokemon.move.length; i++) {
                moveArray.push(pokemon.move[i].move.name)
            };
            
            })

        })

    };
    consultMove()
    
$("#pokemon_form").on("submit", formHandler)




