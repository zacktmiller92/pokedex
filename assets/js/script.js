// slide nav init------------------
$(document).ready(function(){
    $('.sidenav').sidenav();
  });
  
  // slider init------------
  $(document).ready(function(){
    $('.slider').slider({
      height: 450,
      interval : 2000,
    });
    
  });


var pokeHistoryEl = $(".history");
var pokeHistory = []

$(".btn1").click(function(event) {
    event.preventDefault(); 
    var pokemonName = $("#pokename").val()
    pokeHistory.push(pokemonName);
    
    localStorage.setItem("pokeHistory", JSON.stringify(pokeHistory));
    
    // getWikiData(pokemonName)
    getPokeData(pokemonName)

    
});

// clear history---------------
$(".btn2").click(function(){
    localStorage.clear();
    console.log("clear");
  });

// history storage loop
function history(){

    var pokeHistory = JSON.parse(localStorage.getItem("pokeHistory"))

    pokeHistoryEl.empty();

    for ( var i = 0; i < pokeHistory.length; i++){
        
        var li = $("<li>").text(pokeHistory[i]);
        pokeHistoryEl.append(li).addClass("")
    }
    console.log('history function has run')
}

// search function to render everything on the screen---------------
$(document).ready(function() {        

    $(".btn1").click(function(){
        
        $("#in").show(2000);
        
    })    
})


var getWikiData = function(pokemonName) {
    fetch('https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&origin=*&titles=' + pokemonName)
    .then( response => response.json())
    .then( data => renderWikiData(data));
};

var renderWikiData = function(wikiData) {
    var wikiExtract = Object.values(wikiData.query.pages)[0].extract;
    $(".text-info").html(wikiExtract).addClass("info");
    $(".text-info").css("color", "white")
};


var getPokeData = function(pokemonName) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then(function (response) {
        if (response.ok) {
            response.json()
            .then(function (pokemon) {
                renderPokeData(pokemon)
            })
            getWikiData(pokemonName)
            history()
        } else {
            // enter modal here that says "enter valid pokmeon name". then remove alert.
            alert('enter valid pokemon name')
            return
        }
    })
};

var renderPokeData = function(pokeData) {

        

         var abilitiesArray = [];
         var movesArray = [];
         var statsArray = [];
         var typesArray = [];

         // primary image of pokemon
         var primaryImage = pokeData.sprites.other["dream_world"].front_default

        // abilities array
        for (var i = 0; i < pokeData.abilities.length; i++) {
            abilitiesArray.push(pokeData.abilities[i].ability.name)
        };

        // moves array
        for (var i = 0; i < pokeData.moves.length; i++) {
            movesArray.push(pokeData.moves[i].move.name)
        }

        // stats array
        for (var i = 0; i < pokeData.stats.length; i++) {
            statsArray.push(pokeData.stats[i].stat.name + ": " + pokeData.stats[i].base_stat)
        }

        // types array
        for (var i = 0; i < pokeData.types.length; i++) {
            typesArray.push(pokeData.types[i].type.name)
        }

        $(".pokemon-img").html(`<img src="${primaryImage}" />`)
        $("#poke-abilities").html(abilitiesArray.join("<br>").replace("-"," "))
        $("#poke-moves").html(movesArray.join("<br>").replace("-"," "))
        $("#poke-stats").html(statsArray.join("<br>").replace("-"," "))
        $("#poke-types").html(typesArray.join("<br>").replace("-"," "))     

};

history()
// $("#pokemon_form").on("submit", formHandler)