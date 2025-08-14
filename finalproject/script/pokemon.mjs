import { displayPokemon } from './pokedex.mjs';
import { getPokemon } from './pokemonCache.mjs';

const pokedexContainer = document.getElementById('pokedex');
const buttons = {
  first: [1, 151],
  second: [152, 251],
  third: [252, 386],
  fourth: [387, 493],
  fifth: [494, 649],
  sixth: [650, 721]
};

async function fetchPokemon(limit) {
  try {
    pokedexContainer.innerHTML = '<p>Cargando...</p>';
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    const data = await response.json();

    const pokemonDetails = await Promise.all(
      data.results.map(pokemon => fetch(pokemon.url).then(res => res.json()))
    );

    pokedexContainer.innerHTML = '';
    pokemonDetails.forEach(displayPokemon);
  } 
  catch (error) {
    console.error('Error fetching Pokémon data:', error);
    pokedexContainer.innerHTML = '<p>Error cargando Pokémon. Intenta más tarde.</p>';
  }
}

fetchPokemon(15);

async function loadPokemons(start, end) {
  const promises = [];
    for (let i = start; i <= end; i++) {
        promises.push(getPokemon(i));
    }
  /*for (let i = start; i <= end; i++) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const data = await response.json();
    displayPokemon(data);
  }
}*/
  const pokemonDetails = await Promise.all(promises);
  pokemonDetails.forEach(displayPokemon);
}

Object.entries(buttons).forEach(([season, limit]) => {
  document.getElementById(`${season}-season`).addEventListener('click', () => {
    pokedexContainer.innerHTML = '';
    loadPokemons(limit[0], limit[1]);
  });
});