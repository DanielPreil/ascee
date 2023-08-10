import * as THREE from "three/build/three.module.js";

const asceeCreate = (canvasElement) => {
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({ canvas: canvasElement });
  
  // Increase canvas size
  canvasElement.width = window.innerWidth;
  canvasElement.height = window.innerHeight;
  
  // Adjust pixel ratio
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(canvasElement.clientWidth, canvasElement.clientHeight);


  const camera = new THREE.PerspectiveCamera( 75, canvasElement.clientWidth / canvasElement.clientHeight, 0.1, 1000 );
  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  const cube = new THREE.Mesh( geometry, material );
  scene.add( cube );

  camera.position.z = 5;

  function animate() {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );
  }

  animate();
}

export default asceeCreate