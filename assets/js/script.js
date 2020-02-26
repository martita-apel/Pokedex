$(document).ready(function() {
  cargarPokemones();
  $(".pokemon__nombre").hide();
  $(".pokemon__filtro").hide();
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
    alert("No has ingresado ningún Pokemon (en inglés).");
  } else {
    nombrePokemon(cargar);
  }

  function nombrePokemon(id) {
    $.get("https://pokeapi.co/api/v2/pokemon/" + id, function(data) {
      console.log(data);
      $(".pokemon__nombre").show();

      $("#pokemon")[0].innerHTML = data.name.toUpperCase();
      $("#pokemonimg")[0].src = data.sprites.front_default;

      const colores = {
        normal: "#D3D3D3",
        fire: "#FF7800",
        water: "#00BDFF",
        electric: "#FFFC26",
        grass: "#18D84C",
        ice: "#0CF7D7",
        fighting: "#F0195E",
        poison: "#7E00BD",
        ground: "#905E00",
        flying: "#9060FF",
        psychic: "#07CAAC",
        bug: "#68BE01",
        rock: "#9D9861",
        ghost: "#46358E",
        dragon: "#016F40",
        dark: "#463D52",
        steel: "#AACDCF",
        fairy: "#FF9A6B",
        unknown: "#FFCA8E",
        shadow: "#002E7F"
      };

      let tipo = "";
      for (let i = 0; i < data.types.length; i++) {
        tipo += data.types[i].type.name + " ";
        let color = colores[data.types[i].type.name];

        // tipo +=
        //   "<span style=backgroundColor:" +
        //   "colores[data.types[i].type.name]" +
        //   ">" +
        //   data.types[i].type.name +
        //   "</span>" +
        //   " ";
        // tipo += data.types[i].type.name.fontcolor("green") + " ";
      }
      $("#pokemontipo")[0].innerHTML = tipo.color;

      let habilidad = [];
      for (let i = 0; i < data.abilities.length; i++) {
        habilidad += data.abilities[i].ability.name + " / ";
        // console.log(habilidad.join(" - "));
      }

      $("#pokemonhab")[0].innerHTML += habilidad;
    });
  }
});

// Buscador por filtros

$("#filtro__boton").click(function(e) {
  e.preventDefault();
  var cargar = $("#filtro__input")[0].value;
  if (cargar == "") {
    alert("");
  } else {
    filtrarPokemon(cargar);
  }

  function filtrarPokemon(cargar) {
    $("#filtro").html("");

    $.get("https://pokeapi.co/api/v2/type/" + cargar, function(data) {
      console.log(data);
      $(".pokemon__filtro").show();
      let lista = data.pokemon;

      let tipos = "";
      for (let i = 0; i < lista.length; i++) {
        tipos +=
          "<div class='card filtro_card col-8 col-md-4 col-lg-3'>" +
          "<img src='' id='filtroimg' class='card-img-top' alt='' />" +
          "<div class='card-body filtro-datos row'>" +
          "<h5 class='card-title'>" +
          lista[i].pokemon.name.toUpperCase() +
          "</h5>" +
          "<button type='button' class='btn btn-primary' data-toggle='modal'" +
          "data-target='#exampleModal'>Ver más</button>" +
          "</div>" +
          "</div>" +
          "<br>" +
          // Empieza Modal
          '<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"' +
          'aria-labelledby="exampleModalLabel" aria-hidden="true">' +
          '<div class="modal-dialog" role="document">' +
          '<div class="modal-content">' +
          '<div class="modal-header">' +
          '<h5 class="modal-title" id="exampleModalLabel">' +
          lista[i].pokemon.name.toUpperCase() +
          "</h5>" +
          "</div>" +
          '<div class="modal-body">...</div>' +
          '<div class="modal-footer">' +
          '<button type="button" class="btn btn-secondary" data-dismiss="modal"' +
          ">" +
          "Cerrar" +
          "</button>" +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>";
        console.log(tipos);
      }

      $("#filtro")[0].innerHTML = tipos;
    });
  }
});

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
