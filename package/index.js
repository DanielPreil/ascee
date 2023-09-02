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
// Parameters: scene: THREE.Scene, modelElement: String, modelXPosition: Number, modelYPosition: Number
const asceeCreateModel = (scene, modelElement, modelXPosition=0, modelYPosition=0) => {

  // Create The asceeModel variable + add it to the scene
  const asceeModel = new THREE.Group();
  scene.add(asceeModel);
  
  // Load User's (Gltf / Glb) Model + add it to the asceeModel variable (That is already passed to the scene)
  const loader = new GLTFLoader();
  loader.load(modelElement, (gltf) => {
    const loadedModel = gltf.scene;
    asceeModel.add(loadedModel);
  });

  // The Positionng of the Model
  asceeModel.position.x = modelXPosition;
  asceeModel.position.y = modelYPosition;

  // Return the asceeModel Variable To The User to use it later in the asceeCreateRender function
  return asceeModel
}


const base64ToAscii = (base64, myImage) => {

  const asciiCanvas = document.createElement("canvas");
  const ctx = asciiCanvas.getContext("2d");
  const asciiArt = document.querySelector(".asciiArt");
  
  myImage.src = base64;
  
  asciiCanvas.width = window.innerWidth / 7.7
  asciiCanvas.height = window.innerHeight / 15

  myImage.onload = () => {
    ctx.drawImage(myImage, 0, 0, asciiCanvas.width, asciiCanvas.height);
    const imageData = ctx.getImageData(0, 0, asciiCanvas.width, asciiCanvas.height).data;
    let asciiResult = "";
    for (let i = 0; i < imageData.length; i += 4) {
      const r = imageData[i];
      const g = imageData[i + 1];
      const b = imageData[i + 2];
      const brightness = (r + g + b) / 3;
      /* Custom Ascii Art Symbols */
      const asciiChar = [" ", ":", "?", "%", "+", "*", "8", "O", "o", "!", "I", ";", ",", " "][Math.floor(brightness / 20)];
      asciiResult += asciiChar;
      if ((i / 4 + 1) % asciiCanvas.width === 0) {
        asciiResult += "\n";
      }
    }
    asciiArt.textContent = asciiResult
  }
};


// createSnapshot Function takes care of updating the myImage's src attribute
// based on the base64code of the three.js canvas element's renderer
const createSnapshot = (myImage, renderer) => {
  const snapshotBase64 = renderer.domElement.toDataURL("image/png").split(";base64,")[1];
  const newBase64ImageSource = `data:image/png;base64,${snapshotBase64}`;
  base64ToAscii(newBase64ImageSource, myImage);
}

// asceeCreateRender function to render the Scene, Camera + The Custom Hand Made Animations on the asceeModel
// Parameters: scene: THREE.Scene, renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera, model: THREE.Group, controls: Boolean, controlsDumpingEnabled: Boolean, modelYShouldRotate: Boolean, modelYRotation: Number, modelXShouldRotate: Boolean, modelXRotation: Number, myImage: String
const asceeCreateRender = (scene, renderer, camera, model, controls=true, controlsDumpingEnabled=true, modelYShouldRotate=true, modelYRotation=0.01, modelXShouldRotate=false, modelXRotation=0.01, myImage, parentContainer) => {
  
  // If Controls True -> Use OrbitControls + enableDamping if it is True
  // Else Do Nothing
  if (controls) {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = controlsDumpingEnabled;
    controls.update();
  } else {
    null
  }

  // Create a flag to ensure snapshot is taken only once
  let snapshotTaken = false;

  // animate function takes care of updating the AsceeModel Animation on the canvas based on the Parameters that is provided in the asceeCreateRender function
  const animate = () => {
    // requestAnimationFrame
    requestAnimationFrame(animate);

    // Capture snapshot One by One
    if (!snapshotTaken) {
      createSnapshot(myImage, renderer);
      snapshotTaken = true;
    } else {
      snapshotTaken = false;
    }

    // If Controls True -> Update it (Orbit Controls)
    if (controls) {
      controls.update();
    }
    // Parameter based AsceeModel Animation Controling on the X / Y Axises -> Rotation (Switched On / Off) + Speedness Of The Rotation
    if (modelYShouldRotate && modelXShouldRotate === false) {
      model.rotation.y += modelYRotation;
    } else if (modelXShouldRotate && modelYShouldRotate === false) {
      model.rotation.x += modelXRotation;
    } else if (modelXShouldRotate === true && modelYShouldRotate === true) {
      model.rotation.x += modelXRotation;
      model.rotation.y += modelYRotation;
    } else if (modelXShouldRotate === false && modelYShouldRotate === false) {
      null
    }

    // Render The Scene, Camera at the end
    renderer.render(scene, camera);
  }

  // Call The animate function again for the loop
  animate();
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
export { asceeCreateCanvas, asceeCreateModel, asceeCreateLight, asceeCreateRender };