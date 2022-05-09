import { useEffect, useState } from "react";

// Creo un custom hook para hacer las pegadas de API.
export const useFetch = (url, initialValue) => {
  
  const [result, setResult] = useState(initialValue);

  useEffect(() => {
    // El metodo fetch necesita como parametro la url de la api que trae la data.
    // Usamos el then para guardar lo que nos devuelve y el .json para que sea un archivo de este tipo.
    fetch(url)
      .then(response => response.json())

      // Cuando la respuesta fue transformada correctament en un json
      .then(json => setResult(json))
  }, []);
  // El useEffect no necesita ejecutarse en cada render, con el [] sólo se dispara después de la cantidad inicial del componente. 
  
  return result;
}

export const useDynamicTransition = ({ increment, delay, length }) => {
  const [index, setIndex] =useState(0);

  useEffect(() => {
    const interval = setInterval(
        () => {
            setIndex(storedIndex => {
                return (storedIndex+increment)%length
            })
        }, delay);

    return () => clearInterval(interval);
  }, [delay, increment]);

  return index;
}
  