import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// CON ESTO PROBAMOS LA DIFERENCIA ENTRE USAR LA ARROW FUNCTION VS LA FUNCTION KEYWORD:
// ====================================================================================
// function createObject() {
//   console.log('outermost this', this);

//   return {
//     arrowFunction: () => {
//       console.log('arrowFunction this', this);
//     },
//     functionKeywordFunction: function() {
//       console.log('functionKeyword this', this);
//     }
//   }
// }

// const obj = createObject();
// console.log('obj', obj);
// obj.arrowFunction();
// obj.functionKeywordFunction();
