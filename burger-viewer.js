// Import Three.js and helpers from unpkg CDN
import * as THREE from 'https://unpkg.com/three@0.152.2/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.152.2/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.152.2/examples/jsm/loaders/GLTFLoader.js';

// Create a new scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0); // Light gray background

// Set up the camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / 400,
  0.1,
  1000
);
camera.position.set(0, 1, 3);

// Create the renderer and add it to the container div
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(
  document.getElementById('three-container').clientWidth,
  400
);
document.getElementById('three-container').appendChild(renderer.domElement);

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Add lighting
const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
scene.add(light);

// Load the burger GLB model
const loader = new GLTFLoader();
loader.load('./models/burger.glb', (gltf) => {
  scene.add(gltf.scene);
}, undefined, (error) => {
  console.error('Error loading GLB:', error);
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
