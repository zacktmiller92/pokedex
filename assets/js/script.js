// // slide nav init------------------
// $(document).ready(function(){
//     $('.sidenav').sidenav();
//   });
  
//   // slider init------------
//   $(document).ready(function(){
//     $('.slider').slider({
//       height: 500,
//       interval : 2000,
//     });
    
//   });
  
  
  
  
  
//   var pokeNameEl = $("#pokename");
//   var btnSearch =  document.querySelector(".btnsearch");
//   var pokemonImg = document.querySelector(".pokemon-img")
//   var textInfo = document.querySelector(".text-info")
//   var searchHistoryEl = $(".history")
//   var searchHistory = [];
  
// //   jquery syntax--------------------
//   $(btnSearch).on("click", (event) => {  
//       event.preventDefault();
//       var pokeName = pokeNameEl.val().trim()
//       if (pokeName === "");
//       else{    
//           $(document).ready(function(){
//               $('.modal').modal();
//             });   
//             getWikiData()  
//             getPokeData()
//         }
//     })
    
    
//     // getting text data from wikipedia
//     var getPokeData = function() {
//         // pokeName.value = "";
//         var pokeName = pokeNameEl.val().trim()
//         var pokeApi = "https://pokeapi.co/api/v2/pokemon/";
//         // var pokeApi = "https://pokeres.bastionbot.org/images/pokemon/";
//         fetch(pokeApi + pokeName)
//         .then( (response) => response.json())
//         .then( (data) => {            
            
//           console.log(data)
//             pokemonImg.innerHTML = "";
//             var pokeIcon = data.sprites.other.dream_world.front_default ;            
//             var img = document.createElement("img")
//             img.classList.add("f_img")
//             img.setAttribute("src", pokeIcon);
//             pokemonImg.appendChild(img);          
//             // pokemonImg.setAttribute("style", "")
//             // console.log(pokeIcon)
            
//         });
//     };
    

//     var getWikiData = function() {
//       // pokeName.value = "";
//       var pokeName = pokeNameEl.val().trim()
//       var pokeApi = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&origin=*&titles=" ;
//       fetch(pokeApi + pokeName)
//       .then( (response) => response.json())
//       .then( (data) => {

//         // grab the items of the object and places inside a arrays
//         var sampleTags = Object.values(data.query.pages)[0].extract;
        
//         textInfo.innerHTML = sampleTags;
//         textInfo.setAttribute("style", " color: white;");
//       })

//     }

        
        