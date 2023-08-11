import asceeCreate from "./node_modules/ascee/index.js"

window.addEventListener("DOMContentLoaded", () => {
  const canvasElement = document.querySelector(".myCanvas")

  const modelElement = "./room.glb"
  asceeCreate(canvasElement, modelElement)
})