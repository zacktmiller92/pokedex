// slide nav init------------------
$(document).ready(function(){
    $('.sidenav').sidenav();
    $('.slider').slider({
        height: 450,
        interval : 2000,
      });
  });
  


var pokeHistoryEl = $(".history");
var pokeHistory = []


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
        // if statement to render an erorr message if an invalid pokemon is entered
        if (response.ok) {
            // get the response json and pass it to renderPokeData funciton
            response.json()
            .then(function (pokemon) {
                renderPokeData(pokemon)
            })
            // start the wikipedia api call
            var pokemonName = $("#pokename").val()
            getWikiData(pokemonName)
            // run local storage logic if the pokemon's name is unique (not already in local storage)
            if ( pokeHistory.indexOf(pokemonName) === -1){
                pokeHistory.push(pokemonName);
                localStorage.setItem("pokeHistory", JSON.stringify(pokeHistory));
                history()
            };
            // render the pokemon attribute cards on the screen
            $("#in").show(2000); 

        } else { 
            // modal that says "enter valid pokmeon name"
            var elem = document.querySelector('.modal');
            var instance = M.Modal.init(elem);
            instance.open();
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

        // render all pokemon data on screen 
        $(".pokemon-img").html(`<img src="${primaryImage}" />`)
        $("#poke-abilities").html(abilitiesArray.join("<br>").replaceAll("-"," "))
        $("#poke-moves").html(movesArray.join("<br>").replaceAll("-"," "))
        $("#poke-stats").html(statsArray.join("<br>").replaceAll("-"," "))
        $("#poke-types").html(typesArray.join("<br>").replaceAll("-"," "))     

};

// get data from APIs on button click
$(".btn1").click(function(event) {
    var pokemonName = $("#pokename").val()
    getPokeData(pokemonName)    
});

// transform upppercase text to lower case as they type-------------
$('#pokename').keyup(function(){
    $(this).val($(this).val().toLowerCase());
});


// clear history on button click---------------
$(".btn2").click(function(){
    localStorage.clear();
    pokeHistory = []
    history()
  });

// load history from local storage on page load
history()
