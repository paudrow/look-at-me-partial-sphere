import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const clipPlanes = [
	new THREE.Plane()
];

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(innerWidth, innerHeight);
renderer.localClippingEnabled = true;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.target.set(0, 1, 0);
controls.minDistance = 1;
controls.maxDistance = 10;
controls.enablePan = false;

const light = new THREE.HemisphereLight( 0xffffff, 0x080808, 4.5 );
light.position.set( - 1.25, 1, 1.25 );
scene.add( light );

// Create spheres
const sphereData = [
  { radius: 1, color: 0x00ff00, clipping: true },
  { radius: 0.4, color: 0xff0000, clipping: false },
  { radius: 0.6, color: 0xffff00, clipping: true }
];

sphereData.forEach(data => {
  const geometry = new THREE.SphereGeometry(data.radius, 32, 16);
  const material = new THREE.MeshBasicMaterial({
    color: data.color,
    side: THREE.DoubleSide,
    ...(data.clipping && {
      clippingPlanes: clipPlanes,
      clipIntersection: false,
      alphaToCoverage: true,
    })
  });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.y = 1;
  scene.add(sphere);
});

const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

camera.position.set(3, 3, 3);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  const direction = new THREE.Vector3();
  camera.getWorldDirection(direction);
  clipPlanes[0].setFromNormalAndCoplanarPoint(direction, new THREE.Vector3(0, 1, 0));
  renderer.render(scene, camera);
}
animate();