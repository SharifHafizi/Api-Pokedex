const searchInput = document.querySelector("#poke-input");
const inputBtn = document.querySelector(".btn-search");
const pokeContainer = document.querySelector(".poke-container");
const colors = {
  fire: "#fddfdf",
  grass: "#defde0",
  electric: "#fcf7de",
  water: "#def3fd",
  ground: "#f4e7ds",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#d6b3ff",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#f5f5f5",
  fighting: "#e6e0d4",
  normal: "#f5f5f5",
  ice: "#e0f5ff",
};
const pokeCount = 200;

const initPokemon = async () => {
  for (let i = 1; i <= pokeCount; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  let res = await fetch(url);
  let data = await res.json();

  createPkemonBox(data);
};

const createPkemonBox = (pokemon) => {
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const id = pokemon.id.toString().padStart(3, "0");
  const kilo = pokemon.weight;
  const type = pokemon.types[0].type.name;
  const color = colors[type];

  const pokemonEl = document.createElement("div");

  pokemonEl.classList.add("poke-box");
  pokemonEl.style.backgroundColor = `${color}`;
  pokemonEl.innerHTML = `
  <img
          src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png"
          alt="${name}" image
        />
        <h4 class="poke-name">Name:${name}</h4>
        <p class="poke-id">Id:#${id}</p>
        <p class="poke-weigth">Weigth:${kilo}Kg</p>
        <p class="poke-type">Type: ${type}</p>
  `;

  pokeContainer.appendChild(pokemonEl);
};

initPokemon();

searchInput.addEventListener("input", function (e) {
  const pokeNames = document.querySelectorAll(".poke-name");
  console.log(pokeNames);
  const search = searchInput.value.toLowerCase();
  console.log(search);

  pokeNames.forEach((pokeName) => {
    pokeName.parentElement.style.display = "block";

    if (!pokeName.innerHTML.toLowerCase().includes(search)) {
      pokeName.parentElement.style.display = "none";
    }
  });
});
