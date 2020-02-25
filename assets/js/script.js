$(document).ready(function() {
  cargarPokemones();
});

function cargarPokemones() {
  $.get("https://pokeapi.co/api/v2/pokedex/1", function(data) {
    console.log(data);

    // let pokemon = data.pokemons_entries;
    // let card = "";
    // pokemon.forEach(p => {
    //   // el card tiene que ir con sus div class= ""
    //   card = p.pokemon_especies.name;
    //   $("#listaPokemon")[0].innerHTML += card;
    // });
    // document.body.append();
  });
}

$("#search__boton").click(function(e) {
  e.preventDefault();
  var cargar = $("#search__input")[0].value;
  if (cargar == "") {
    alert("");
  } else {
    nombrePokemon(cargar);
  }

  function nombrePokemon(id) {
    $.get("https://pokeapi.co/api/v2/pokemon/" + id, function(data) {
      console.log(data);

      $(".pokemon")[0].innerHTML = data.name;
    });
  }
});

//     if (id !== "") {
//       obtenerpokemon(id);
//     } else{
//       $("#errorMesagge")[0].innerHTML = "No has ingresado ningún dato.";
//     }
//       function obtenerpokemon(id) {
//         $.get("https://pokeapi.co/api/v2/pokemon") + id,
//           data => {
//             console.log(data);

//             $("#nombrePokemon")[0].innerHTML = data.name.toUpperCase();
//             $("#pokeImg")[0].src = data.sprites.front_default;
//             // $("#pokeImg").show();
//             let ability = "<ul>";
//             data.abilities.forEach (a =>{
//               ability += "<li>" + a.ability.name + "</li>";
//             });
//             // for(let = 0; data.abilities.length; i++){
//             //   ability += data.abilities[i].ability.name;
//             }
//             ability += "/ul>";
//             $("#description")[0].innerHTML = ability;
//             $("$result").show();
//           };
//       }
//     $.ajax({
//       type: "GET",
//       url: "https://pokeapi.co/api/v2/",
//       dataType: "json",
//       success: function(data) {
//         console.log(data);
//       }
//     });
//   });
// });

// GitHub
// var request = require("request");

// module.exports = {
//   getPokedex: function(req, res, next) {
//     var name = req.params.name;
//     request("https://pokeapi.co/api/v2/pokedex/" + name + "/", function(
//       error,
//       response,
//       body
//     ) {
//       var pokedex = JSON.parse(body);
//       var arrayPokemon = [];
//       for (var i = 0; i < pokedex.pokemon_entries.length; i++) {
//         var number = pokedex.pokemon_entries[i].entry_number;
//         var pokemonName = pokedex.pokemon_entries[i].pokemon_species.name;
//         arrayPokemon.push({ id: number, name: pokemonName });
//       }
//       res.send(arrayPokemon);
//     });
//   },
//   getPokemon: function(req, res, next) {},
//   getRandomTeam: function(req, res, next) {}
// };

// var NombresPokemon = [
//   "bulbasaur",
//   "pikachu",
//   "charmander",
//   "chicorita",
//   "gigilipuf",
//   "snorlackssss"
// ];
// var num = 0;
// while (num < 6) {
//   console.log(NombresPokemon[num] + "con while ");
//   num++;
// }
// for (let i = 0; i < NombresPokemon.length; i++) {
//   console.log(NombresPokemon[i] + "con for normalito");
// }
// NombresPokemon.map(x => {
//   console.log(x + " con map :) ");
// });
// NombresPokemon.forEach(e => {
//   console.log(e + "con forEach");
// });
// for (i in NombresPokemon) {
//   console.log(NombresPokemon[i] + "con for in");
// }
// for (t of NombresPokemon) {
//   console.log(t + "con for of");
// }
