CreateWorld = () => {
  var Ground = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10, 1, 1),
    new THREE.MeshBasicMaterial({color: '#5f9aba'}),
  );
  Ground.rotateX(Math.PI / -2);
  return Ground;
};
