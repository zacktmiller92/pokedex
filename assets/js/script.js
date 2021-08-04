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
    // pokeHistory.push(pokemonName);
    
    // getWikiData(pokemonName)
    getPokeData(pokemonName)    
});

// transform upppercase text to lower case as they type-------------
$('#pokename').keyup(function(){
    $(this).val($(this).val().toLowerCase());
});


// clear history---------------
$(".btn2").click(function(){
    localStorage.clear();
    pokeHistory = []
    history()
  });

// history storage loop
function history(){
    // get from local storage and refresh list by clearing it
    var pokeHistory = JSON.parse(localStorage.getItem("pokeHistory"))
    pokeHistoryEl.empty();

    // render everything from local storage to the screen
    for ( var i = 0; i < pokeHistory.length; i++){
        var li = $("<li>").text(pokeHistory[i]);
        pokeHistoryEl.append(li).addClass("")
    }
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
            // if 202 response, render pokemon
            response.json()
            .then(function (pokemon) {
                renderPokeData(pokemon)
            })
            // if 202 response, continue the rest of the script (wikipedia api, add to local storage,
            // render on screen using history function)
            var pokemonName = $("#pokename").val()
            pokeHistory.push(pokemonName);
            getWikiData(pokemonName)
            localStorage.setItem("pokeHistory", JSON.stringify(pokeHistory));
            history()
        } else { 
            // enter modal here that says "enter valid pokmeon name". then remove alert.
            var elem = document.querySelector('.modal');
            var instance = M.Modal.init(elem);
            instance.open();
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