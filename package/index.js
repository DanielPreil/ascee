import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const asceeCreate = (canvasElement, modelElement) => {
  
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({ canvas: canvasElement, alpha: true });
  const model = new THREE.Group();
  scene.add(model);

  // Load the GLB model
  const loader = new GLTFLoader();
  loader.load(modelElement, (gltf) => {
    const loadedModel = gltf.scene;
    model.add(loadedModel);
  });

  // Increase canvas size
  canvasElement.width = window.innerWidth;
  canvasElement.height = window.innerHeight;

  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 3);
  directionalLight1.position.set(0, 1, 0);
  scene.add(directionalLight1);

  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 3);
  directionalLight2.position.set(0, 0, 1);
  scene.add(directionalLight2);

  const directionalLight3 = new THREE.DirectionalLight(0xffffff, 3);
  directionalLight3.position.set(1, 0, 0);
  scene.add(directionalLight3);
  
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(canvasElement.clientWidth, canvasElement.clientHeight);
  
  const camera = new THREE.PerspectiveCamera( 75, canvasElement.clientWidth / canvasElement.clientHeight, 0.1, 1000);
  
  camera.position.z = 2.5;
  
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.update();

  model.rotation.x += 0.5;

  function animate() {
    requestAnimationFrame(animate);

    controls.update();

    model.rotation.y += 0.01;

    renderer.render(scene, camera);
  }

  animate();
}

export default asceeCreate;