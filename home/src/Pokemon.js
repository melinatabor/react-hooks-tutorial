import React from 'react';
import { useFetch } from './hooks';


function Pokemon() {
  const {name, weight} = useFetch('https://pokeapi.co/api/v2/pokemon/ditto', {})

  return (
      <div>
          <h3>Pokemon</h3>
          <p>Nombre: {name}</p>
          <p><em> Peso: {weight}</em></p>
      </div>
  )
}

export default Pokemon;