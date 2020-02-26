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
    alert("No has ingresado ningún Pokemon.");
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
      let color;
      for (let i = 0; i < data.types.length; i++) {
        // tipo += data.types[i].type.name + " ";
        color = colores[data.types[i].type.name];

        tipo +=
          "<span style='background:" +
          colores[data.types[i].type.name] +
          "; padding: 7px 15px; border-radius: 8px'>" +
          data.types[i].type.name +
          "</span>" +
          " ";
        // tipo += data.types[i].type.name.fontcolor("green") + " ";
      }
      $("#pokemontipo")[0].innerHTML = tipo;

      let habilidad = "";
      for (let i = 0; i < data.abilities.length; i++) {
        habilidad += data.abilities[i].ability.name + " / ";
        // console.log(habilidad.join(" - "));
      }

      $("#pokemonhab")[0].innerHTML = habilidad;
    });
  }
});

// Buscador por filtros

$("#filtro__boton").click(function(e) {
  e.preventDefault();
  var cargar = $("#filtro__input")[0].value;
  if (cargar == "") {
    alert("Debes ingresar el tipo de Pokemon que quieres buscar.");
  } else {
    filtrarPokemon(cargar);
  }

  function filtrarPokemon(cargar) {
    // $("#filtro").html("");

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
          "<button type='button' class='btn btn-primary' data-toggle='modal' onclick='graficoPokemon(" +
          (i + 1) +
          ")'" +
          "data-target='#pokemonGrafico" +
          (i + 1) +
          "''>Ver más</button>" +
          "</div>" +
          "</div>" +
          "<br>" +
          // Empieza Modal
          '<div class="modal fade" id="pokemonGrafico' +
          (i + 1) +
          '""tabindex="-1" role="dialog"' +
          'aria-labelledby="exampleModalLabel" aria-hidden="true">' +
          '<div class="modal-dialog" role="document">' +
          '<div class="modal-content" style="width: 550px;">' +
          '<div class="modal-header">' +
          '<h5 class="modal-title" id="exampleModalLabel">' +
          lista[i].pokemon.name.toUpperCase() +
          "</h5>" +
          "</div>" +
          '<div id="graficoPok' +
          (i + 1) +
          '"class="modal-body" style="height: 430px; width: 550px;">' +
          "" +
          " </div>" +
          '<div class="modal-footer">' +
          '<button type="button" class="btn btn-secondary" data-dismiss="modal"' +
          ">" +
          "Cerrar" +
          "</button>" +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>";
        // console.log(tipos);
      }

      $("#filtro")[0].innerHTML = tipos;
    });
  }
});

// Gráfico en Modal

function graficoPokemon(i) {
  $.get("https://pokeapi.co/api/v2/pokemon/" + i, function(data) {
    console.log(data);
    let caract = data.stats;
    let cPokemon = [];
    for (let i = 0; i < caract.length; i++) {
      var hola = { y: caract[i].base_stat, label: caract[i].stat.name };
      cPokemon.push(hola);
      console.log(cPokemon);
    }
    grafico(i, cPokemon);
  });
}

const grafico = function(i, cPokemon) {
  var chart = new CanvasJS.Chart("graficoPok" + i, {
    animationEnabled: true,
    title: {
      text: "Estadísticas",
      horizontalAlign: "left"
    },
    data: [
      {
        type: "doughnut",
        startAngle: 60,
        //innerRadius: 60,
        indexLabelFontSize: 15,
        indexLabel: "{label} - #percent%",
        toolTipContent: "<b>{label}:</b> {y} (#percent%)",
        dataPoints: cPokemon
      }
    ]
  });
  chart.render();
};
