const HALF_PI = Math.PI / 2;

let scene,
  camera,
  renderer,
  Plane,
  spinning,
  group,
  dt,
  light,
  center,
  digitClock = document.getElementById('clock-time'),
  sliderValue;

createObjects = () => {
  const geometryPlane = new THREE.CircleGeometry(15, 100);
  const materialPlane = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load('https://i.ibb.co/NZjzpbJ/unnamed-2.jpg'),
  });
  Plane = new THREE.Mesh(geometryPlane, materialPlane);
  Plane.rotation.x = -HALF_PI; //-90 deg
  Plane.receiveShadow = true;
  //scene.add(Plane);

  group = new THREE.Object3D();
  group.add(Plane);

  const geometryIndicatorSec = new THREE.BoxGeometry(0.2, 0.2, 12);
  const materialIndicatorSec = new THREE.MeshStandardMaterial({color: 0xff0000});
  IndicatorSec = new THREE.Mesh(geometryIndicatorSec, materialIndicatorSec);
  IndicatorSec.castShadow = true;
  IndicatorSec.position.z = -6;

  const geometryIndicatorMin = new THREE.BoxGeometry(0.4, 0.2, 11);
  const materialIndicatorMin = new THREE.MeshStandardMaterial({color: 0x0a2243});
  IndicatorMin = new THREE.Mesh(geometryIndicatorMin, materialIndicatorMin);
  IndicatorMin.castShadow = true;
  IndicatorMin.position.set(0, 0.2, -5.5);

  const geometryIndicatorHour = new THREE.BoxGeometry(0.5, 0.2, 10);
  const materialIndicatorHour = new THREE.MeshStandardMaterial({color: 0xa80f2a});
  IndicatorHour = new THREE.Mesh(geometryIndicatorHour, materialIndicatorHour);
  IndicatorHour.castShadow = true;
  IndicatorHour.position.set(0, 0.3, -5);

  spinning = {
    center: new THREE.Mesh(
      new THREE.SphereGeometry(0.7, 10, 3),
      new THREE.MeshStandardMaterial({color: 0x000000}),
    ),
    Seconds: new THREE.Object3D().add(IndicatorSec),
    Minutes: new THREE.Object3D().add(IndicatorMin),
    Hours: new THREE.Object3D().add(IndicatorHour),
  };
  spinning.center.castShadow = true;

  dt = new Date();
  spinning.Seconds.rotation.y = -(Math.PI * (dt.getSeconds() / 30));
  spinning.Minutes.rotation.y = -(Math.PI * (dt.getMinutes() / 30));
  spinning.Hours.rotation.y = -(Math.PI * ((dt.getHours() + dt.getMinutes() / 60) / 6));

  for (var prop in spinning) group.add(spinning[prop]);

  scene.add(group);
};

(function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x999999);

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.y = 30;
  camera.rotation.x = -HALF_PI;

  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('container').appendChild(renderer.domElement);

  const AmbientLight = new THREE.AmbientLight(0x404040, 0.6); // soft white light
  scene.add(AmbientLight);

  light = new THREE.DirectionalLight(0xffffff, 1);
  light.shadow.camera = new THREE.OrthographicCamera(-15, 15, 15, -15, 0.1, 30);
  light.castShadow = true;
  light.position.set(0, 15, 0);

  //scene.add(new THREE.CameraHelper(light.shadow.camera));
  //scene.add(new THREE.DirectionalLightHelper(light, 10));

  center = new THREE.Object3D().add(light);
  scene.add(center);

  //const controls = new THREE.OrbitControls(camera, renderer.domElement);

  createObjects();
})();

window.addEventListener('mousemove', function (event) {
  group.rotation.x = ((event.clientY / window.innerHeight) * 2 - 1) / 3;
  group.rotation.z = -((event.clientX / window.innerWidth) * 2 - 1) / 3;
});

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
  renderer.render(scene, camera);
};

setInterval(() => {
  dt = new Date();
  spinning.Seconds.rotation.y = -((Math.PI * dt.getSeconds()) / 30);
  spinning.Minutes.rotation.y = -(Math.PI * ((dt.getMinutes() + dt.getSeconds() / 60) / 30));
  spinning.Hours.rotation.y = -(Math.PI * ((dt.getHours() + dt.getMinutes() / 60) / 6));

  digitClock.textContent = dt.toLocaleTimeString();
}, 500);

digitClock.textContent = new Date().toLocaleTimeString();

document.getElementById('myRange').addEventListener('input', e => {
  sliderValue = parseFloat(e.target.value) / 100;
  center.rotation.x = 0.9 * sliderValue;
  center.rotation.z = 0.9 * sliderValue;
  light.intensity = (100 - sliderValue) / 100;

  //console.log(0.24 * (1 - sliderValue));

  if (sliderValue < parseInt(e.target.max) / 2 / 100) {
    light.color.setHSL(Math.PI / 0.77, 0.24 * (1 - sliderValue), 1 - sliderValue);
  } else light.color.setHSL(Math.PI / 0.87, 0.24 * sliderValue, 1 - sliderValue);
  // console.log(sliderValue);
  // light.color.setHSL(Math.PI / 0.77, 0.24, 0.25);
});

animate();
