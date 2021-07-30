var formHandler = function() {
    event.preventDefault();
    
    var pokemonName = $("#last_name").val()
    
    getWikiData(pokemonName)
};

// https://pokeapi.co/api/v2/pokemon/charizard
var getWikiData = function(pokemonName) {
    fetch('https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&origin=*&titles=' + pokemonName)
    .then( response => response.json())
    .then( data => renderWikiData(data));

};


var renderWikiData = function(wikiData) {
    var wikiExtract = Object.values(wikiData.query.pages)[0].extract;

    $(".text-info").html(wikiExtract)

    console.log(wikiExtract);
    console.log(typeof(wikiExtract))

};


$("#pokemon_form").on("submit", formHandler)