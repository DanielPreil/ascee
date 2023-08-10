import asceeCreate from "./node_modules/ascee/index.js"

window.addEventListener("DOMContentLoaded", () => {
  const canvasElement = document.querySelector(".myCanvas")
  //const yourModelElement = document.querySelector(yourModelElement)  
  
  asceeCreate(canvasElement)
})