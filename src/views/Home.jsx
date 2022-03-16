import { useState, useEffect } from "react";
import getPokemons from "../libs/api-requests/requests";
import NavBar from "../components/NavBar";

function Home({ }) {
    const [title, setTitle] = useState('All');
    const [pokemons ,setPokemons] = useState([{name: '', sprites:{front_default: 'https://c.tenor.com/tEBoZu1ISJ8AAAAC/spinning-loading.gif'}}]);
    const [search, setSearch] = useState('');

    const getPokemonsHandler = async () =>{
        const pokemonsData = await getPokemons(40);        
        setPokemons(pokemonsData);
    }

    useEffect(() => {
        getPokemonsHandler()
    },[])
    
    return ( 
        <>
            <NavBar onFilter={(filterName, filteredPokemons) => {
                setPokemons(filteredPokemons)
                setTitle(filterName)
            }}/>
            <div className="container">
                <h3 className="text-center">{title}</h3>
                <form className="form">
                    <input className="form-control" type="search" onChange={e => setSearch(e.target.value.toLocaleLowerCase())}/>
                </form>
            </div>

            <div className="container-xxl d-flex flex-row flex-wrap align-items-center justify-content-around">
                    {pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(search)).map(pokemon => (
                        <div className="card m-3" style={{width:'19rem'}}>
                            <img src={pokemon.sprites.front_default} alt="" /> 
                            <div className="card-body" key={pokemon.id}>
                                <h4 className="card-title">{pokemon.id}</h4>
                                <p className="card-text"> {pokemon.name}</p>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
}

export default Home;