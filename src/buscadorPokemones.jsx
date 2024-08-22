import React, { useState, useEffect } from "react";

export const ListaPokemones = () => {
    const [pokemones, setPokemones] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [mensaje, setMensaje] = useState('');

    //cargar los primeros 25
    const cargarPokemones = async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=25');
            const data = await response.json();
            const promesasPokemones = data.results.map(async (pokemon) => {
                const res = await fetch(pokemon.url);
                return res.json();
            });
            const pokemonesData = await Promise.all(promesasPokemones);
            setPokemones(pokemonesData);
        } catch (error) {
            console.error('Error al cargar los Pokémon:', error);
        }
    };

    //manejar la lista
    const handleInputChange = (e) => {
        setBusqueda(e.target.value.toLowerCase());
    };

    const handleSingleClick = (pokemon) => {
        setMensaje(`Nombre: ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`);
    };

    //eliminacion
    const handleDoubleClick = (pokemonId) => {
        if (window.confirm("¿Lo eliminamos a este?")) {
            setPokemones(prevPokemones => prevPokemones.filter(pokemon => pokemon.id !== pokemonId));
        }
    };

    //filtro de busqueda
    const pokemonesFiltrados = pokemones.filter(pokemon => pokemon.name.includes(busqueda));

    return (
        <div className="container">
            <h1 className="title">Lista de Pokémon</h1>
            <button onClick={cargarPokemones}>Cargar Pokémon</button>
            <input
                type="text"
                placeholder="Busca un Pokémon"
                value={busqueda}
                onChange={handleInputChange}
            />
            <div className="pokemon-list">
                {pokemonesFiltrados.map((pokemon) => (
                    <div
                        key={pokemon.id}
                        className="pokemon-card"
                        onClick={() => handleSingleClick(pokemon)}
                        onDoubleClick={() => handleDoubleClick(pokemon.id)}
                    >
                        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                        <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
                        <button onClick={() => handleDoubleClick(pokemon.id)}>Eliminar</button>
                    </div>
                ))}
            </div>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
};
