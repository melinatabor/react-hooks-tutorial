# Curso de React Hooks
## Sección 1: Introducción

### ¿Qué son los hooks de React?
- Son la mayor actualización de React desde su creación.
Son una forma en que los componentes de la función se "enganchan" a la funcionalidad de React. Anteriormente, cuando deseaba que los componentes de React tuvieran efectos secundarios o de estado, necesitaba ampliar la clase base del componente de React. Ahora, los componentes de función solo necesitan aplicar un hooks para obtener esta funcionalidad.

- Como desarrollador web y de React, e ingeniero de software, definitivamente debería preocuparse por los hoooks de React. Esta característica es el futuro de React. Dado que la función aún es tan nueva, aprender los ganchos de React lo distinguirá como desarrollador e ingeniero web.

## Sección 2: Navegando en los hooks (Proyecto uno)
### Instalación Node JS y React
Primero instalar node para windows. Ir a la consola y probar si quedo instalado:
````
node -v (para ver si esta instalado)
````
Después instalamos react en la terminal:
````
npm install -g create-react-app
cd react-hooks-tutorial
create-react-app home
cd home
npm start
````

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.49:3000

Limpiar el proyecto dejando solamente App.js, index.css e index.js (eliminar las llamadas de archivos que quedan).

Crear una app:
````
npx create-react-app nombredelaapp
````
### Primer Hook: useState
- Permite adjuntar datos de estado local a sus componentes.
Antes los componentes de __clase__ de React tenian que extender la clase para acceder al concepto de estado. Ahoral los hooks hacen que se pueda enganchar el concepto de estado en el propio componente de la __función__.

- ¿Para qué usarlo?
Vamos a hacer una app "home" para crear una página de inicio con un montón de widgets útiles para ayudarlo a ahorrar tiempo mientras navega por Internet, cosas como una barra de búsqueda de Google personalizada.

Para realizar una búsqueda, necesitamos una variable de consulta del valor del usuario (user query state variable) y para poder rastrear esa variable vamos a usar un useState.
````
const [userQuery, setUserQuery] = useState();
````
El hook devuelve un __array__ con dos valores. Nosotros le pasamos el valor inicial y con la función de set, actualizamos ese valor.

### Segundo Hook: useEffect
-  Permite aplicar efectos secundarios a sus componentes, que se disparan después de cada representación. 
El primer parámetro es una función de devolución de llamada a ejecutar. 
El segundo parámetro es un array de valores, que indican a React cuándo debe lanzar la llamada de retorno.
Si un valor ha cambiado entre renders, React disparará el callback. Esto significa que puedes proporcionar un array vacío si sólo quieres que el efecto secundario se dispare después de la renderización inicial.

Traducción realizada con la versión gratuita del traductor www.DeepL.com/Translator
Se utiliza para cosas como el establecimiento de un intervalo o la obtención de datos, son __efectos secundarios__.

En otras palabras, no están directamente involucrados en el uso de la entrada al componente de la función react o para crear la salida que el jsx que devuelve.

En los días sugar sintax (js) con las clases tradicionales, este tipo de efectos secundarios serían manejar el ciclo de vida del componente como en momento en que se monta por primera vez.

Para evitar re-renders si usamos un useState dentro, debemos ponerle [] para que solo se ejecute la __primera__ vez que renderiza y no entre en un loop.

- ¿Para qué usarlo?
Vamos a hacer un fetch de datos desde una API.
Cada vez que se renderiza el componente trae la data.

### Custom Hooks:
Es una función atipica de Javascript. Retorna los resultados de una función asincronica, directamente.
El metodo __fetch__ es asincrono porque no retorna el valor inmediatamente.

## Sección 3: Hooks debajo de la capucha
### useState desenmascarado (?:
Cuando hago un console log del estado siempre le falta la ultima letra del input.
Pero si llamo a la variable se ve completa... RARO.
Ejemplo: ANALIZAR
````
const updateUserQuery = event => {
    setUserQuery(event.target.value);
    console.log('userQuery', userQuery);
  }

<input value={userQuery} onChange={updateUserQuery} onKeyPress={handleKeyPress} />
````
Cuando se setea el valor se dispara un evento que espera que reaccion react engine. Pero esto no frena a JS de seguir, entonces se manda el console.log más rapido. Aunque despues el comportamiento de react lo actualiza al user query value.
Todo esto pasa en milisegundos. Pero primero se ejecuta el set.

### Multiple useState hooks: 
Para crear ids random automaticos para los div.
````
npm i uuid@3.3.2 --save
````

