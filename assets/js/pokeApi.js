const pokeApi = {}

function convertToPokemonModel(pokemonDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokemonDetail.order;
  pokemon.name = pokemonDetail.name;
  const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name);
  const [ type ] = types;
  pokemon.type = type;
  pokemon.types = types;
  pokemon.image = pokemonDetail.sprites.other.dream_world.front_default;

  return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
return fetch(pokemon.url)
  .then((results) => results.json())
  .then(convertToPokemonModel)
}

pokeApi.getPokemons = (offset=0, limit=5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  
  return fetch(url)
  .then((response) => response.json())
  .then((responseData) => responseData.results)
  .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
  .then((datailRequest) => Promise.all(datailRequest))
  .then((pokemonsDetails) => pokemonsDetails);
}