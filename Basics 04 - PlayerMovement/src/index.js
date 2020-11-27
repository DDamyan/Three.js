let scene,
  controls,
  camera,
  fakeCamera,
  renderer,
  Cube,
  map = {},
  validKeys = ['a', 's', 'd', 'w'],
  Shift = 1.0,
  zoom = 10,
  dir = new THREE.Vector3(),
  playerSpeed = 0.07,
  clock = new THREE.Clock();

function init() {
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.rotation.y = 1;
  camera.position.set(10, 0, 0);

  //fakeCamera = camera.clone();

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableKeys = false;
  controls.enablePan = false;
  controls.maxDistance = 30;
  controls.minDistance = 3;
  controls.enableDamping = true;
  controls.dampingFactor = 0.15;
  controls.zoomSpeed = 1.5;
  controls.mouseButtons.MIDDLE = undefined;
  controls.maxPolarAngle = Math.PI / 2.05;

  const geometry = new THREE.BoxGeometry(2, 5, 2);
  const material = new THREE.MeshBasicMaterial({color: 0xffff00, wireframe: true});
  Cube = new THREE.Mesh(geometry, material);
  Cube.position.y = Cube.geometry.parameters.height / 2;
  //Cube.add(camera);
  Cube.add(new THREE.AxesHelper(5));
  scene.add(Cube);

  scene.add(new THREE.GridHelper(10, 10));
  scene.add(new THREE.AxesHelper(10));
}

function animate() {
  requestAnimationFrame(animate);
  //camera.copy(fakeCamera);
  //   var delta = 1 - clock.getDelta();
  //fakeCamera.getWorldDirection(dir);

  //Cube.rotation.x = camera.rotation.z;
  //Cube.rotation.y += 0.01;
  //Cube.rotation.z = fakeCamera.rotation.x;

  for (const [Key, Value] of Object.entries(map)) {
    if (Value === true) {
      //console.log({...dir});

      switch (Key) {
        case 'w':
          //Cube.rotation.y = camera.rotation.y;
          Cube.lookAt(camera.position.x, NaN, camera.position.z);
          //Cube.position.set(Cube.position.x + dir.x, 0, Cubwe.position.z + dir.z);
          //Cube.position.addScaledVector({...dir, y: 0}, 0.08 * Shift);
          //Cube.position.z -= playerSpeed * Shift;
          break;
        case 's':
          Cube.position.z += playerSpeed * Shift;
          break;
        case 'a':
          Cube.position.x -= playerSpeed * Shift;
          break;
        case 'd':
          Cube.position.x += playerSpeed * Shift;
          break;

        default:
          console.warn('Key not registert!');
          break;
      }
    }
  }
  controls.update();

  renderer.render(scene, camera);
}

window.addEventListener(
  'resize',
  function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  },
  false,
);

document.addEventListener('keydown', e => {
  var pressedKey = e.key.toLowerCase();
  if (validKeys.indexOf(pressedKey) !== -1) map[pressedKey] = true;
  if (e.key === 'Shift') Shift = 2;
});

document.addEventListener('keyup', e => {
  var pressedKey = e.key.toLowerCase();
  if (Object.keys(map).indexOf(pressedKey) !== -1) map[pressedKey] = false;
  if (e.key === 'Shift') Shift = 1;
});

init();
animate();
