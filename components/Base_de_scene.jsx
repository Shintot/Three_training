import * as THREE from 'three';

// Définition d'une classe appelée Affichage_props_gltf
export class Base_de_scene {
    // Le constructeur est appelé lors de la création d'une instance de Affichage_props_gltf
    constructor(container) {
        // `container` est l'élément DOM dans lequel nous voulons afficher la scène
        this.container = container;

        // Création d'une nouvelle scène Three.js
        this.scene = new THREE.Scene();

        // Création d'une caméra perspective pour visualiser la scène
        // Les paramètres son le champ de vision, le ratio d'aspect, la distance de la caméra la plus proche et la plus éloignée visible
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        // Création du renderer, qui va afficher la scène et la caméra
        this.renderer = new THREE.WebGLRenderer();
        // Définition de la taille du renderer pour qu'elle remplisse la fenêtre
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        // Ajout de l'élément DOM du renderer au conteneur fourni
        this.container.appendChild(this.renderer.domElement);

        // Positionnement de la caméra dans la scène (en reculant pour voir la scène)
        this.camera.position.z = 5;

        // Appel de la methode createCube pour ajouter un cube à la scène
        this.createCube();

        // Début de l'animation de la scène
        this.animate();
    }

    // Méthode pour créer un cube et l'ajouter à la scène
    createCube() {
        // Création de la géométrie du cube
        const geometry = new THREE.BoxGeometry();
        // Création d'un matériau de base avec une couleur verte
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        // Création d'un maillage (un objet 3D) avec la géométrie et le matériau
        this.cube = new THREE.Mesh(geometry, material);
        // Ajout du cube à la scène
        this.scene.add(this.cube);
    }

    // Méthode pour animer la scène
    animate() {
        // Demande d'une nouvelle image d'animation
        // La méthode `animate` est appelée à chaque frame d'animation
        requestAnimationFrame(() => this.animate());

        // Rotation du cube sur les axes X et Y à chaque frame
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;

        // Rendu de la scène avec la caméra
        this.renderer.render(this.scene, this.camera);
    }
}
