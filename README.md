# Ascee - A Library for Viewing Three.js Models in Ascii Art mode

`Ascee` is a meticulously crafted JavaScript library designed to provide an immersive experience for viewing Three.js models in captivating Ascii Art mode. This library was created by Daniel Preil and is available under the MIT License."

## Installation

To use `Ascee`, you can install it via npm. Open your terminal and run the following command:

```bash
npm install ascee
```

## Usage

Here's an example of how to use Ascee in your JavaScript code:

```javascript
import { asceeCreateCanvas, asceeCreateModel, asceeCreateLight, asceeCreateRender } from "./node_modules/ascee/index.js"
// Import the functions from the Ascii package.

// Wait for the DOM content to be fully loaded.
window.addEventListener("DOMContentLoaded", () => {
  
  // Grab The Model, Canvas, Image (The model may have either a .gltf or .glb extension.)
  const modelElement = "./models/yourmodel.gltf"
  const canvasElement = document.querySelector(".myCanvas")
  const imageElement = document.querySelector(".myImage")
  const asciiElement = document.querySelector(".myAscii")

  // Create The asceeCanvas With The parameters or use The Defaults
  // Parameters: CanvasElement: String, TransparentBackground: Boolean, Camera Aspect Ratio: Number, Camera Near: Number, Camera Far: Number,  Camera Z Axis: Number
  const asceeCanvas = asceeCreateCanvas(canvasElement, true, 75, canvasElement.clientWidth / canvasElement.clientHeight, 0.1, 1000, 2.5)
  
  // asceeCanvas Object Destructuring (Get The: renderer, scene, camera)
  const asceeRenderer = asceeCanvas.renderer
  const asceeScene = asceeCanvas.scene
  const asceeCamera = asceeCanvas.camera
  
  // pass Those Values Into the asceeCreateModel Function That Takes care the things you have provided to
  // create the asceeModel of yours and display it on the scene
  // Grab The Variable as a return from the Function to use it later in the asceeCreateRender function
  const asceeModel = asceeCreateModel(asceeScene, modelElement, 0, -0.5)
  
  // asceeCreateLight Functions Take Care of creating Light Points, Users Can have Multiple ones in one scene
  // Parameters: asceeScene: THREE.Scene, lightStrength: Number, lightColor: Hexadecimal Number, lightPosition.x: Number, lightPosition.y: Number, lightPosition.z: Number
  asceeCreateLight(asceeScene, 3, 0xffffff, { x: 0, y: 0, z: 1 })
  asceeCreateLight(asceeScene, 3, 0xffffff, { x: 0, y: 1, z: 0 })
  asceeCreateLight(asceeScene, 3, 0xffffff, { x: 1, y: 0, z: 0 })
  
  // asceeCreateRender function to render the Scene, Camera + The Custom Hand Made Animations on the asceeModel
  // Parameters: asceeScene: THREE.Scene, asceeRenderer: THREE.WebGLRenderer, asceeCamera: THREE.PerspectiveCamera, asceeModel: THREE.Group, controls: Boolean, controlsDumpingEnabled: Boolean, modelYShouldRotate: Boolean, modelYRotation: Number, modelXShouldRotate: Boolean, modelXRotation: Number, imageElement: img Tag Element, asciiElement: pre Tag Element
  asceeCreateRender(asceeScene, asceeRenderer, asceeCamera, asceeModel, true, true, true, 0.01, false, 0, imageElement, asciiElement)
})
```

## HTML Structure

Ensure that your HTML document adheres to the following structure (You have the flexibility to rename the class names, but ensure they match those used in the JavaScript code):

```html
<div class="asceeContent">
    <canvas class="myCanvas"></canvas>
    <img class="myImage" src="" alt="myImage">
    <pre class="myAscii"></pre>
</div>
```

## Recommended CSS

You can use the following CSS to style your Ascee content:

```css
/* Highly Recommended CSS */

.asceeContent {
  color: white;
  position: relative;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* Change Background Color Of The Model */
  background-color: black;
}

.myCanvas {
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  opacity: 0%;
  z-index: 5;
}

.myImage {
  position: absolute;
  top: 0%;
  left: 0%;
  pointer-events: none;
  user-select: none;
  width: 100%;
  height: 100%;
  z-index: 10;
  /* Converting Model to Grayscale (If You Want to See Your Model in Grayscaled) */
  /* -webkit-filter: grayscale(1);
  filter: gray;
  filter: grayscale(1); */
  /* Turn Off Opacity */
  opacity: 0%;
}

.myAscii {
  z-index: 30;
  user-select: none;
  pointer-events: none;
}

/* Highly Recommended CSS Over */
```
