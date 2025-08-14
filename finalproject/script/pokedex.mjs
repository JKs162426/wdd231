//last modified script
const today = new Date;
const year = document.querySelector("#currentyear");
year.innerHTML = today.getFullYear();

const lastModified = document.querySelector("#lastModified");
lastModified.innerHTML = document.lastModified;

//pokemon display script
const pokedexContainer = document.getElementById('pokedex');
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('search');

export function displayPokemon(pokemon) {
  const div = document.createElement('div');
  div.className = 'pokemon';
  div.innerHTML = `
    <h3>${pokemon.name.toUpperCase()}</h3>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" loading="lazy" height="200" width="200"/>
    <p>ID: ${pokemon.id}</p>
    <p>Height: ${pokemon.height / 10} m</p>
    <p>Weight: ${pokemon.weight / 10} kg</p>
    <p>Type: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
    <button class="more-details-button">More Details</button>
  `;
  
  div.querySelector('.more-details-button').addEventListener('click', () => {
    openModal(pokemon);
  });

  pokedexContainer.appendChild(div);
}

searchButton.addEventListener("click", async () => {
  const query = searchInput.value.trim().toLowerCase();
  pokedexContainer.innerHTML = '';

  if (query.length < 2) return;

  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${query}`;
    const res = await fetch(url);

    if (!res.ok) {
      pokedexContainer.innerHTML = `<p>Pokémon not found</p>`;
      return;
    }

    const data = await res.json();
    displayPokemon(data);
    backgroundColor(data);
  } catch (error) {
    pokedexContainer.innerHTML = `<p>Error fetching data</p>`;
  }
});

searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    searchButton.click();
  }
});

function backgroundColor(pokemon) {
  const colorbytype = {
    fire: '#FF6F61',
    water: '#6FB3FF',
    grass: '#85E3B0',
    electric: '#FFD700',
    psychic: '#FFB6C1',
    ice: '#ADD8E6',
    dragon: '#FF4500',
    normal: '#A8A878',
    fighting: '#C03028',
    flying: '#A890F0',
    poison: '#A040A0',
    ground: '#E0C068',
    rock: '#B8A038',
    bug: '#A8B820',
    ghost: '#705898',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
    dark: '#705848',
    unknown: '#68A090'
  };

  const mainType = pokemon.types[0].type.name.trim().toLowerCase(); 
  console.log("Detected type:", mainType);

  const pokedexEl = document.getElementsByClassName('pokedex')[0];
  if (!pokedexEl) {
    console.error("Not able to find the pokedex element.");
    return;
  }

  if (colorbytype[mainType]) {
    pokedexEl.style.backgroundColor = colorbytype[mainType];
  } else {

    const colors = Object.values(colorbytype);
    pokedexEl.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  }

  pokedexEl.style.color = '#333';
}

const openModal = (pokemon) => {
  const modal = document.getElementById('pokemonModal');
  const modalContent = modal.querySelector('.modal-content');

  modalContent.innerHTML = `
    <button class="close-button">&times;</button>
    <p>More details about ${pokemon.name.toUpperCase()}</p>
    <p>Base Experience: ${pokemon.base_experience}</p>
    <p>Abilities: ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
    <p>Stats:</p>
    <ul>
      ${pokemon.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
    </ul>
  `;
  modal.style.display = 'block';

  modal.querySelector('.close-button').addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      modal.style.display = 'none';
    }
  });
}