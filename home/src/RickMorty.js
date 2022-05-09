// ANTES DEL CUSTOM HOOK:
// import React, { useState, useEffect } from "react";

// function RickMorty() {
//     const [characters, setCharacters] = useState([]);

//     useEffect(() => {
//         fetch('https://rickandmortyapi.com/api/character')
//         .then(response => response.json())
//         .then(json => setCharacters(json.results));
//     }, []);

// }

// DESPUÉS DEL CUSTOM HOOK:
import React from "react";
import { useFetch } from "./hooks";

function RickMorty() {
    const characters = useFetch('https://rickandmortyapi.com/api/character', {});
    const {results} = characters;

    return (
    <div className="Stories">
    <h3>Personajes Rick and Morty</h3>
    {
        (results || []).map(character => {
            const { id, name, location, created, image } = character;

            return (
                <div key={id}>
                    <a href={image}>{name}</a>
                    <div>{location.name} - {new Date(created).toLocaleString()}</div>
                </div>
            )
        })
    }
    </div>
    )
}

export default RickMorty;
