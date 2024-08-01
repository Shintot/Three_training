import './style.css'
import { Base_de_scene } from './components/Base_de_scene.jsx';

// Ajoutez le conteneur pour la scène Three.js
document.querySelector('#app').innerHTML = `
  <div>
   
    <div id="three-container"></div>

  </div>
`


// Instanciez la scène Three.js dans le conteneur dédié
const container = document.getElementById('three-container');
const myThreeScene = new Base_de_scene(container);
