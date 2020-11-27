let scene, camera, renderer, cube, sphere, controls;

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 15;

  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  const textureLoader = new THREE.TextureLoader();
  const materials = {
    Fire: new THREE.MeshPhongMaterial({
      map: textureLoader.load(
        'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/lava/lavatile.jpg',
      ),
      reflectivity: 0,
      shininess: 0,
    }),
    Ice_Planet: new THREE.MeshPhongMaterial({
      map: textureLoader.load('https://i.imgur.com/nI5Qx0l.jpg'),
      shininess: 0,
      reflectivity: 0,
    }),
  };

  //const material = new THREE.MeshBasicMaterial({map: texture});
  //   const material = new THREE.MeshPhongMaterial({
  //     map: materials.Fire,
  //     reflectivity: 0,
  //     shininess: 10,
  //   });

  const geometry = new THREE.BoxGeometry(4, 4, 4);
  cube = new THREE.Mesh(geometry, materials.Fire);
  cube.position.y = -5;
  scene.add(cube);

  const geometry_Sphere = new THREE.SphereGeometry(5, 32, 32);
  sphere = new THREE.Mesh(geometry_Sphere, materials.Ice_Planet);
  sphere.position.y = 5;
  scene.add(sphere);

  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(10, 0, 1000);
  scene.add(light);
  const ambient = new THREE.AmbientLight(0x404040, 1);
  scene.add(ambient);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  sphere.rotation.y += 0.01;

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

init();
animate();