## Sección 4: Aprendiendo más de hooks
### Hooks con intervalos
Contruimos una galeria para practicar los intervalos.
Con el hook useEffect podemos usar el método interval y setear un intervalo cada tantos milisegundos.
````
useEffect(() => {
  const interval = setInterval(() => {
      setIndex(storedIndex => {
          return (storedIndex+1)%PICTURES.length;
      })
  }, 3000);

  return () => {
      clearInterval(interval);  --> importante limpiarlo
  };
      
}, [])
````
Como es algo que se repite hicimos un custom hook y lo utilizamos en el componente Matrix. Deje el componente Gallery como estaba para ver la diferencia de no usar el custom hook.

## Sección 5: Reflexión en los hooks
### ¿Por qué?
REACT necesita una forma para que los desarrolladores expresen las estructuras de los componentes, y eso es lo que los hooks son.

Conceptualmente, React Hooks es el lenguaje que se utiliza para transmitir que un componente de la función es más que una función.
Es una función que tiene un estado marcado por el hook de estado. Es una función que aplica un efecto marcado por el uso de hook.
Y puede adjuntar muchos más conceptos útiles con los otros hooks fuera de la caja, ver los componentes como su propio concepto singular es poderoso ya que disipa cualquier magia alrededor de los hooks.

Pero la cuestión es que no es tan útil intentar explicar los componentes metiéndolos en el modelo de herencia de clases, ni de funciones pares.
Las explicaciones eran clases, pero un poco diferentes o funciones puras. Ningún componente es un concepto propio y singular, y por eso se introdujeron los hooks para representar esa verdad con mayor precisión y descartar esas explicaciones confusas.

## Sección 6: Master en hooks (Proyecto dos)
### Tercer Hook: useReducer
- Una alternativa a useState. Acepta un reducer de tipo (state, action) => newState y devuelve el estado actual emparejado con un método dispatch.
````
const [state, dispatch] = useReducer(reducer, initialArg, init);
````
Este hook es preferible a useState cuando se tiene una lógica compleja que involucra múltiples subvalores o cuando el próximo estado depende del anterior. useReducer además te permite optimizar el rendimiento para componentes que activan actualizaciones profundas, porque puedes pasar hacia abajo dispatch en lugar de callbacks.
Aquí está el ejemplo del contador de la sección [useState], reescrito para usar un reductor:
````
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
````

### Cuarto Hook: useContext
- El objetivo del hook es usarlo cuando se necesita pasar las props a varios componentes, y en lugar de hacer un pasamanos de props, directamente lo guardamos en el contexto y lo llamamos en los componentes cada vez que lo necesitemos.

- Al useContext lo podemos definir como un Hook que permite comunicar componentes funcionales a través del contexto en React.

- Entonces, este Hook recibe un objeto de contexto y retorna el valor del contexto actual, el cual si recordamos un poco, el valor del contexto actual lo asignamos a través de value en el provider.

Crear contexto: 
````
import { createContext } from "react";
const UserContext = createContext()
````
Envolver los componentes secundarios en el proveedor de contexto y proporcionar el valor del estado.
````
function Component1() {
  const [user, setUser] = useState("Jesse Hall");

  return (
    <UserContext.Provider value={user}>
      <h1>{`Hello ${user}!`}</h1>
      <Component2 user={user} />
    </UserContext.Provider>
  );
}
````
Ahora, __todos los componentes__ de este árbol tendrán acceso al contexto del usuario.
Para usarlo dentro de un componente:
````
function Component5() {
  const user = useContext(UserContext);

  return (
    <>
      <h1>Component 5</h1>
      <h2>{`Hello ${user} again!`}</h2>
    </>
  );
}
````
## Sección 7: Conclusion
### Resumen
- UseReducer: este hook te permite aplicar el patrón reductor a tu aplicación y componentes. Con un reductor, usted llama a sacar sus datos de estado en un objeto centralizado para toda la aplicación. Basándose en el envío de objetos de acción al reductor, éste recogerá los datos y adaptará el estado de la aplicación a lo largo del tiempo.

- UseContext: con este hook, puedes aplicar un objeto de contexto React a un árbol de componentes React. Los componentes anidados en ese árbol tendrán la capacidad de referenciar objetos compartidos y datos contenidos en ese objeto de contexto.

- Pub/Sub: el patrón de software publish/subscribe permite configurar una red basada en canales. Los editores envían mensajes a través de esos canales. Y los suscriptores recogen esos mensajes.

__FIN DEL CURSO__

09/05/2022
