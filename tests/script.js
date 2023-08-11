import { asceeCreateCanvas, asceeCreateModel, asceeCreateLight, asceeCreateRender } from "./node_modules/ascee/index.js"

window.addEventListener("DOMContentLoaded", () => {
  
  // Grab The Model, Canvas, Image
  const modelElement = "./models/room.glb"
  const canvasElement = document.querySelector(".myCanvas")
  const myImage = document.querySelector(".myImage")
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
  // Parameters: asceeScene: THREE.Scene, asceeRenderer: THREE.WebGLRenderer, asceeCamera: THREE.PerspectiveCamera, asceeModel: THREE.Group, controls: Boolean, controlsDumpingEnabled: Boolean, modelYShouldRotate: Boolean, modelYRotation: Number, modelXShouldRotate: Boolean, modelXRotation: Number, myImage: String
  asceeCreateRender(asceeScene, asceeRenderer, asceeCamera, asceeModel, true, true, true, 0.01, false, 0, myImage)
})