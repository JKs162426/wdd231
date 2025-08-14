// pokemonCache.mjs
export const pokemonCache = new Map();

export async function getPokemon(idOrName) {
  const key = idOrName.toString().toLowerCase();

  if (pokemonCache.has(key)) {
    return pokemonCache.get(key);
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${key}`);
    if (!response.ok) throw new Error('Pokémon not found');

    const data = await response.json();

    pokemonCache.set(key, data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}