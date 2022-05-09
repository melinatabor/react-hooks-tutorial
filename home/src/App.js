import React, { useState } from "react";
import Pokemon from './Pokemon';
import RickMorty from "./RickMorty";
import Tasks from "./Tasks";
import Gallery from "./Gallery";
import Matrix from "./Matrix";

const App = () => {
  // Inicializo mi cajita con un string vacio
  const [userQuery, setUserQuery] = useState('');
  const [showGallery, setShowGallery] = useState(true);

  // Funcion callback: Cada valor que ingresamos en la barra de busqueda se actualiza,
  // y se guarda en userQuery gracias a la funcion seteadora.
  const updateUserQuery = event => {
    setUserQuery(event.target.value);
    console.log('userQuery', userQuery);
  }

  // Funcion que va a redireaccionar a la person a una nueva ventana con lo que busca.
  // El objeto window.open nos permite redirigir al usuario a una ventana global.
  // Dentro ponemos en el primer parametro la url, y el segundo parametro opcional para abrirlo en una ventana nueva.-
  const searchQuery = () => {
    window.open(`https://google.com/search?q=${userQuery}`, '_blank');
  }

  // Funcion que gracias al evento nos permite redigirlo apretando enter.
  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      searchQuery();
    }
  }

  const toggleShowGallery = () => {
    setShowGallery(!showGallery);
  }

  return (
    <div className="App">
      <h1>Hola Meli</h1>
      <div className="form">
        <input value={userQuery} onChange={updateUserQuery} onKeyPress={handleKeyPress} />
        <button onClick={searchQuery}>Buscar</button>
      </div>
      <hr />
      <Pokemon />
      <hr />
      <Tasks />
      <hr />
      <div>
        {
          showGallery ? <Gallery /> : null
        }
        <button onClick={toggleShowGallery}>
          {showGallery ? 'Hide' : 'Show'} Gallery
        </button>
      </div>
      <hr />
      <RickMorty />
      <hr />
      <Matrix />
    </div>

  );
}

export default App;
