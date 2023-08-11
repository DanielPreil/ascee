import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Create The asceeCanvas With The parameters which User Passes or use The Defaults
// Parameters: CanvasElement: String, TransparentBackground: Boolean, Camera Aspect Ratio: Number, Camera Near: Number, Camera Far: Number, Camera Z Axis: Number
const asceeCreateCanvas = (canvasElement, transparent=false, cameraFov=75, cameraAspectRatio, cameraNear=0.1, cameraFar=1000, cameraZ=2.5) => {
  // Setup renderer -> CanvasElement + Transparent or not Background
  const renderer = new THREE.WebGLRenderer({ canvas: canvasElement, alpha: transparent });
  // Create The Scene
  const scene = new THREE.Scene();
  // --- Canvas Pixelated Render Optimization ---
  canvasElement.width = window.innerWidth;
  canvasElement.height = window.innerHeight;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(canvasElement.clientWidth, canvasElement.clientHeight);
  // --- Canvas Pixelated Render Optimization Over ---
  // Create the camera variable based on the provided parameters of the asceeCreateCanvas function
  const camera = new THREE.PerspectiveCamera(cameraFov, cameraAspectRatio, cameraNear, cameraFar);
  // Camera Z Axis
  camera.position.z = cameraZ;
  
  // Return With renderer, scene, camera values
  return { renderer, scene, camera }
}

// Create The asceeModel With The parameters which User Passes or use The Defaults
// Parameters: modelElement: String, renderer: THREE.WebGLRenderer scene: THREE.Scene, camera: THREE.PerspectiveCamera
const asceeCreateModel = (modelElement, renderer, scene, camera) => {

  // Create The Model variable + add it to the scene
  const model = new THREE.Group();
  scene.add(model);
  
  // Load User's (Gltf / Glb) Model + add it to the model variable (That is already passed to the scene)
  const loader = new GLTFLoader();
  loader.load(modelElement, (gltf) => {
    const loadedModel = gltf.scene;
    model.add(loadedModel);
  });
  

 // --- Uncommented Parts

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

 // --- Uncommented Parts Over
}

// Create Light With The parameters which User Passes or use The Defaults
// Parameters: asceeScene: THREE.Scene, lightStrength: Number, lightColor: Hexadecimal Number, lightPosition.x: Number, lightPosition.y: Number, lightPosition.z: Number
const asceeCreateLight = (scene, lightStrength=3, lightColor=0xffffff, lightPosition={ x: 0, y: 1, z: 0}) => {
  // Create a Light Soruce From The parameters by using the Color and The Strength
  const light = new THREE.DirectionalLight(lightColor, lightStrength);
  // Then Set it's Position (x, y, z)
  light.position.set(lightPosition.x, lightPosition.y, lightPosition.z);
  // At the end add it to the scene that User provided
  scene.add(light);
}

// Export asceeCreateCanvas, asceeCreateModel, asceeCreateLight Functions
export { asceeCreateCanvas, asceeCreateModel, asceeCreateLight };