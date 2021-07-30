

// https://pokeapi.co/api/v2/pokemon/charizard
var getWikiData = function() {
    fetch('https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&origin=*&titles=charizard')
    .then( response => response.json())
    .then( data => renderWikiData(data));

};


var renderWikiData = function(wikiData) {
    var wikiExtract = Object.values(wikiData.query.pages)[0].extract;

    var wikiExtractSplit = wikiExtract.split("\n")[3];

    $(".text-info").html(wikiExtractSplit)

    console.log(wikiExtractSplit);

};


