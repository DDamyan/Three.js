let scene,
  camera,
  renderer,
  domEvents,
  controls,
  Objects3D = [];

createObjects = () => {
  const geometry = new THREE.SphereGeometry(10, 10, 10);
  const material = new THREE.MeshNormalMaterial({wireframe: true});
  sphere = new THREE.Mesh(geometry, material);
  sphere.position.x = 20;
  Objects3D.push(sphere);
  //scene.add(sphere);

  const geometry2 = new THREE.SphereGeometry(10, 10, 10);
  const material2 = new THREE.MeshNormalMaterial({wireframe: true});
  sphere2 = new THREE.Mesh(geometry2, material2);
  sphere2.position.x = -20;
  Objects3D.push(sphere2);
  //scene.add(sphere2);

  const geometry3 = new THREE.SphereGeometry(10, 10, 10);
  const material3 = new THREE.MeshNormalMaterial({wireframe: true});
  sphere3 = new THREE.Mesh(geometry3, material3);
  Objects3D.push(sphere3);
  //scene.add(sphere3);

  Objects3D.map(obj => {
    scene.add(obj);
    domEvents.addEventListener(obj, 'click', event => {
      event.intersect.object.material.wireframe = !event.intersect.object.material.wireframe;
    });

    domEvents.addEventListener(obj, 'mouseover', event => {
      obj.scale.set(2, 2, 2);
    });

    domEvents.addEventListener(obj, 'mouseout', event => {
      obj.scale.set(1, 1, 1);
    });
  });
};

(function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 50;

  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.minDistance = 20;
  controls.maxDistance = 200;

  domEvents = new THREEx.DomEvents(camera, renderer.domElement);

  createObjects();
})();

window.addEventListener(
  'resize',
  function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  },
  false,
);

const animate = () => {
  requestAnimationFrame(animate);

  sphere.rotation.z += 0.01;
  sphere2.rotation.y += 0.01;
  sphere3.rotation.x += 0.01;

  renderer.render(scene, camera);
};

animate();
