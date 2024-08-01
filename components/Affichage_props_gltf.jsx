import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { AnimationMixer } from 'three';
import * as THREE from "three";

export class Affichage_props_gltf {
    constructor(container) {
        this.container = container;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);
        this.camera.position.z = 5;

        this.clock = new THREE.Clock(); // Initialisation de la clock pour les animations
        this.mixer = null; // Déclaration du mixer pour les animations

        this.loadModel();
        this.animate();
    }

    loadModel() {
        const loader = new GLTFLoader();
        const modelPath = '../assets/bravo.glb';

        loader.load(modelPath, (glb) => {
            this.scene.add(glb.scene);

            // Initialiser le mixer pour l'animation
            this.mixer = new AnimationMixer(glb.scene);
            const animations = glb.animations;

            if (animations && animations.length) {
                animations.forEach((clip) => {
                    this.mixer.clipAction(clip).play();
                });
            }
        }, undefined, (error) => {
            console.error('An error occurred while loading the model', error);
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Mettre à jour les animations
        if (this.mixer) {
            const delta = this.clock.getDelta();
            this.mixer.update(delta);
        }

        this.renderer.render(this.scene, this.camera);
    }
}
