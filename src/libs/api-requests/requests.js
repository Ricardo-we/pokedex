import axios from 'axios'
import { FormText } from 'react-bootstrap';
import { BASE_URL } from '../../App'

export default async function getPokemons(limit=30){
    const pokemonsData = [];
    for(let i = 1; i <= limit; i++){
        const response = await getPokemon(i);
        pokemonsData.push(response)
    }
    return pokemonsData;
}

export async function getPokemon(pokemonIdentifier='pikachu'){
    const response = await axios.get(`${BASE_URL}/pokemon/${pokemonIdentifier}`)
    return response.data;
}

export async function getPokemonTypes(){
    const response = await axios.get(`${BASE_URL}/type`)
    return response.data.results;
}

export async function getPokemonsByType(type, limit=20, offset=0){
    const requestedPokemons = await axios.get(`${BASE_URL}/type/${type}?limit=${limit}&offset=${offset}`);
    const finalResponse = [];
    
    for(let pokemon of requestedPokemons.data.pokemon){
        const newPokemon = await getPokemon(pokemon.pokemon.name);
        finalResponse.push(newPokemon)
    }

    return finalResponse;
}

export async function getPokemonType(pokemonIdentifier){
    const response = await axios.get(`${BASE_URL}/type/${pokemonIdentifier}`)
    return response.data.results;
}